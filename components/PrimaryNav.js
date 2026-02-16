import Link from 'next/link';

export default function PrimaryNav() {
  return (
    <nav className="primary-nav">
      <a href="https://www.wilcoguide.com" className="nav-logo">
        <img
          src="/images/wilco-guide-logo.png"
          alt="WilCo Guide"
          className="nav-logo-img"
        />
      </a>
      <div className="nav-sections">
        <a href="https://www.wilcoguide.com/news" className="nav-tab">News</a>
        <a href="https://www.wilcoguide.com/directory" className="nav-tab">Directory</a>
        <a href="https://www.wilcoguide.com/jobs" className="nav-tab">Jobs</a>
        <Link href="/seniors" className="nav-tab active">Seniors</Link>
        <a href="https://www.wilcoguide.com/events" className="nav-tab">Events</a>
        <span className="nav-tab nav-tab-coming">Real Estate</span>
        <span className="nav-tab nav-tab-coming">Crime</span>
      </div>
      <div className="nav-right">
        <a
          href="https://www.wilcoseniors.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-subscribe"
        >
          Subscribe
        </a>
      </div>
    </nav>
  );
}
