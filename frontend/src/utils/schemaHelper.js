/**
 * Schema Markup Helpers for StackKraft Technologies
 * Outputs structured JSON-LD schemas to enhance SEO.
 */

const baseSiteUrl = 'https://stackkraft.com';

export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseSiteUrl}/#organization`,
    'name': 'StackKraft Technologies',
    'url': baseSiteUrl,
    'logo': `${baseSiteUrl}/favicon.svg`,
    'sameAs': [
      'https://github.com/sivaraman192',
      'https://linkedin.com',
      'https://instagram.com'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-9342913781',
      'contactType': 'sales',
      'email': 'sivaraman.official13@gmail.com',
      'areaServed': 'Worldwide',
      'availableLanguage': ['English', 'Tamil']
    }
  };
};

export const getWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseSiteUrl}/#website`,
    'url': baseSiteUrl,
    'name': 'StackKraft Technologies',
    'description': 'Premium full-stack software agency building modern digital experiences.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${baseSiteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

export const getLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseSiteUrl}/#localbusiness`,
    'name': 'StackKraft Technologies',
    'image': `${baseSiteUrl}/images/hero_laptop.png`,
    'telephone': '+919342913781',
    'email': 'sivaraman.official13@gmail.com',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Jayankondam',
      'addressLocality': 'Ariyalur',
      'addressRegion': 'Tamil Nadu',
      'postalCode': '621802',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '11.2132',
      'longitude': '79.2713'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      'opens': '09:00',
      'closes': '19:00'
    }
  };
};

export const getServiceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Web Development & Custom Software Engineering',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'StackKraft Technologies'
    },
    'areaServed': 'Worldwide',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Software Development Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Landing Page Development',
            'description': 'Conversion-optimized business landing pages with interactive UI animations.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Custom React Application Engineering',
            'description': 'High-performance React SPAs with scalable state management and APIs.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Administrative Dashboards & Custom CMS',
            'description': 'Bespoke dashboards, CRM integrations, and data visualization tools.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'E-Commerce Portals',
            'description': 'Robust e-commerce storefronts with payment gateway integrations and secure checkout flows.'
          }
        }
      ]
    }
  };
};

export const getBreadcrumbSchema = (crumbs = []) => {
  const itemListElement = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': baseSiteUrl
    }
  ];

  crumbs.forEach((crumb, idx) => {
    itemListElement.push({
      '@type': 'ListItem',
      'position': idx + 2,
      'name': crumb.name,
      'item': `${baseSiteUrl}${crumb.path}`
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement
  };
};
