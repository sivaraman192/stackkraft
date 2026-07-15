const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'stackkraft',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

/**
 * Upload an image buffer to Cloudinary
 * @param {Buffer} fileBuffer - The image file buffer
 * @param {string} folder - The Cloudinary folder to upload to
 * @returns {Promise<object>} - The upload result containing secure_url and public_id
 */
const uploadImage = (fileBuffer, folder = 'stackkraft/portfolio') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
        // Apply cloud-native compression and optimization on upload
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
          { width: 1200, height: 800, crop: 'limit' }
        ]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - The Cloudinary public ID
 * @returns {Promise<object>} - The delete result
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    throw new Error(`Cloudinary delete failed: ${err.message}`);
  }
};

module.exports = {
  cloudinary,
  uploadImage,
  deleteImage
};
