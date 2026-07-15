import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
 title, 
 description, 
 keywords, 
 image, 
 url, 
 type = 'website', 
 author = 'StackKraft Technologies',
 schema 
}) => {
 const siteName = 'StackKraft';
 const siteTitle = title ? `${title} | StackKraft` : 'StackKraft | Building Modern Digital Experiences';
 const siteDescription = description || 'StackKraft is a premium full-stack software agency building modern digital experiences. Specializing in high-performance React applications, custom Node.js/Express APIs, MongoDB, and UI/UX design.';
 const defaultKeywords = 'StackKraft, web development agency, website development, React agency, Node.js agency, full stack developer, custom web app, premium UI/UX, software company';
 const siteKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
 
 // Construct absolute URLs
 const baseSiteUrl = 'https://stackkraft.com';
 const siteImage = image ? `${baseSiteUrl}${image}` : `${baseSiteUrl}/images/hero_laptop.png`;
 const siteUrl = url ? `${baseSiteUrl}${url}` : baseSiteUrl;

 return (
  <Helmet>
   {/* Primary Meta Tags */}
   <title>{siteTitle}</title>
   <meta name="title" content={siteTitle} />
   <meta name="description" content={siteDescription} />
   <meta name="keywords" content={siteKeywords} />
   <meta name="author" content={author} />
   
   {/* Canonical Link */}
   <link rel="canonical" href={siteUrl} />

   {/* Open Graph / Facebook */}
   <meta property="og:type" content={type} />
   <meta property="og:site_name" content={siteName} />
   <meta property="og:url" content={siteUrl} />
   <meta property="og:title" content={siteTitle} />
   <meta property="og:description" content={siteDescription} />
   <meta property="og:image" content={siteImage} />
   <meta property="og:image:width" content="1200" />
   <meta property="og:image:height" content="630" />

   {/* Twitter Cards */}
   <meta name="twitter:card" content="summary_large_image" />
   <meta name="twitter:url" content={siteUrl} />
   <meta name="twitter:title" content={siteTitle} />
   <meta name="twitter:description" content={siteDescription} />
   <meta name="twitter:image" content={siteImage} />

   {/* WhatsApp / Telegram Preview optimization */}
   <meta property="og:image:type" content="image/png" />

   {/* JSON-LD Structured Schema Injection */}
   {schema && (
    <script type="application/ld+json">
     {JSON.stringify(schema)}
    </script>
   )}
  </Helmet>
 );
};

export default SEO;
