import Breadcrumb from '../../../components/Breadcrumb';

export const metadata = {
  title: 'Contact Us | WilCo Seniors Directory',
  description: 'Have a question about the WilCo Seniors Directory? Get in touch with our team.',
  alternates: { canonical: 'https://wilcoguide.com/seniors/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: 'Contact Us' },
      ]} />

      <div className="directory-page">
        <div className="contact-layout">
          <main className="contact-main">
            <div className="contact-header">
              <h1 className="contact-title">Contact Us</h1>
              <p className="contact-sub">
                Have a question, suggestion, or just want to say hello? We&rsquo;d love to hear from you.
                Fill out the form below and we&rsquo;ll get back to you as soon as we can.
              </p>
            </div>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="contact-form"
            >
              <input type="hidden" name="access_key" value="e19dec89-2b8b-4878-b759-b07785892e56" />
              <input type="hidden" name="redirect" value="https://seniors.wilcoguide.com/seniors/contact/thank-you" />
              <input type="hidden" name="subject" value="New Contact Form Message - WilCo Seniors" />
              <input type="hidden" name="from_name" value="WilCo Seniors Contact Form" />

              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name <span className="required">*</span></label>
                <input type="text" id="contact-name" name="name" className="form-input" required placeholder="John Smith" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address <span className="required">*</span></label>
                <input type="email" id="contact-email" name="email" className="form-input" required placeholder="john@example.com" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Your Question or Message <span className="required">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-input form-textarea"
                  rows={6}
                  required
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="form-submit-btn">Send Message</button>
            </form>
          </main>

          <aside className="contact-sidebar">
            <div className="widget">
              <div className="widget-header">
                <h3 className="widget-title">Other Ways to Reach Us</h3>
              </div>
              <div className="widget-body">
                <ul className="contact-methods">
                  <li>
                    <span className="contact-method-icon">📧</span>
                    <div>
                      <strong>Email</strong>
                      <p><a href="mailto:tj@wilcoguide.com">tj@wilcoguide.com</a></p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-method-icon">🏢</span>
                    <div>
                      <strong>Want to Get Listed?</strong>
                      <p>If you run a senior-focused business, <a href="/seniors/get-listed">submit a listing request</a> instead.</p>
                    </div>
                  </li>
                  <li>
                    <span className="contact-method-icon">📬</span>
                    <div>
                      <strong>Newsletter</strong>
                      <p>Get weekly updates on senior services in WilCo. <a href="https://www.wilcoseniors.com/subscribe" target="_blank" rel="noopener noreferrer">Subscribe free</a>.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
