import fs from 'fs';
import path from 'path';

let faqsCache = null;

function loadFAQs() {
  if (faqsCache) return faqsCache;
  try {
    const filePath = path.join(process.cwd(), 'data', 'faqs.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    faqsCache = JSON.parse(data);
  } catch {
    faqsCache = {};
  }
  return faqsCache;
}

export function getFAQsByCategory(categorySlug) {
  const faqs = loadFAQs();
  return faqs[categorySlug] || [];
}
