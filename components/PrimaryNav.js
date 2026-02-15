import Link from 'next/link';

export default function PrimaryNav() {
  return (
    <nav className="primary-nav">
      <Link href="/seniors" className="nav-logo">
        <div className="logo-mark">W</div>
        <div className="logo-text">WilCo <span>Guide</span></div>
      </Link>
      <div className="nav-sections">
        <a href="#" className="nav-section-link">News</a>
        <a href="#" className="nav-section-link">Jobs</a>
        <Link href="/seniors" className="nav-section-link active">Directory</Link>
        <a href="#" className="nav-section-link">Real Estate</a>
        <a href="#" className="nav-section-link">Events</a>
        <a href="#" className="nav-section-link">Deals</a>
      </div>
      <div className="nav-right">
        <button className="nav-subscribe">Subscribe Free</button>
      </div>
    </nav>
  );
}
