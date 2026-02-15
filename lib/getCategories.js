import fs from 'fs';
import path from 'path';

let categories = null;

function loadCategories() {
  if (!categories) {
    const filePath = path.join(process.cwd(), 'data', 'categories.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    categories = JSON.parse(fileContents);
  }
  return categories;
}

/**
 * Returns all categories.
 */
export function getCategories() {
  return loadCategories();
}

/**
 * Returns a single category matching the given slug, or undefined if not found.
 */
export function getCategoryBySlug(slug) {
  const all = loadCategories();
  return all.find((category) => category.slug === slug);
}

/**
 * Returns categories grouped by their group field.
 * Result is an object where keys are group names and values are arrays of categories.
 */
export function getCategoryGroups() {
  const all = loadCategories();
  const groups = {};

  for (const category of all) {
    const groupName = category.group || 'Other';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(category);
  }

  return groups;
}
