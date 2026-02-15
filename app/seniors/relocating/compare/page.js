import { getRelocationComparison } from '../../../../lib/getRelocation';
import Breadcrumb from '../../../../components/Breadcrumb';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import RelocationSidebar from '../../../../components/RelocationSidebar';
import { generateBreadcrumbSchema } from '../../../../lib/generateSchema';
import Link from 'next/link';

export function generateMetadata() {
  const comparison = getRelocationComparison();
  return {
    title: (comparison.seoTitle || 'Compare Cities for Retirement in Williamson County, TX').replace(/\s*\|\s*WilCo Seniors\s*$/, ''),
    description: comparison.metaDescription,
    alternates: { canonical: 'https://wilcoguide.com/seniors/relocating/compare' },
  };
}

export default function ComparisonPage() {
  const comparison = getRelocationComparison();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors', url: 'https://wilcoguide.com/seniors' },
    { name: 'Relocating', url: 'https://wilcoguide.com/seniors/relocating' },
    { name: 'Compare Cities', url: 'https://wilcoguide.com/seniors/relocating/compare' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: 'Relocating', href: '/seniors/relocating' },
        { label: 'Compare Cities' },
      ]} />

      {/* Hero */}
      <div className="relocation-hero">
        <div className="relocation-hero-inner">
          <div className="relocation-hero-badge">📊 City Comparison</div>
          <h1 className="relocation-hero-title">Compare Cities for Retirement</h1>
          <p className="relocation-hero-sub">Side-by-side comparison of all 10 Williamson County cities to help you find your perfect fit.</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relocation-layout">
        <main className="relocation-main">
          {/* Comparison Table */}
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>City</th>
                  <th>Population</th>
                  <th>Median Home</th>
                  <th>55+</th>
                  <th>Hospital</th>
                  <th>Walkability</th>
                  <th>Tax Rate</th>
                  <th>Character</th>
                </tr>
              </thead>
              <tbody>
                {comparison.cities.map(city => (
                  <tr key={city.slug}>
                    <td>
                      <Link href={`/seniors/relocating/${city.slug}`} className="comparison-city-link">
                        {city.name}
                      </Link>
                    </td>
                    <td>{city.population}</td>
                    <td className="comparison-price">{city.medianHomePrice}</td>
                    <td>
                      <span className={`comparison-badge ${city.fiftyPlusCommunities ? 'badge-yes' : 'badge-no'}`}>
                        {city.fiftyPlusCommunities ? '✓ Yes' : '—'}
                      </span>
                    </td>
                    <td className="comparison-hospital">{city.hospitalAccess}</td>
                    <td>
                      <span className={`walkability-badge walkability-${city.walkabilityRating.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                        {city.walkabilityRating}
                      </span>
                    </td>
                    <td>{city.propertyTaxRate}</td>
                    <td className="comparison-vibe">{city.vibe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* City Cards (mobile-friendly alternative) */}
          <div className="comparison-cards-mobile">
            {comparison.cities.map(city => (
              <Link key={city.slug} href={`/seniors/relocating/${city.slug}`} className="comparison-card-mobile">
                <div className="comparison-card-header">
                  <h3>{city.name}</h3>
                  <span className="comparison-card-price">{city.medianHomePrice}</span>
                </div>
                <div className="comparison-card-stats">
                  <div className="comparison-card-stat">
                    <span className="stat-label">Pop.</span>
                    <span className="stat-value">{city.population}</span>
                  </div>
                  <div className="comparison-card-stat">
                    <span className="stat-label">55+</span>
                    <span className="stat-value">{city.fiftyPlusCommunities ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="comparison-card-stat">
                    <span className="stat-label">Walk</span>
                    <span className="stat-value">{city.walkabilityRating}</span>
                  </div>
                  <div className="comparison-card-stat">
                    <span className="stat-label">Tax</span>
                    <span className="stat-value">{city.propertyTaxRate}</span>
                  </div>
                </div>
                <div className="comparison-card-hospital">{city.hospitalAccess}</div>
                <div className="comparison-card-vibe">{city.vibe}</div>
              </Link>
            ))}
          </div>

          {/* Key Takeaways */}
          <section className="relocation-section">
            <div className="relocation-section-header">
              <span className="relocation-section-icon">💡</span>
              <h2 className="relocation-section-title">Key Takeaways</h2>
            </div>
            <div className="relocation-section-content">
              <ul className="takeaway-list">
                <li><strong>Best value:</strong> Taylor and Florence offer the most affordable homes, starting in the mid-$200Ks.</li>
                <li><strong>Best for 55+ community living:</strong> Georgetown is home to Sun City Texas, the largest active adult community in the state.</li>
                <li><strong>Best healthcare access:</strong> Round Rock and Georgetown have the most hospital options within city limits.</li>
                <li><strong>Most walkable:</strong> Georgetown's historic downtown square gives it the highest walkability among WilCo cities.</li>
                <li><strong>Closest to Austin:</strong> Round Rock and Pflugerville offer the easiest access to Austin's amenities.</li>
                <li><strong>Hill Country feel:</strong> Cedar Park and Liberty Hill sit on the edge of the Texas Hill Country with scenic views.</li>
                <li><strong>Fastest growing:</strong> Leander, Hutto, and Liberty Hill are among the fastest-growing cities in Texas.</li>
              </ul>
            </div>
          </section>

          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Link href="/seniors/relocating" className="btn-secondary">← Back to Relocation Guide</Link>
          </div>
        </main>

        <RelocationSidebar />
      </div>
    </>
  );
}
