import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand Column */}
        <div className="footer-brand">
          <img
            src="/images/wilco-guide-logo.png"
            alt="WilCo Guide"
            className="footer-logo-img"
          />
          <p className="footer-brand-desc">
            Your local guide to senior services, healthcare, activities, and community resources across Williamson County, Texas.
          </p>
        </div>

        {/* Directory Column */}
        <div>
          <h4 className="footer-col-title">Directory</h4>
          <ul className="footer-links">
            <li><Link href="/seniors/in-home-care">In-Home Care</Link></li>
            <li><Link href="/seniors/senior-living">Senior Living</Link></li>
            <li><Link href="/seniors/memory-care">Memory Care</Link></li>
            <li><Link href="/seniors/physical-therapy">Physical Therapy</Link></li>
            <li><Link href="/seniors/restaurants">Dining</Link></li>
            <li><Link href="/seniors/hearing-vision">Hearing &amp; Vision</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h4 className="footer-col-title">Resources</h4>
          <ul className="footer-links">
            <li><Link href="/seniors/guides/choosing-in-home-care">In-Home Care Guide</Link></li>
            <li><Link href="/seniors/guides/medicare-enrollment-guide">Medicare Guide</Link></li>
            <li><Link href="/seniors/guides/pickleball-leagues">Pickleball Guide</Link></li>
            <li><Link href="/seniors/guides/senior-living-options">Senior Living Guide</Link></li>
            <li><Link href="/seniors/relocating">Relocating to WilCo</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><Link href="/seniors/get-listed">Get Your Business Listed</Link></li>
            <li><Link href="/seniors/contact">Contact Us</Link></li>
            <li><a href="https://www.wilcoseniors.com/subscribe" target="_blank" rel="noopener noreferrer">Subscribe to Newsletter</a></li>
            <li><a href="https://www.wilcoguide.com" target="_blank" rel="noopener noreferrer">WilCo Guide Home</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>&copy; 2026 WilCo Guide. All rights reserved.</span>
          <span>Serving Williamson County, Texas &mdash; Round Rock, Georgetown, Cedar Park &amp; beyond.</span>
        </div>
      </div>
    </footer>
  );
}
