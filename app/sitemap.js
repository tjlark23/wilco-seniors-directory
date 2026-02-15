import { getBusinesses } from '../lib/getBusinesses';
import { getCategories } from '../lib/getCategories';
import { getCities } from '../lib/getCities';
import { getGuides } from '../lib/getGuides';
import { getRelocationCitySlugs } from '../lib/getRelocation';

export default function sitemap() {
  const baseUrl = 'https://wilcoguide.com';
  const businesses = getBusinesses();
  const categories = getCategories();
  const cities = getCities();
  const guides = getGuides();

  const staticPages = [
    {
      url: `${baseUrl}/seniors`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/seniors/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/seniors/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const cityPages = cities.map(city => ({
    url: `${baseUrl}/seniors/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const businessPages = businesses.map(biz => ({
    url: `${baseUrl}/seniors/directory/${biz.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const guidePages = guides.map(guide => ({
    url: `${baseUrl}/seniors/guides/${guide.slug}`,
    lastModified: new Date(guide.publishDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Best Of pages
  const bestOfSlugs = [
    'best-in-home-care-in-round-rock',
    'best-senior-living-in-georgetown',
    'best-pickleball-in-williamson-county',
    'best-estate-planning-in-cedar-park',
    'best-medicare-advisors-in-round-rock',
    'best-physical-therapy-in-leander',
    'best-senior-fitness-in-pflugerville',
    'best-hearing-care-in-georgetown',
    'best-financial-advisors-in-round-rock',
    'best-home-care-in-williamson-county',
  ];

  const bestOfPages = bestOfSlugs.map(slug => ({
    url: `${baseUrl}/seniors/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Relocation pages
  const relocationCitySlugs = getRelocationCitySlugs();
  const relocationPages = [
    {
      url: `${baseUrl}/seniors/relocating`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seniors/relocating/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...relocationCitySlugs.map(slug => ({
      url: `${baseUrl}/seniors/relocating/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];

  return [
    ...staticPages,
    ...categoryPages,
    ...cityPages,
    ...businessPages,
    ...guidePages,
    ...bestOfPages,
    ...relocationPages,
  ];
}
