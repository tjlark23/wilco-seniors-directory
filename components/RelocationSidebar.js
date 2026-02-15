import Link from 'next/link';
import NewsletterCTA from './NewsletterCTA';

const popularCities = [
  { name: 'Georgetown', slug: 'georgetown' },
  { name: 'Round Rock', slug: 'round-rock' },
  { name: 'Cedar Park', slug: 'cedar-park' },
  { name: 'Leander', slug: 'leander' },
  { name: 'Pflugerville', slug: 'pflugerville' },
  { name: 'Hutto', slug: 'hutto' },
  { name: 'Taylor', slug: 'taylor' },
  { name: 'Liberty Hill', slug: 'liberty-hill' },
  { name: 'Jarrell', slug: 'jarrell' },
  { name: 'Florence', slug: 'florence' },
];

const topResources = [
  { label: 'How to Choose In-Home Care', href: '/seniors/guides/choosing-in-home-care' },
  { label: 'Medicare Enrollment Guide', href: '/seniors/guides/medicare-enrollment-guide' },
  { label: 'Senior Living Communities', href: '/seniors/senior-living' },
  { label: 'Financial Advisors', href: '/seniors/financial-advisors' },
  { label: 'Healthcare Providers', href: '/seniors/primary-care' },
];

export default function RelocationSidebar({ currentCity = null }) {
  return (
    <aside className="relocation-sidebar">
      {/* Newsletter CTA */}
      <NewsletterCTA variant="sidebar" />

      {/* Sponsor placeholder */}
      <div className="widget">
        <div className="widget-body" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '12px' }}>Sponsored</div>
          <div style={{ background: '#f0f4ff', borderRadius: '10px', padding: '30px 20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            Your business here — <Link href="/seniors" style={{ color: 'var(--blue)' }}>Get listed</Link>
          </div>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Popular Cities</h3>
        </div>
        <div className="widget-body">
          <div className="sidebar-links-list">
            {popularCities.map(city => (
              <Link
                key={city.slug}
                href={`/seniors/relocating/${city.slug}`}
                className={`sidebar-link-item${currentCity === city.slug ? ' active' : ''}`}
              >
                <span className="sidebar-link-icon">📍</span>
                {city.name}
              </Link>
            ))}
            <Link href="/seniors/relocating/compare" className="sidebar-link-item sidebar-link-compare">
              <span className="sidebar-link-icon">📊</span>
              Compare All Cities
            </Link>
          </div>
        </div>
      </div>

      {/* Top Resources */}
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Top Resources</h3>
        </div>
        <div className="widget-body">
          <div className="sidebar-links-list">
            {topResources.map(res => (
              <Link key={res.href} href={res.href} className="sidebar-link-item">
                <span className="sidebar-link-icon">→</span>
                {res.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
