import { getBusinesses, getFeaturedBusinesses, getBusinessesByCategory } from '../../lib/getBusinesses';
import { getCategories } from '../../lib/getCategories';
import { getGuides } from '../../lib/getGuides';
import { getRelocationCities } from '../../lib/getRelocation';
import TrendingBar from '../../components/TrendingBar';
import PremiumCard from '../../components/PremiumCard';
import BusinessCard from '../../components/BusinessCard';
import CategoryRow from '../../components/CategoryRow';
import CTABanner from '../../components/CTABanner';
import NewsletterCTA from '../../components/NewsletterCTA';
import SchemaMarkup from '../../components/SchemaMarkup';
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '../../lib/generateSchema';
import Link from 'next/link';

export const metadata = {
  title: 'Senior Services Directory for Williamson County, TX',
  description: 'Find trusted senior services, healthcare, activities, and resources in Williamson County, TX. The complete directory for 55+ residents in Round Rock, Georgetown, Cedar Park, Leander and more.',
  openGraph: {
    title: 'WilCo Seniors | Senior Services Directory for Williamson County, TX',
    description: 'Find trusted senior services, healthcare, activities, and resources in Williamson County, TX.',
    url: 'https://wilcoguide.com/seniors',
  },
  alternates: {
    canonical: 'https://wilcoguide.com/seniors',
  },
};

export default function SeniorsDirectoryPage() {
  const allBusinesses = getBusinesses();
  const featured = getFeaturedBusinesses();
  const categories = getCategories();
  const guides = getGuides();
  const relocationCities = getRelocationCities();

  // Build category rows — enough for the interleaved layout
  const categoryOrder = [
    'in-home-care', 'senior-living',       // batch 1 (before This Week)
    'pickleball', 'estate-planning',        // batch 2 (after This Week)
    'fitness', 'physical-therapy',          // batch 3 (after Newsletter)
    'restaurants', 'hearing-vision',        // batch 4 (after Relocation)
    'dental', 'financial-advisors',         // batch 5 (after Guides)
    'memory-care', 'medicare',              // batch 6
    'pharmacy', 'house-cleaning',           // batch 7
    'handyman', 'hospice',                  // batch 8
    'senior-centers', 'elder-law',          // batch 9
    'transportation',                       // batch 10
  ];

  const categoryRows = categoryOrder.map(slug => {
    const cat = categories.find(c => c.slug === slug);
    const businesses = getBusinessesByCategory(slug).slice(0, 4);
    return { category: cat, businesses };
  }).filter(row => row.category && row.businesses.length > 0);

  // Split into batches for interleaving
  const batch1 = categoryRows.slice(0, 2);
  const batch2 = categoryRows.slice(2, 4);
  const batch3 = categoryRows.slice(4, 6);
  const batch4 = categoryRows.slice(6, 8);
  const batch5 = categoryRows.slice(8, 10);
  const remaining = categoryRows.slice(10);

  // Premium spotlight businesses
  const premiumBusinesses = featured.slice(0, 3);
  const heroRightBusinesses = featured.length > 3
    ? featured.slice(3, 7)
    : allBusinesses.filter(b => !premiumBusinesses.includes(b)).slice(0, 4);

  // Popular categories with real counts
  const popularCategories = [
    { slug: 'senior-living', name: 'Senior Living' },
    { slug: 'hearing-vision', name: 'Hearing & Vision' },
    { slug: 'physical-therapy', name: 'Physical Therapy' },
    { slug: 'restaurants', name: 'Dining' },
    { slug: 'in-home-care', name: 'In-Home Care' },
    { slug: 'memory-care', name: 'Memory Care' },
  ].map(cat => ({
    ...cat,
    count: getBusinessesByCategory(cat.slug).length,
  }));

  // City descriptions for relocation cards
  const cityDescriptions = {
    'georgetown': 'Home to Sun City Texas, the largest 55+ community in the state',
    'round-rock': 'Urban convenience with top-tier healthcare near Austin',
    'cedar-park': 'Hill Country access with excellent trails and recreation',
    'leander': 'Affordable homes with MetroRail access and Hill Country views',
    'pflugerville': 'Diverse and affordable, perfectly located near Austin',
    'hutto': 'Small-town charm with affordable homes and community spirit',
    'taylor': 'Historic charm and the most affordable homes in the county',
    'liberty-hill': 'Hill Country living with scenic beauty and spacious lots',
    'jarrell': 'Affordable and quiet at the northern edge of WilCo',
    'florence': 'Peaceful countryside living with Hill Country lakes nearby',
  };

  // Schema
  const collectionSchema = generateCollectionPageSchema(
    'Senior Services Directory for Williamson County, TX',
    'Find trusted senior services, healthcare, activities, and resources in Williamson County, TX.',
    allBusinesses.slice(0, 20).map((b, i) => ({
      position: i + 1,
      name: b.name,
      url: `https://wilcoguide.com/seniors/directory/${b.slug}`,
    }))
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors Directory', url: 'https://wilcoguide.com/seniors' },
  ]);

  return (
    <>
      <SchemaMarkup schema={collectionSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      <div className="directory-page">
        {/* ══════════ Directory Hero Text Block ══════════ */}
        <div className="directory-hero">
          <h1 className="directory-hero-title">Senior Services Directory</h1>
          <p className="directory-hero-subtitle">Trusted local businesses for seniors in Williamson County — healthcare, senior living, active lifestyle, financial planning, and more.</p>
        </div>

        <TrendingBar />

        {/* ══════════ 1. Hero Section ══════════ */}
        <div className="spotlight-section">
          <div className="hero-grid">
            {premiumBusinesses.length > 0 && (
              <PremiumCard businesses={premiumBusinesses} />
            )}

            <div className="hero-right">
              {heroRightBusinesses.slice(0, 4).map((business) => (
                <BusinessCard key={business.slug} business={business} variant="hero" />
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ 2. First 2 Category Rows ══════════ */}
        {batch1.map(({ category, businesses }) => (
          <CategoryRow
            key={category.slug}
            title={category.name}
            count={getBusinessesByCategory(category.slug).length}
            categorySlug={category.slug}
            businesses={businesses}
          />
        ))}

        {/* ══════════ 3. This Week in Senior Life ══════════ */}
        <div className="content-break this-week-section">
          <div className="content-break-inner">
            <h2 className="content-break-title">This Week in Senior Life</h2>
            <p className="content-break-subtitle">Events, tips, and stories from the WilCo senior community</p>

            <div className="this-week-grid">
              {/* Card 1: Popular Categories */}
              <div className="tw-card tw-card-categories">
                <div className="tw-card-accent" style={{ backgroundColor: 'var(--orange)' }} />
                <div className="tw-card-body">
                  <div className="tw-card-icon">📂</div>
                  <h3 className="tw-card-title">Popular Categories</h3>
                  <div className="tw-category-list">
                    {popularCategories.map(cat => (
                      <Link key={cat.slug} href={`/seniors/${cat.slug}`} className="tw-category-item">
                        <span className="tw-category-name">{cat.name}</span>
                        <span className="tw-category-count">{cat.count} businesses</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/seniors" className="tw-card-link">Browse all categories →</Link>
                </div>
              </div>

              {/* Card 2: Tip of the Week */}
              <div className="tw-card tw-card-tip">
                <div className="tw-card-accent" style={{ backgroundColor: 'var(--blue)' }} />
                <div className="tw-card-body">
                  <div className="tw-card-icon">💡</div>
                  <h3 className="tw-card-title">5 Ways to Stay Active This Winter</h3>
                  <p className="tw-card-text">
                    Central Texas winters are mild, but shorter days can make it tempting to stay indoors. Try
                    morning walks at Garey Park, join a weekday pickleball group, or check out the fitness classes
                    at your local rec center. Many WilCo gyms and studios offer senior discounts on monthly memberships.
                  </p>
                  <Link href="/seniors/pickleball" className="tw-card-link">Explore active lifestyle →</Link>
                </div>
              </div>

              {/* Card 3: Community Spotlight */}
              <div className="tw-card tw-card-spotlight">
                <div className="tw-card-accent" style={{ backgroundColor: 'var(--green)' }} />
                <div className="tw-card-body">
                  <div className="tw-card-icon">👥</div>
                  <h3 className="tw-card-title">Community Spotlight</h3>
                  <p className="tw-card-text">
                    Every week we highlight someone making a difference in the WilCo senior community &mdash;
                    volunteers, business owners, activity organizers, and neighbors who go above and beyond.
                    Know someone who deserves recognition?
                  </p>
                  <Link href="/seniors/get-listed" className="tw-card-link">Nominate someone →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ 4. Next 2 Category Rows ══════════ */}
        {batch2.map(({ category, businesses }) => (
          <CategoryRow
            key={category.slug}
            title={category.name}
            count={getBusinessesByCategory(category.slug).length}
            categorySlug={category.slug}
            businesses={businesses}
          />
        ))}

        {/* ══════════ 5. Newsletter Signup Banner ══════════ */}
        <NewsletterCTA variant="inline" />

        {/* ══════════ 6. Next 2 Category Rows ══════════ */}
        {batch3.map(({ category, businesses }) => (
          <CategoryRow
            key={category.slug}
            title={category.name}
            count={getBusinessesByCategory(category.slug).length}
            categorySlug={category.slug}
            businesses={businesses}
          />
        ))}

        {/* ══════════ 7. Relocating to Williamson County? ══════════ */}
        <div className="content-break relocation-section">
          <div className="content-break-inner">
            <div className="relocation-header">
              <div>
                <h2 className="content-break-title">🏡 Relocating to Williamson County?</h2>
                <p className="content-break-subtitle">Explore 10 cities where seniors are building their next chapter</p>
              </div>
              <Link href="/seniors/relocating" className="btn-primary">Full Relocation Guide →</Link>
            </div>

            <div className="relocation-city-grid">
              {relocationCities.map(city => (
                <Link
                  key={city.slug}
                  href={`/seniors/relocating/${city.slug}`}
                  className="relocation-city-card"
                >
                  <h3 className="relocation-city-name">{city.name}</h3>
                  <p className="relocation-city-desc">{cityDescriptions[city.slug] || ''}</p>
                  {city.highlights && city.highlights.length > 0 && (
                    <span className="relocation-city-highlight">{city.highlights[0]}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ 8. Next 2 Category Rows ══════════ */}
        {batch4.map(({ category, businesses }) => (
          <CategoryRow
            key={category.slug}
            title={category.name}
            count={getBusinessesByCategory(category.slug).length}
            categorySlug={category.slug}
            businesses={businesses}
          />
        ))}

        {/* ══════════ 9. Guides & Resources ══════════ */}
        <div className="content-break guides-section">
          <div className="content-break-inner">
            <div className="guides-header">
              <div>
                <h2 className="content-break-title">Guides &amp; Resources</h2>
                <p className="content-break-subtitle">In-depth articles to help you navigate senior life in WilCo</p>
              </div>
            </div>

            <div className="guides-grid">
              {guides.map(guide => (
                <Link
                  key={guide.slug}
                  href={`/seniors/guides/${guide.slug}`}
                  className="guide-card"
                >
                  <div className="guide-card-img">
                    <img src={guide.heroImage} alt={guide.title} />
                  </div>
                  <div className="guide-card-body">
                    <span className="guide-card-category">{guide.categoryName}</span>
                    <h3 className="guide-card-title">{guide.title}</h3>
                    <p className="guide-card-excerpt">{guide.excerpt}</p>
                    <span className="guide-card-meta">{guide.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ 10. Remaining Category Rows ══════════ */}
        {batch5.map(({ category, businesses }) => (
          <CategoryRow
            key={category.slug}
            title={category.name}
            count={getBusinessesByCategory(category.slug).length}
            categorySlug={category.slug}
            businesses={businesses}
          />
        ))}

        {remaining.map(({ category, businesses }) => (
          <CategoryRow
            key={category.slug}
            title={category.name}
            count={getBusinessesByCategory(category.slug).length}
            categorySlug={category.slug}
            businesses={businesses}
          />
        ))}

        {/* ══════════ 11. Bottom CTA Blocks ══════════ */}
        <div className="relocation-banner">
          <div className="relocation-banner-content">
            <div className="relocation-banner-title">🏡 Thinking about moving to WilCo?</div>
            <div className="relocation-banner-sub">Explore our complete guide to retiring in Williamson County — cost of living, healthcare, 55+ communities, and city-by-city comparisons.</div>
          </div>
          <Link href="/seniors/relocating" className="btn-primary">Explore Relocation Guide →</Link>
        </div>

        <NewsletterCTA variant="inline" />
        <CTABanner />
      </div>
    </>
  );
}
