import { Suspense } from 'react';
import { getBusinesses } from '../../../lib/getBusinesses';
import { getGuides } from '../../../lib/getGuides';
import SearchPageClient from './SearchPageClient';

export const metadata = {
  title: 'Search Senior Services',
  description: 'Search for senior services, healthcare, activities, and resources across Williamson County, TX.',
  alternates: { canonical: 'https://wilcoguide.com/seniors/search' },
};

export default function SearchPage() {
  const businesses = getBusinesses();
  const guides = getGuides();
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <SearchPageClient businesses={businesses} guides={guides} />
    </Suspense>
  );
}
