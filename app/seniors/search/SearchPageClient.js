'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ListingCard from '../../../components/ListingCard';
import NewsletterCTA from '../../../components/NewsletterCTA';

export default function SearchPageClient({ businesses, guides }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');

  const results = useMemo(() => {
    if (!query.trim()) return { businesses: [], guides: [] };
    const q = query.toLowerCase();
    return {
      businesses: businesses.filter(b =>
        b.name.toLowerCase().includes(q) ||
        (b.shortDescription || '').toLowerCase().includes(q) ||
        (b.description || '').toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q)
      ),
      guides: guides.filter(g =>
        g.title.toLowerCase().includes(q) ||
        (g.excerpt || '').toLowerCase().includes(q)
      ),
    };
  }, [query, businesses, guides]);

  const totalCount = results.businesses.length + results.guides.length;

  return (
    <>
      {/* Search Bar Section */}
      <div className="search-bar-section">
        <div className="search-bar-inner">
          <div className="search-input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search senior services, healthcare, activities..."
            />
          </div>
          <button className="search-btn" onClick={() => {}}>Search</button>
        </div>
      </div>

      <div className="search-page">
        <div className="results-header">
          <div className="results-query">
            {query ? <>Results for <span>"{query}"</span></> : 'Search the directory'}
          </div>
          {query && <div className="results-count">{totalCount} results</div>}
        </div>

        {/* Type Tabs */}
        <div className="type-tabs">
          <button className={`type-tab${activeTab === 'all' ? ' active' : ''}`} onClick={() => setActiveTab('all')}>
            All<span className="tab-count">{totalCount}</span>
          </button>
          <button className={`type-tab${activeTab === 'businesses' ? ' active' : ''}`} onClick={() => setActiveTab('businesses')}>
            Businesses<span className="tab-count">{results.businesses.length}</span>
          </button>
          <button className={`type-tab${activeTab === 'guides' ? ' active' : ''}`} onClick={() => setActiveTab('guides')}>
            Resources<span className="tab-count">{results.guides.length}</span>
          </button>
        </div>

        <div className="results-layout">
          <div className="results-main">
            {/* Business results */}
            {(activeTab === 'all' || activeTab === 'businesses') && results.businesses.map(b => (
              <ListingCard key={b.slug} business={b} />
            ))}

            {/* Guide results */}
            {(activeTab === 'all' || activeTab === 'guides') && results.guides.map(g => (
              <Link key={g.slug} href={`/seniors/guides/${g.slug}`} className="result-article" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="result-article-img">
                  <img src={g.heroImage} alt={g.title} />
                </div>
                <div className="result-article-content">
                  <div className="result-article-title">{g.title}</div>
                  <div className="result-article-excerpt">{g.excerpt}</div>
                  <div className="result-article-meta">
                    <span>WilCo Seniors</span>
                    <span>{g.publishDate}</span>
                    <span>{g.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}

            {query && totalCount === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>No results found for "{query}"</p>
                <p style={{ fontSize: '14px' }}>Try a different search term or browse our categories.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <NewsletterCTA variant="sidebar" />
          </div>
        </div>
      </div>
    </>
  );
}
