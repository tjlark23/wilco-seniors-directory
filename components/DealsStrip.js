import Link from 'next/link';

export default function DealsStrip({ deals }) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className="deals-strip">
      <div className="deals-strip-label">
        <span>&#x1F3F7;</span>
        Today&apos;s Deals
      </div>
      <div className="deals-scroll">
        {deals.map((deal, index) => (
          <Link
            key={index}
            href={`/seniors/directory/${deal.slug}`}
            className="deal-chip"
          >
            <span className="deal-chip-name">{deal.businessName}</span>
            <span className="deal-chip-offer">{deal.offer}</span>
          </Link>
        ))}
      </div>
      <Link href="/seniors/search?q=deals" className="deals-see-all">
        All Deals &rarr;
      </Link>
    </div>
  );
}
