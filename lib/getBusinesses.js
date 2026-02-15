import fs from 'fs';
import path from 'path';

let businesses = null;

function loadBusinesses() {
  if (!businesses) {
    const filePath = path.join(process.cwd(), 'data', 'businesses.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    businesses = JSON.parse(fileContents);
  }
  return businesses;
}

/**
 * Returns all businesses.
 */
export function getBusinesses() {
  return loadBusinesses();
}

/**
 * Returns businesses filtered by category slug.
 */
export function getBusinessesByCategory(categorySlug) {
  const all = loadBusinesses();
  return all.filter((business) => business.category === categorySlug);
}

/**
 * Returns businesses filtered by city slug.
 */
export function getBusinessesByCity(citySlug) {
  const all = loadBusinesses();
  return all.filter((business) => business.citySlug === citySlug);
}

/**
 * Returns businesses filtered by both city slug and category slug.
 */
export function getBusinessesByCityAndCategory(citySlug, categorySlug) {
  const all = loadBusinesses();
  return all.filter(
    (business) => business.citySlug === citySlug && business.category === categorySlug
  );
}

/**
 * Returns a single business matching the given slug, or undefined if not found.
 */
export function getBusinessBySlug(slug) {
  const all = loadBusinesses();
  return all.find((business) => business.slug === slug);
}

/**
 * Returns businesses where featured === true.
 */
export function getFeaturedBusinesses() {
  const all = loadBusinesses();
  return all.filter((business) => business.featured === true);
}

/**
 * Returns related businesses in the same category, excluding the current business.
 * Limited to the specified number of results (default 4).
 */
export function getRelatedBusinesses(business, limit = 4) {
  const all = loadBusinesses();
  return all
    .filter(
      (b) => b.category === business.category && b.slug !== business.slug
    )
    .slice(0, limit);
}
