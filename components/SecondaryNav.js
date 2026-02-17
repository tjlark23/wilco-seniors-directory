'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const categories = [
  { label: 'All', slug: '/seniors' },
  { label: 'Healthcare', slug: '/seniors/in-home-care' },
  { label: 'Senior Living', slug: '/seniors/senior-living' },
  { label: 'Active Lifestyle', slug: '/seniors/pickleball' },
  { label: 'Financial & Legal', slug: '/seniors/estate-planning' },
  { label: 'Dining', slug: '/seniors/restaurants' },
];

const cities = [
  { label: 'All WilCo', slug: '/seniors' },
  { label: 'Round Rock', slug: '/seniors/round-rock' },
  { label: 'Georgetown', slug: '/seniors/georgetown' },
  { label: 'Cedar Park', slug: '/seniors/cedar-park' },
  { label: 'Leander', slug: '/seniors/leander' },
  { label: 'Pflugerville', slug: '/seniors/pflugerville' },
  { label: 'Hutto', slug: '/seniors/hutto' },
  { label: 'Taylor', slug: '/seniors/taylor' },
  { label: 'Liberty Hill', slug: '/seniors/liberty-hill' },
  { label: 'Jarrell', slug: '/seniors/jarrell' },
  { label: 'Florence', slug: '/seniors/florence' },
];

export default function SecondaryNav({ activeCategory = 'All', activeCity = 'All WilCo' }) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const locationRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e) {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/seniors/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  function handleCitySelect(city) {
    setLocationOpen(false);
    router.push(city.slug);
  }

  return (
    <div className="secondary-nav">
      <div className="category-filters">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.slug}
            className={`cat-pill${activeCategory === cat.label ? ' active' : ''}`}
          >
            {cat.label}
          </Link>
        ))}
        <Link
          href="/seniors/relocating"
          className={`cat-pill cat-pill-relocating${pathname.startsWith('/seniors/relocating') ? ' active' : ''}`}
        >
          🏡 Relocating?
        </Link>
      </div>
      <div className="search-area">
        <Link href="/seniors/get-listed" className="get-listed-btn">
          + Get Listed
        </Link>
        <form className="search-bar" onSubmit={handleSearch}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search senior services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="location-dropdown" ref={locationRef}>
          <button
            className={`location-btn${locationOpen ? ' open' : ''}`}
            onClick={() => setLocationOpen(!locationOpen)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {activeCity}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`location-menu${locationOpen ? ' open' : ''}`}>
            {cities.map((city) => (
              <div
                key={city.label}
                className={`location-option${activeCity === city.label ? ' active' : ''}`}
                onClick={() => handleCitySelect(city)}
              >
                {city.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
