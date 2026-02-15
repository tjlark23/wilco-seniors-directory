import { getRelocationCity, getRelocationCitySlugs, getRelocationCities } from '../../../../lib/getRelocation';
import { getBusinessesByCity } from '../../../../lib/getBusinesses';
import { getCategories } from '../../../../lib/getCategories';
import Breadcrumb from '../../../../components/Breadcrumb';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import FAQSection from '../../../../components/FAQSection';
import BusinessCard from '../../../../components/BusinessCard';
import RelocationSidebar from '../../../../components/RelocationSidebar';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../../../lib/generateSchema';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return getRelocationCitySlugs().map(slug => ({ city: slug }));
}

export function generateMetadata({ params }) {
  const city = getRelocationCity(params.city);
  if (!city) return {};
  return {
    title: (city.seoTitle || `Retiring to ${city.name}, TX`).replace(/\s*\|\s*WilCo Seniors\s*$/, ''),
    description: city.metaDescription,
    alternates: { canonical: `https://wilcoguide.com/seniors/relocating/${params.city}` },
  };
}

export default function CityRelocationPage({ params }) {
  const city = getRelocationCity(params.city);
  if (!city) notFound();

  const allCities = getRelocationCities();
  const businesses = getBusinessesByCity(params.city);
  const categories = getCategories();

  // Group businesses by category for display
  const bizByCategory = {};
  businesses.forEach(b => {
    if (!bizByCategory[b.category]) {
      bizByCategory[b.category] = { name: b.categoryName || b.category, businesses: [] };
    }
    bizByCategory[b.category].businesses.push(b);
  });

  const articleSchema = generateArticleSchema({
    title: city.heroHeadline,
    slug: `relocating/${params.city}`,
    excerpt: city.metaDescription,
    publishDate: '2026-02-01',
    heroImage: null,
    readTime: '8 min read',
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors', url: 'https://wilcoguide.com/seniors' },
    { name: 'Relocating', url: 'https://wilcoguide.com/seniors/relocating' },
    { name: city.name, url: `https://wilcoguide.com/seniors/relocating/${params.city}` },
  ]);
  const faqSchema = city.faqs && city.faqs.length > 0 ? generateFAQSchema(city.faqs) : null;

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: 'Relocating', href: '/seniors/relocating' },
        { label: city.name },
      ]} />

      {/* Hero */}
      <div className="relocation-hero relocation-hero-city">
        <div className="relocation-hero-inner">
          <div className="relocation-hero-badge">📍 {city.name}, TX</div>
          <h1 className="relocation-hero-title">{city.heroHeadline}</h1>
          <p className="relocation-hero-sub">{city.heroSubtext}</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relocation-layout">
        <main className="relocation-main">
          {/* Highlights */}
          {city.highlights && city.highlights.length > 0 && (
            <div className="city-highlights-bar">
              {city.highlights.map((h, i) => (
                <span key={i} className="city-highlight-chip">{h}</span>
              ))}
            </div>
          )}

          {/* Main content */}
          <section className="relocation-section">
            <div className="relocation-section-content city-main-content">
              {city.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Housing */}
          {city.housing && (
            <section className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">🏠</span>
                <h2 className="relocation-section-title">Housing in {city.name}</h2>
              </div>
              <div className="housing-stats-grid">
                <div className="housing-stat">
                  <div className="housing-stat-label">Median Home Price</div>
                  <div className="housing-stat-value">{city.housing.medianPrice}</div>
                </div>
                <div className="housing-stat">
                  <div className="housing-stat-label">Price Range</div>
                  <div className="housing-stat-value">{city.housing.priceRange}</div>
                </div>
                <div className="housing-stat">
                  <div className="housing-stat-label">55+ Communities</div>
                  <div className="housing-stat-value">{city.housing.fiftyPlusCommunities ? 'Yes' : 'Not yet'}</div>
                </div>
                <div className="housing-stat">
                  <div className="housing-stat-label">Walkability</div>
                  <div className="housing-stat-value">{city.walkability}</div>
                </div>
              </div>
              {city.housing.popularNeighborhoods && city.housing.popularNeighborhoods.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Popular Neighborhoods: </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{city.housing.popularNeighborhoods.join(', ')}</span>
                </div>
              )}
            </section>
          )}

          {/* Healthcare */}
          {city.healthcare && (
            <section className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">🏥</span>
                <h2 className="relocation-section-title">Healthcare Access</h2>
              </div>
              <div className="relocation-section-content">
                <p>{city.healthcare}</p>
              </div>
            </section>
          )}

          {/* Things to Do */}
          {city.thingsToDo && (
            <section className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">🎯</span>
                <h2 className="relocation-section-title">Things to Do</h2>
              </div>
              <div className="relocation-section-content">
                <p>{city.thingsToDo}</p>
              </div>
            </section>
          )}

          {/* Safety */}
          {city.safety && (
            <section className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">🛡️</span>
                <h2 className="relocation-section-title">Safety</h2>
              </div>
              <div className="relocation-section-content">
                <p>{city.safety}</p>
              </div>
            </section>
          )}

          {/* Senior Services in this city */}
          {Object.keys(bizByCategory).length > 0 && (
            <section className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">📋</span>
                <h2 className="relocation-section-title">Senior Services in {city.name}</h2>
              </div>
              {Object.entries(bizByCategory).slice(0, 4).map(([catSlug, catGroup]) => (
                <div key={catSlug} className="city-biz-category">
                  <h3 className="city-biz-category-title">{catGroup.name}</h3>
                  <div className="city-biz-grid">
                    {catGroup.businesses.slice(0, 4).map(b => (
                      <BusinessCard key={b.slug} business={b} />
                    ))}
                  </div>
                  <Link href={`/seniors/${catSlug}`} className="city-biz-see-all">See all {catGroup.name} →</Link>
                </div>
              ))}
              <div style={{ marginTop: '16px' }}>
                <Link href={`/seniors/${params.city}`} className="btn-secondary">View all services in {city.name} →</Link>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {city.faqs && city.faqs.length > 0 && (
            <section className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">❓</span>
                <h2 className="relocation-section-title">Frequently Asked Questions About {city.name}</h2>
              </div>
              <FAQSection faqs={city.faqs} />
            </section>
          )}

          {/* Explore Other Cities */}
          <section className="relocation-section">
            <div className="relocation-section-header">
              <span className="relocation-section-icon">🗺️</span>
              <h2 className="relocation-section-title">Explore Other WilCo Cities</h2>
            </div>
            <div className="other-cities-grid">
              {allCities.filter(c => c.slug !== params.city).map(c => (
                <Link key={c.slug} href={`/seniors/relocating/${c.slug}`} className="other-city-card">
                  <span className="other-city-name">{c.name}</span>
                  <span className="other-city-price">{c.housing?.medianPrice || 'N/A'}</span>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link href="/seniors/relocating/compare" className="btn-primary">Compare All Cities →</Link>
            </div>
          </section>
        </main>

        <RelocationSidebar currentCity={params.city} />
      </div>
    </>
  );
}
