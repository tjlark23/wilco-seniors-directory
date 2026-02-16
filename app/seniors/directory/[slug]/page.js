import { getBusinesses, getBusinessBySlug, getRelatedBusinesses } from '../../../../lib/getBusinesses';
import { getCategoryBySlug } from '../../../../lib/getCategories';
import Breadcrumb from '../../../../components/Breadcrumb';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import NewsletterCTA from '../../../../components/NewsletterCTA';
import ReviewsList from '../../../../components/ReviewsList';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../../../../lib/generateSchema';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return getBusinesses().map(b => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
  const business = getBusinessBySlug(params.slug);
  if (!business) return {};
  return {
    title: `${business.name} | ${business.city}, TX`,
    description: business.shortDescription || `${business.name} in ${business.city}, TX. ${business.category} for seniors in Williamson County.`,
    alternates: { canonical: `https://wilcoguide.com/seniors/directory/${business.slug}` },
  };
}

export default function BusinessProfilePage({ params }) {
  const business = getBusinessBySlug(params.slug);
  if (!business) notFound();

  const category = getCategoryBySlug(business.category);
  const related = getRelatedBusinesses(business, 4);

  // Generate stars string based on rating
  const fullStars = Math.floor(business.rating || 0);
  const hasHalf = (business.rating || 0) - fullStars >= 0.5;
  const starsStr = '★'.repeat(fullStars) + (hasHalf ? '☆' : '') + '☆'.repeat(Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0)));

  // Price range display
  const priceActive = business.priceRange || '$$';
  const priceDisplay = priceActive + '$'.repeat(Math.max(0, 4 - priceActive.length));

  // Deduplicate photos by base URL (before size params like =w800-h500)
  const allPhotos = business.photos || [];
  const seenBases = new Set();
  const uniquePhotos = allPhotos.filter(url => {
    const base = url.split('=')[0];
    if (seenBases.has(base)) return false;
    seenBases.add(base);
    return true;
  });

  // If ALL photos are Street View thumbnails, show single hero only
  const allStreetView = uniquePhotos.length > 0 && uniquePhotos.every(url => url.includes('streetviewpixels'));
  const galleryPhotos = allStreetView ? uniquePhotos.slice(0, 1) : uniquePhotos;
  const useSingleHero = galleryPhotos.length <= 1;

  const businessSchema = generateLocalBusinessSchema(business);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wilcoguide.com' },
    { name: 'Seniors', url: 'https://wilcoguide.com/seniors' },
    { name: category ? category.name : business.category, url: `https://wilcoguide.com/seniors/${business.category}` },
    { name: business.name, url: `https://wilcoguide.com/seniors/directory/${business.slug}` },
  ]);

  return (
    <>
      <SchemaMarkup schema={businessSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: category ? category.name : business.category, href: `/seniors/${business.category}` },
        { label: business.name },
      ]} />

      <div className="profile-page">
        {/* Gallery */}
        <div className="gallery-section">
          <div className={`gallery-grid${useSingleHero ? ' gallery-single' : ''}`}>
            {galleryPhotos.slice(0, 5).map((photo, i) => (
              <div key={i} className={`gallery-item${i === 0 ? ' gallery-hero' : ''}`}>
                <img src={photo} alt={`${business.name} photo ${i + 1}`} />
                {i === 4 && allPhotos.length > 5 && (
                  <div className="gallery-count">+{allPhotos.length - 5} more</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="biz-header">
          <div className="biz-header-left">
            <div className="biz-verified">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              WilCo Seniors Approved
            </div>
            <h1 className="biz-name">{business.name}</h1>
            <div className="biz-meta">
              <span className="biz-category">{category ? category.name : business.category}</span>
              <span className="biz-price">
                {priceActive}
                <span className="biz-price-muted">{'$'.repeat(Math.max(0, 4 - priceActive.length))}</span>
              </span>
              <span className="biz-location">📍 {business.city}, TX</span>
            </div>
            <div className="biz-rating-row">
              <span className="biz-stars">{starsStr}</span>
              <span className="biz-rating-num">{business.rating || 'N/A'}</span>
              <span className="biz-rating-count">({business.reviewCount || 0} reviews)</span>
            </div>
            {business.tags && business.tags.length > 0 && (
              <div className="biz-tags-row">
                {business.tags.map((tag, i) => {
                  let tagClass = 'biz-tag';
                  const tl = tag.toLowerCase();
                  if (tl.includes('deal') || tl.includes('off') || tl.includes('free')) tagClass += ' biz-tag-deal';
                  else if (tl.includes('hiring')) tagClass += ' biz-tag-hiring';
                  else if (tl.includes('event')) tagClass += ' biz-tag-event';
                  else if (tl.includes('new')) tagClass += ' biz-tag-new';
                  else tagClass += ' biz-tag-deal';
                  return <span key={i} className={tagClass}>{tag}</span>;
                })}
              </div>
            )}
          </div>
          <div className="biz-header-actions">
            {business.phone && (
              <a href={`tel:${business.phone}`} className="action-btn action-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
                Call
              </a>
            )}
            {business.website && (
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Website
              </a>
            )}
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Directions
            </button>
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              Share
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="profile-content">
          {/* Main Content */}
          <div className="profile-main">
            {/* About */}
            <div className="widget">
              <div className="widget-header"><h2 className="widget-title">About</h2></div>
              <div className="widget-body">
                <div className="about-text" dangerouslySetInnerHTML={{ __html: business.description ? `<p>${business.description.replace(/\n\n/g, '</p><p>')}</p>` : '<p>No description available.</p>' }} />
              </div>
            </div>

            {/* Reviews */}
            <ReviewsList
              reviews={business.reviews_list || []}
              rating={business.rating}
              reviewCount={business.reviewCount}
            />
          </div>

          {/* Sidebar */}
          <div className="profile-sidebar">
            {/* Info Widget */}
            <div className="widget">
              <div className="widget-header"><h2 className="widget-title">Info</h2></div>
              <div className="widget-body">
                {business.hours && (
                  <div className="info-row">
                    <div className="info-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <div className="info-label">Hours</div>
                      <div className="hours-grid">
                        {Object.entries(business.hours).map(([day, time]) => (
                          <div key={day} className="hours-row">
                            <span className="hours-day">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                            <span className="hours-time">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {business.phone && (
                  <div className="info-row">
                    <div className="info-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
                    </div>
                    <div>
                      <div className="info-label">Phone</div>
                      <div className="info-value"><a href={`tel:${business.phone}`}>{business.phone}</a></div>
                    </div>
                  </div>
                )}
                {business.website && (
                  <div className="info-row">
                    <div className="info-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <div>
                      <div className="info-label">Website</div>
                      <div className="info-value"><a href={business.website} target="_blank" rel="noopener noreferrer">{business.website.replace(/^https?:\/\//, '')}</a></div>
                    </div>
                  </div>
                )}
                {business.address && (
                  <div className="info-row">
                    <div className="info-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <div className="info-label">Address</div>
                      <div className="info-value">{business.address}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="widget">
              <div className="widget-body" style={{ padding: '14px' }}>
                <div className="map-placeholder">
                  <div className="map-pin">
                    <div className="map-pin-icon"><div className="map-pin-dot"></div></div>
                    <div className="map-address">{business.address || `${business.city}, TX`}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <NewsletterCTA variant="sidebar" />

            {/* You Might Also Like */}
            {related.length > 0 && (
              <div className="widget">
                <div className="widget-header"><h2 className="widget-title">You Might Also Like</h2></div>
                <div className="widget-body">
                  {related.slice(0, 3).map(rb => (
                    <Link key={rb.slug} href={`/seniors/directory/${rb.slug}`} className="sidebar-biz-card">
                      <div className="sidebar-biz-img">
                        <img src={rb.photos?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80'} alt={rb.name} />
                      </div>
                      <div className="sidebar-biz-info">
                        <div className="sidebar-biz-name">{rb.name}</div>
                        <div className="sidebar-biz-detail">{rb.categoryName || rb.category} · {rb.priceRange || '$$'} · {rb.city}</div>
                        <div className="sidebar-biz-stars">{'★'.repeat(Math.floor(rb.rating || 0))}{'☆'.repeat(5 - Math.floor(rb.rating || 0))} <span>{rb.rating || 'N/A'}</span></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Claim Listing CTA */}
        <div className="claim-listing-cta">
          <p>Is this your business? Manage your listing and reach more seniors.</p>
          <Link href="/seniors/get-listed">Get Listed on WilCo Seniors →</Link>
        </div>

        {/* Related Businesses Grid */}
        {related.length > 0 && (
          <>
            <div className="section-header-full">
              <h2 className="section-title-full">Related {category ? category.name : ''} in {business.city}</h2>
              <Link href={`/seniors/${business.category}`} className="section-see-all">See all →</Link>
            </div>
            <div className="related-grid">
              {related.map(rb => (
                <Link key={rb.slug} href={`/seniors/directory/${rb.slug}`} className="related-card">
                  <img src={rb.photos?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'} alt={rb.name} />
                  <div className="related-overlay"></div>
                  <div className="related-info">
                    <div className="related-name">{rb.name}</div>
                    <div className="related-detail">{rb.categoryName || rb.category} · {rb.priceRange || '$$'} · {rb.city}</div>
                    <div className="related-stars">{'★'.repeat(Math.floor(rb.rating || 0))}{'☆'.repeat(5 - Math.floor(rb.rating || 0))} {rb.rating || 'N/A'}</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
