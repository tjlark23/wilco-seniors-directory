'use client';

import { useState } from 'react';

function StarDisplay({ rating }) {
  const full = Math.floor(rating || 0);
  const hasHalf = (rating || 0) - full >= 0.5;
  return (
    <span className="review-stars">
      {'★'.repeat(full)}
      {hasHalf ? '☆' : ''}
      {'☆'.repeat(Math.max(0, 5 - full - (hasHalf ? 1 : 0)))}
    </span>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    // Format: "07/18/2025 16:29:40" or ISO
    const parts = dateStr.split(' ')[0];
    if (parts.includes('/')) {
      const [month, day, year] = parts.split('/');
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    const d = new Date(dateStr);
    if (!isNaN(d)) {
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  } catch (e) {}
  return dateStr;
}

export default function ReviewsList({ reviews, rating, reviewCount }) {
  const [showAll, setShowAll] = useState(false);

  // Hide entire reviews section when we have no actual review text to show
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const fullStars = Math.floor(rating || 0);
  const hasHalf = (rating || 0) - fullStars >= 0.5;
  const starsStr = '★'.repeat(fullStars) + (hasHalf ? '☆' : '') + '☆'.repeat(Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0)));

  const initialCount = 5;
  const displayedReviews = showAll ? reviews : reviews.slice(0, initialCount);
  const hasMore = reviews.length > initialCount;

  return (
    <div className="widget">
      <div className="widget-header"><h2 className="widget-title">Reviews</h2></div>
      <div className="widget-body">
        {/* Summary */}
        <div className="reviews-summary">
          <div className="reviews-big-num">{rating || 'N/A'}</div>
          <div>
            <div className="reviews-stars-big">{starsStr}</div>
            <div className="reviews-count-text">Based on {reviewCount || 0} reviews</div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="reviews-list">
          {displayedReviews.map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-header">
                <div className="review-author-info">
                  <div className="review-avatar">
                    {review.author ? review.author.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <div className="review-author">{review.author || 'Anonymous'}</div>
                    <div className="review-date">{formatDate(review.date)}</div>
                  </div>
                </div>
                <StarDisplay rating={review.rating} />
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}

          {hasMore && !showAll && (
            <button
              className="reviews-view-more"
              onClick={() => setShowAll(true)}
            >
              View {reviews.length - initialCount} More Review{reviews.length - initialCount > 1 ? 's' : ''}
            </button>
          )}

          {showAll && hasMore && (
            <button
              className="reviews-view-more"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
