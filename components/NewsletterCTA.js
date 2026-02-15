export default function NewsletterCTA({ variant = 'sidebar' }) {
  if (variant === 'sidebar') {
    return (
      <div className="newsletter-sidebar">
        <h3 className="ns-title">Stay connected to senior life in WilCo</h3>
        <p className="ns-sub">
          Join thousands of 55+ Williamson County residents getting weekly
          updates on local services, events, and deals.
        </p>
        <input
          type="email"
          className="ns-input"
          placeholder="Enter your email"
        />
        <button className="ns-btn">Subscribe Free</button>
      </div>
    );
  }

  return (
    <div className="newsletter-sidebar" style={{ borderRadius: '16px', marginTop: '32px' }}>
      <h3 className="ns-title" style={{ fontSize: '22px' }}>
        Stay connected to senior life in WilCo
      </h3>
      <p className="ns-sub" style={{ fontSize: '14px', maxWidth: '480px' }}>
        Join thousands of 55+ Williamson County residents getting weekly
        updates on local services, events, and deals.
      </p>
      <div style={{ display: 'flex', gap: '8px', maxWidth: '400px' }}>
        <input
          type="email"
          className="ns-input"
          placeholder="Enter your email"
          style={{ marginBottom: 0, flex: 1 }}
        />
        <button className="ns-btn" style={{ width: 'auto', padding: '10px 24px', whiteSpace: 'nowrap' }}>
          Subscribe Free
        </button>
      </div>
    </div>
  );
}
