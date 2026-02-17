import Link from 'next/link';
import Breadcrumb from '../../../../components/Breadcrumb';

export const metadata = {
  title: 'Message Sent | WilCo Seniors Directory',
  description: 'Your message has been received. We will get back to you soon.',
};

export default function ContactThankYouPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: 'Contact', href: '/seniors/contact' },
        { label: 'Thank You' },
      ]} />

      <div className="directory-page">
        <div className="thank-you-page">
          <div className="thank-you-icon">✅</div>
          <h1 className="thank-you-title">Message sent!</h1>
          <p className="thank-you-text">
            Thanks for reaching out. We&rsquo;ve received your message and will get back to you as soon as possible.
          </p>
          <div className="thank-you-actions">
            <Link href="/seniors" className="btn-primary">Back to Directory</Link>
            <Link href="/seniors/contact" className="btn-secondary">Send Another Message</Link>
          </div>
        </div>
      </div>
    </>
  );
}
