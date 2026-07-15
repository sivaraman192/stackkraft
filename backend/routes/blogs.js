const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Helper to check if user is admin (optional middleware check)
const isAdmin = (req) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'stackkraft_super_secret_key_123');
    return true;
  } catch (err) {
    return false;
  }
};

// @route   GET /api/blogs
// @desc    Get all blogs (published only for users, all for admin if requested)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const showAll = req.query.all === 'true' && isAdmin(req);
    const filter = showAll ? {} : { status: 'published' };
    
    // Support category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/blogs
// @desc    Create a blog post
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, slug, content, summary, category, tags, readTime, author, imageUrl, status } = req.body;

  try {
    // Generate slug from title if not provided
    const blogSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Check if slug exists
    const existingBlog = await Blog.findOne({ slug: blogSlug });
    if (existingBlog) {
      return res.status(400).json({ message: 'A blog with this slug or title already exists' });
    }

    const newBlog = new Blog({
      title,
      slug: blogSlug,
      content,
      summary,
      category,
      tags,
      readTime,
      author,
      imageUrl,
      status
    });

    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog post
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, slug, content, summary, category, tags, readTime, author, imageUrl, status } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (title !== undefined) blog.title = title;
    if (slug !== undefined) blog.slug = slug;
    if (content !== undefined) blog.content = content;
    if (summary !== undefined) blog.summary = summary;
    if (category !== undefined) blog.category = category;
    if (tags !== undefined) blog.tags = tags;
    if (readTime !== undefined) blog.readTime = readTime;
    if (author !== undefined) blog.author = author;
    if (imageUrl !== undefined) blog.imageUrl = imageUrl;
    if (status !== undefined) blog.status = status;

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
