import fs from 'fs';
import path from 'path';

let guides = null;

function loadGuides() {
  if (!guides) {
    const filePath = path.join(process.cwd(), 'data', 'guides.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    guides = JSON.parse(fileContents);
  }
  return guides;
}

/**
 * Returns all guides.
 */
export function getGuides() {
  return loadGuides();
}

/**
 * Returns a single guide matching the given slug, or undefined if not found.
 */
export function getGuideBySlug(slug) {
  const all = loadGuides();
  return all.find((guide) => guide.slug === slug);
}
