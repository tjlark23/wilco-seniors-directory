const BASE_URL = 'https://wilcoguide.com';

/**
 * Generates a LocalBusiness JSON-LD schema object.
 * Expects a business object with fields like name, description, address, phone, url, hours, rating, etc.
 */
export function generateLocalBusinessSchema(business) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    url: business.website || `${BASE_URL}/seniors/directory/${business.slug}`,
  };

  if (business.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: 'TX',
      addressCountry: 'US',
    };
  }

  if (business.phone) {
    schema.telephone = business.phone;
  }

  if (business.hours && typeof business.hours === 'object') {
    schema.openingHoursSpecification = Object.entries(business.hours).map(([day, time]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      description: time,
    }));
  }

  if (business.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount || 0,
    };
  }

  if (business.photos && business.photos.length > 0) {
    schema.image = business.photos[0];
  }

  return schema;
}

/**
 * Generates a CollectionPage + ItemList JSON-LD schema object.
 * items is an array of objects with at least { name, url } fields.
 */
export function generateCollectionPageSchema(title, description, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/**
 * Generates a BreadcrumbList JSON-LD schema object.
 * items is an array of { name, url } objects in order from root to current page.
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates a FAQPage JSON-LD schema object.
 * faqs is an array of { question, answer } objects.
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates an Article JSON-LD schema object for guide pages.
 * Expects a guide object with fields like title, slug, excerpt, publishDate, content, heroImage, etc.
 */
export function generateArticleSchema(guide) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt || guide.metaDescription,
    url: `${BASE_URL}/seniors/guides/${guide.slug}`,
    datePublished: guide.publishDate,
    publisher: {
      '@type': 'Organization',
      name: 'WilCo Guide',
      url: BASE_URL,
    },
  };

  if (guide.heroImage) {
    schema.image = guide.heroImage;
  }

  if (guide.readTime) {
    schema.timeRequired = guide.readTime;
  }

  return schema;
}
