import { getRelocationHub, getRelocationCities } from '../../../lib/getRelocation';
import { getCategories } from '../../../lib/getCategories';
import Breadcrumb from '../../../components/Breadcrumb';
import SchemaMarkup from '../../../components/SchemaMarkup';
import FAQSection from '../../../components/FAQSection';
import NewsletterCTA from '../../../components/NewsletterCTA';
import RelocationSidebar from '../../../components/RelocationSidebar';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../../lib/generateSchema';
import Link from 'next/link';

export function generateMetadata() {
  const hub = getRelocationHub();
  return {
    title: (hub.seoTitle || hub.title).replace(/\s*\|\s*WilCo Seniors\s*$/, ''),
    description: hub.metaDescription,
    alternates: { canonical: 'https://wilcoguide.com/seniors/relocating' },
  };
}

export default function RelocatingHubPage() {
  const hub = getRelocationHub();
  const cities = getRelocationCities();
  const categories = getCategories();

  const articleSchema = generateArticleSchema({
    title: hub.title,
    slug: 'relocating',
    excerpt: hub.metaDescription,
    publishDate: '2026-02-01',
    heroImage: null,
    readTime: '12 min read',
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors', url: 'https://wilcoguide.com/seniors' },
    { name: 'Relocating', url: 'https://wilcoguide.com/seniors/relocating' },
  ]);
  const faqSchema = hub.faqs && hub.faqs.length > 0 ? generateFAQSchema(hub.faqs) : null;

  // Category links for internal linking
  const relatedCategories = ['senior-living', 'primary-care', 'financial-advisors', 'in-home-care', 'estate-planning', 'medicare'];

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: 'Relocating to WilCo' },
      ]} />

      {/* Hero */}
      <div className="relocation-hero">
        <div className="relocation-hero-inner">
          <div className="relocation-hero-badge">🏡 Relocation Guide</div>
          <h1 className="relocation-hero-title">{hub.heroHeadline}</h1>
          <p className="relocation-hero-sub">{hub.heroSubtext}</p>
          <div className="relocation-hero-actions">
            <Link href="/seniors/relocating/compare" className="btn-primary">Compare Cities</Link>
            <Link href="#city-overview" className="btn-secondary">Explore by City</Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relocation-layout">
        <main className="relocation-main">
          {/* Quick Nav */}
          <div className="relocation-quick-nav">
            <h2 className="relocation-quick-nav-title">In This Guide</h2>
            <div className="relocation-quick-nav-links">
              {hub.sections.map(section => (
                <a key={section.id} href={`#${section.id}`} className="quick-nav-link">
                  <span className="quick-nav-icon">{section.icon}</span>
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          {hub.sections.map(section => (
            <section key={section.id} id={section.id} className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">{section.icon}</span>
                <h2 className="relocation-section-title">{section.title}</h2>
              </div>
              <div className="relocation-section-content">
                {section.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          {/* City-by-City Cards */}
          <section id="city-overview" className="relocation-section">
            <div className="relocation-section-header">
              <span className="relocation-section-icon">🏘️</span>
              <h2 className="relocation-section-title">Explore WilCo Cities</h2>
            </div>
            <div className="city-cards-grid">
              {cities.map(city => (
                <Link key={city.slug} href={`/seniors/relocating/${city.slug}`} className="city-relocation-card">
                  <div className="city-card-header">
                    <h3 className="city-card-name">{city.name}</h3>
                    <span className="city-card-price">{city.housing?.medianPrice || 'N/A'}</span>
                  </div>
                  <p className="city-card-tagline">{city.heroSubtext}</p>
                  <div className="city-card-highlights">
                    {(city.highlights || []).slice(0, 3).map((h, i) => (
                      <span key={i} className="city-card-tag">{h}</span>
                    ))}
                  </div>
                  <span className="city-card-link">Learn more →</span>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link href="/seniors/relocating/compare" className="btn-primary">Compare All Cities Side by Side →</Link>
            </div>
          </section>

          {/* Related Directory Categories */}
          <section className="relocation-section">
            <div className="relocation-section-header">
              <span className="relocation-section-icon">📂</span>
              <h2 className="relocation-section-title">Browse Senior Services</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Already planning your move? Explore these key service categories in the WilCo Seniors Directory.
            </p>
            <div className="relocation-category-links">
              {relatedCategories.map(slug => {
                const cat = categories.find(c => c.slug === slug);
                if (!cat) return null;
                return (
                  <Link key={slug} href={`/seniors/${slug}`} className="relocation-category-chip">
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Newsletter CTA */}
          <div className="relocation-newsletter-block">
            <div className="relocation-newsletter-inner">
              <h3>Already decided?</h3>
              <p>Join thousands of WilCo seniors who get the weekly local guide — services, events, deals, and community updates delivered every Friday.</p>
              <NewsletterCTA variant="inline" />
            </div>
          </div>

          {/* FAQ Section */}
          {hub.faqs && hub.faqs.length > 0 && (
            <section className="relocation-section">
              <div className="relocation-section-header">
                <span className="relocation-section-icon">❓</span>
                <h2 className="relocation-section-title">Frequently Asked Questions</h2>
              </div>
              <FAQSection faqs={hub.faqs} />
            </section>
          )}
        </main>

        <RelocationSidebar />
      </div>
    </>
  );
}
