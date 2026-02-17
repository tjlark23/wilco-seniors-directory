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
        <span className="nav-tab nav-tab-soon">News<span className="soon-badge">Soon</span></span>
        <span className="nav-tab nav-tab-soon">Directory<span className="soon-badge">Soon</span></span>
        <span className="nav-tab nav-tab-soon">Jobs<span className="soon-badge">Soon</span></span>
        <Link href="/seniors" className="nav-tab active">Seniors</Link>
        <span className="nav-tab nav-tab-soon">Events<span className="soon-badge">Soon</span></span>
        <span className="nav-tab nav-tab-soon">Real Estate<span className="soon-badge">Soon</span></span>
        <span className="nav-tab nav-tab-soon">Crime<span className="soon-badge">Soon</span></span>
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
