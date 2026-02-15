import fs from 'fs';
import path from 'path';

let relocationData = null;

function loadRelocation() {
  if (!relocationData) {
    const filePath = path.join(process.cwd(), 'data', 'relocation.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    relocationData = JSON.parse(fileContents);
  }
  return relocationData;
}

/**
 * Returns the hub (main relocation page) data.
 */
export function getRelocationHub() {
  return loadRelocation().hub;
}

/**
 * Returns relocation data for a specific city by slug.
 */
export function getRelocationCity(citySlug) {
  return loadRelocation().cities[citySlug] || null;
}

/**
 * Returns all relocation city slugs.
 */
export function getRelocationCitySlugs() {
  return Object.keys(loadRelocation().cities);
}

/**
 * Returns all relocation cities as an array with slug included.
 */
export function getRelocationCities() {
  const cities = loadRelocation().cities;
  return Object.entries(cities).map(([slug, data]) => ({ ...data, slug }));
}

/**
 * Returns the comparison page data.
 */
export function getRelocationComparison() {
  return loadRelocation().comparison;
}
