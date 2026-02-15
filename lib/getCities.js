import fs from 'fs';
import path from 'path';

let cities = null;

function loadCities() {
  if (!cities) {
    const filePath = path.join(process.cwd(), 'data', 'cities.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    cities = JSON.parse(fileContents);
  }
  return cities;
}

/**
 * Returns all cities.
 */
export function getCities() {
  return loadCities();
}

/**
 * Returns a single city matching the given slug, or undefined if not found.
 */
export function getCityBySlug(slug) {
  const all = loadCities();
  return all.find((city) => city.slug === slug);
}
