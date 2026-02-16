import { getBusinesses, getFeaturedBusinesses, getBusinessesByCategory } from '../../lib/getBusinesses';
import { getCategories } from '../../lib/getCategories';
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

  // Get businesses for top category rows
  const topCategories = ['in-home-care', 'senior-living', 'pickleball', 'estate-planning', 'fitness', 'primary-care'];
  const categoryRows = topCategories.map(slug => {
    const cat = categories.find(c => c.slug === slug);
    const businesses = getBusinessesByCategory(slug).slice(0, 4);
    return { category: cat, businesses };
  }).filter(row => row.category && row.businesses.length > 0);

  // Premium spotlight businesses (first 3 featured)
  const premiumBusinesses = featured.slice(0, 3);

  // Hero right grid businesses (next 4 featured, or fill from all)
  const heroRightBusinesses = featured.length > 3
    ? featured.slice(3, 7)
    : allBusinesses.filter(b => !premiumBusinesses.includes(b)).slice(0, 4);

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
        <TrendingBar />

        {/* Hero Section - Premium Spotlight */}
        <div className="spotlight-section">
          <div className="spotlight-header">
            <div className="spotlight-label">
              <div className="spotlight-icon">★</div>
              <div className="spotlight-title">Spotlight Businesses</div>
            </div>
          </div>

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

        {/* Category Rows */}
        {categoryRows.map(({ category, businesses }) => (
          <CategoryRow
            key={category.slug}
            title={category.name}
            count={getBusinessesByCategory(category.slug).length}
            categorySlug={category.slug}
            businesses={businesses}
          />
        ))}

        {/* Relocation Banner */}
        <div className="relocation-banner">
          <div className="relocation-banner-content">
            <div className="relocation-banner-title">🏡 Thinking about moving to WilCo?</div>
            <div className="relocation-banner-sub">Explore our complete guide to retiring in Williamson County — cost of living, healthcare, 55+ communities, and city-by-city comparisons.</div>
          </div>
          <Link href="/seniors/relocating" className="btn-primary">Explore Relocation Guide →</Link>
        </div>

        {/* Newsletter CTA */}
        <NewsletterCTA variant="inline" />

        {/* CTA Banner */}
        <CTABanner />
      </div>
    </>
  );
}
