import Breadcrumb from '../../../components/Breadcrumb';
import NewsletterCTA from '../../../components/NewsletterCTA';

export const metadata = {
  title: 'Get Your Business Listed | WilCo Seniors Directory',
  description: 'Add your senior-focused business to the WilCo Seniors Directory. Reach 55+ residents across Williamson County, TX.',
  alternates: { canonical: 'https://wilcoguide.com/seniors/get-listed' },
};

const categoryOptions = [
  'In-Home Care & Home Health',
  'Memory Care & Dementia Services',
  'Senior Living Communities',
  'Primary Care Physicians',
  'Physical Therapy & Rehabilitation',
  'Hearing & Vision Care',
  'Dental Care',
  'Mental Health & Counseling',
  'Pharmacy & Medical Supply',
  'Hospice & Palliative Care',
  'Estate Planning Attorneys',
  'Financial Advisors & Wealth Management',
  'Medicare & Insurance Advisors',
  'Elder Law Attorneys',
  'Tax Preparation',
  'Reverse Mortgage Advisors',
  'Pickleball Courts & Instruction',
  'Fitness & Exercise Programs',
  'Golf Courses & Clubs',
  'Swimming & Aquatic Programs',
  'Walking & Hiking Groups',
  'Dance Classes',
  'Yoga & Tai Chi',
  'Home Modification & Accessibility',
  'Lawn Care & Landscaping',
  'Handyman Services',
  'House Cleaning',
  'Senior Centers & Community Groups',
  'Volunteer Opportunities',
  'Religious Organizations',
  'Senior Transportation Services',
  'Senior-Friendly Restaurants',
];

const cityOptions = [
  'Round Rock',
  'Georgetown',
  'Cedar Park',
  'Leander',
  'Pflugerville',
  'Hutto',
  'Taylor',
  'Liberty Hill',
  'Jarrell',
  'Florence',
];

export default function GetListedPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: 'Get Listed' },
      ]} />

      <div className="directory-page">
        <div className="get-listed-layout">
          <main className="get-listed-main">
            <div className="get-listed-header">
              <h1 className="get-listed-title">Get Your Business Listed</h1>
              <p className="get-listed-sub">
                Join the WilCo Seniors Directory and connect with thousands of 55+ residents
                across Williamson County. Fill out the form below and our team will review your
                submission within 48 hours.
              </p>
            </div>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="get-listed-form"
            >
              {/* Web3Forms hidden fields */}
              <input type="hidden" name="access_key" value="e19dec89-2b8b-4878-b759-b07785892e56" />
              <input type="hidden" name="redirect" value="https://seniors.wilcoguide.com/seniors/get-listed/thank-you" />
              <input type="hidden" name="subject" value="New Get Listed Request - WilCo Seniors Directory" />
              <input type="hidden" name="from_name" value="WilCo Seniors Directory" />

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="business-name">Business Name <span className="required">*</span></label>
                  <input type="text" id="business-name" name="Business Name" className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Contact Name <span className="required">*</span></label>
                  <input type="text" id="contact-name" name="Contact Name" className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email <span className="required">*</span></label>
                  <input type="email" id="email" name="Email" className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone <span className="required">*</span></label>
                  <input type="tel" id="phone" name="Phone" className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="category">Business Category <span className="required">*</span></label>
                  <select id="category" name="Business Category" className="form-input" required>
                    <option value="">Select a category...</option>
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="city">City <span className="required">*</span></label>
                  <select id="city" name="City" className="form-input" required>
                    <option value="">Select a city...</option>
                    {cityOptions.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group form-group-full">
                  <label className="form-label" htmlFor="website">Website URL</label>
                  <input type="url" id="website" name="Website" className="form-input" placeholder="https://" />
                </div>

                <div className="form-group form-group-full">
                  <label className="form-label" htmlFor="description">Brief description of your business</label>
                  <textarea id="description" name="Description" className="form-input form-textarea" rows={4} placeholder="Tell us about the services you offer to seniors in Williamson County..." />
                </div>

                <div className="form-group form-group-full">
                  <label className="form-label" htmlFor="referral">How did you hear about us?</label>
                  <input type="text" id="referral" name="How Did You Hear About Us" className="form-input" />
                </div>
              </div>

              <button type="submit" className="form-submit-btn">Submit Listing Request</button>
            </form>
          </main>

          <aside className="get-listed-sidebar">
            <div className="widget">
              <div className="widget-header">
                <h3 className="widget-title">Why Get Listed?</h3>
              </div>
              <div className="widget-body">
                <ul className="benefits-list">
                  <li>
                    <span className="benefit-icon">👥</span>
                    <div>
                      <strong>Reach 55+ residents</strong>
                      <p>Connect with thousands of seniors and their families actively searching for services in Williamson County.</p>
                    </div>
                  </li>
                  <li>
                    <span className="benefit-icon">🔍</span>
                    <div>
                      <strong>SEO-optimized listing</strong>
                      <p>Your business gets a dedicated profile page optimized for local search, helping you rank on Google.</p>
                    </div>
                  </li>
                  <li>
                    <span className="benefit-icon">📧</span>
                    <div>
                      <strong>Newsletter promotion</strong>
                      <p>Featured businesses get highlighted in our weekly newsletter to 15,000+ local subscribers.</p>
                    </div>
                  </li>
                  <li>
                    <span className="benefit-icon">⭐</span>
                    <div>
                      <strong>Build trust with reviews</strong>
                      <p>Showcase your Google ratings and reviews to build credibility with potential clients.</p>
                    </div>
                  </li>
                  <li>
                    <span className="benefit-icon">📍</span>
                    <div>
                      <strong>Local focus</strong>
                      <p>We only list businesses in Williamson County, so your listing reaches the right audience.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <NewsletterCTA variant="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
