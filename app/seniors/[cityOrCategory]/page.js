import { getCategories, getCategoryBySlug } from '../../../lib/getCategories';
import { getCities, getCityBySlug } from '../../../lib/getCities';
import { getBusinesses, getBusinessesByCategory, getBusinessesByCity } from '../../../lib/getBusinesses';
import { getFAQsByCategory } from '../../../lib/getFAQs';
import BusinessCard from '../../../components/BusinessCard';
import ListingCard from '../../../components/ListingCard';
import FAQSection from '../../../components/FAQSection';
import NewsletterCTA from '../../../components/NewsletterCTA';
import CTABanner from '../../../components/CTABanner';
import Breadcrumb from '../../../components/Breadcrumb';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { generateCollectionPageSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../../lib/generateSchema';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  const categories = getCategories();
  const cities = getCities();
  const allBusinesses = getBusinesses();

  // Only generate pages for categories that have at least one business
  const categorySlugsWithBusinesses = new Set(allBusinesses.map(b => b.category));
  const nonEmptyCategories = categories.filter(c => categorySlugsWithBusinesses.has(c.slug));

  return [
    ...nonEmptyCategories.map(c => ({ cityOrCategory: c.slug })),
    ...cities.map(c => ({ cityOrCategory: c.slug })),
  ];
}

function stripSuffix(title) {
  return title ? title.replace(/\s*\|\s*WilCo Seniors\s*$/, '') : title;
}

export function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.cityOrCategory);
  if (category) {
    return {
      title: stripSuffix(category.seoTitle) || `${category.name} for Seniors in Williamson County`,
      description: category.metaDescription || `Find ${category.name.toLowerCase()} for seniors in Williamson County, TX.`,
      alternates: { canonical: `https://wilcoguide.com/seniors/${category.slug}` },
    };
  }
  const city = getCityBySlug(params.cityOrCategory);
  if (city) {
    return {
      title: stripSuffix(city.seoTitle) || `Senior Services in ${city.name}, TX`,
      description: city.metaDescription || `Find senior services and resources in ${city.name}, TX.`,
      alternates: { canonical: `https://wilcoguide.com/seniors/${city.slug}` },
    };
  }
  return {};
}

export default function CityOrCategoryPage({ params }) {
  const category = getCategoryBySlug(params.cityOrCategory);
  const city = getCityBySlug(params.cityOrCategory);

  if (category) {
    return <CategoryPageContent category={category} />;
  }
  if (city) {
    return <CityPageContent city={city} />;
  }
  notFound();
}

function CategoryPageContent({ category }) {
  const businesses = getBusinessesByCategory(category.slug);
  const categories = getCategories();
  const faqs = getFAQsByCategory(category.slug);
  const relatedCategories = (category.relatedCategories || [])
    .map(slug => categories.find(c => c.slug === slug))
    .filter(Boolean);

  const collectionSchema = generateCollectionPageSchema(
    `${category.name} for Seniors in Williamson County`,
    category.metaDescription || '',
    businesses.map((b, i) => ({ position: i + 1, name: b.name, url: `https://wilcoguide.com/seniors/directory/${b.slug}` }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors', url: 'https://wilcoguide.com/seniors' },
    { name: category.name, url: `https://wilcoguide.com/seniors/${category.slug}` },
  ]);
  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

  return (
    <>
      <SchemaMarkup schema={collectionSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <div className="directory-page">
        <Breadcrumb items={[
          { label: 'Seniors', href: '/seniors' },
          { label: category.name },
        ]} />

        <div className="category-page-header">
          <h1 className="category-page-title">{category.name} for Seniors in Williamson County</h1>
          {category.description && (
            <p className="category-page-intro">{category.description}</p>
          )}
        </div>

        <div className="listing-grid">
          {businesses.map(business => (
            <ListingCard key={business.slug} business={business} />
          ))}
        </div>

        {businesses.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
            No businesses listed in this category yet. Check back soon.
          </p>
        )}

        {/* Relocation CTA for Senior Living category */}
        {category.slug === 'senior-living' && (
          <div className="city-relocating-cta" style={{ marginBottom: '32px' }}>
            <div className="city-relocating-cta-text">
              <h3>🏡 Thinking about moving to Williamson County?</h3>
              <p>Explore our complete relocation guide with 55+ communities, city comparisons, and everything you need to plan your move.</p>
            </div>
            <Link href="/seniors/relocating" className="btn-primary">Relocation Guide →</Link>
          </div>
        )}

        {faqs.length > 0 && <FAQSection faqs={faqs} />}

        <NewsletterCTA variant="inline" />

        {relatedCategories.length > 0 && (
          <div className="related-categories">
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Related Categories</h2>
            <div className="related-categories-grid">
              {relatedCategories.map(rc => (
                <Link key={rc.slug} href={`/seniors/${rc.slug}`} className="related-category-link">
                  {rc.icon} {rc.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <CTABanner />
      </div>
    </>
  );
}

function CityPageContent({ city }) {
  const businesses = getBusinessesByCity(city.slug);
  const categories = getCategories();

  // Group businesses by category
  const businessesByCategory = {};
  businesses.forEach(b => {
    if (!businessesByCategory[b.category]) {
      businessesByCategory[b.category] = [];
    }
    businessesByCategory[b.category].push(b);
  });

  const collectionSchema = generateCollectionPageSchema(
    `Senior Services in ${city.name}, TX`,
    city.metaDescription || '',
    businesses.map((b, i) => ({ position: i + 1, name: b.name, url: `https://wilcoguide.com/seniors/directory/${b.slug}` }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors', url: 'https://wilcoguide.com/seniors' },
    { name: city.name, url: `https://wilcoguide.com/seniors/${city.slug}` },
  ]);

  return (
    <>
      <SchemaMarkup schema={collectionSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      <div className="directory-page">
        <Breadcrumb items={[
          { label: 'Seniors', href: '/seniors' },
          { label: city.name },
        ]} />

        <div className="category-page-header">
          <h1 className="category-page-title">Senior Services in {city.name}, TX</h1>
          {city.description && (
            <p className="category-page-intro">{city.description}</p>
          )}
          {city.highlights && city.highlights.length > 0 && (
            <div className="city-highlights">
              {city.highlights.map((h, i) => (
                <span key={i} className="city-highlight-chip">{h}</span>
              ))}
            </div>
          )}
        </div>

        {Object.entries(businessesByCategory).map(([catSlug, catBusinesses]) => {
          const cat = categories.find(c => c.slug === catSlug);
          const catDisplayName = cat ? cat.name : (catBusinesses[0]?.categoryName || catSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
          return (
            <div key={catSlug} className="category-row">
              <div className="section-header">
                <div className="section-title-group">
                  <h2 className="section-title">{catDisplayName}</h2>
                  <span className="section-count">{catBusinesses.length} businesses</span>
                </div>
                <Link href={`/seniors/${catSlug}`} className="section-see-all">
                  See all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 6 15 12 9 18"/></svg>
                </Link>
              </div>
              <div className="row-grid">
                {catBusinesses.slice(0, 4).map(business => (
                  <BusinessCard key={business.slug} business={business} />
                ))}
              </div>
            </div>
          );
        })}

        {businesses.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
            No businesses listed in {city.name} yet. Check back soon.
          </p>
        )}

        {/* Relocating CTA */}
        <div className="city-relocating-cta">
          <div className="city-relocating-cta-text">
            <h3>🏡 Relocating to {city.name}?</h3>
            <p>Read our complete guide to retiring in {city.name} — housing, healthcare, things to do, and more.</p>
          </div>
          <Link href={`/seniors/relocating/${city.slug}`} className="btn-primary">Relocation Guide →</Link>
        </div>

        <NewsletterCTA variant="inline" />
        <CTABanner />
      </div>
    </>
  );
}
