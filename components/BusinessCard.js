import Link from 'next/link';

function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '\u2605'.repeat(full) + '\u2606'.repeat(empty);
}

export default function BusinessCard({ business }) {
  const {
    name,
    slug,
    category,
    city,
    shortDescription,
    rating,
    reviewCount,
    photos,
    tags,
    priceRange,
  } = business;

  const photoUrl = photos && photos.length > 0 ? photos[0] : null;

  return (
    <Link href={`/seniors/directory/${slug}`} className="biz-card row-card">
      <div className="card-media">
        {photoUrl && <img src={photoUrl} alt={name} />}
      </div>
      <div className="card-overlay" />
      {tags && tags.length > 0 && (
        <div className="card-tags">
          {tags.includes('Active Deal') && (
            <span className="tag tag-deal">Active Deal</span>
          )}
          {tags.includes('Hiring') && (
            <span className="tag tag-hiring">Hiring</span>
          )}
          {tags.includes('New') && (
            <span className="tag tag-new">New</span>
          )}
          {tags.includes('Event') && (
            <span className="tag tag-event">Event</span>
          )}
          {tags.includes('Featured') && (
            <span className="tag tag-featured">Featured</span>
          )}
        </div>
      )}
      <div className="card-info">
        <div className="card-category">{business.categoryName || category}</div>
        <div className="card-name">{name}</div>
        {shortDescription && (
          <div className="card-desc">{shortDescription}</div>
        )}
        {city && <div className="card-location">{city}</div>}
        {rating != null && (
          <div className="card-rating">
            <span className="stars">{renderStars(rating)}</span>
            {reviewCount != null && (
              <span className="rating-count">({reviewCount})</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
