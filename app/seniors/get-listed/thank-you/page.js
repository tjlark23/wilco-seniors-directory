import Link from 'next/link';
import Breadcrumb from '../../../../components/Breadcrumb';

export const metadata = {
  title: 'Thanks for Submitting! | WilCo Seniors Directory',
  description: 'Your listing request has been received. We will review it within 48 hours.',
};

export default function ThankYouPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Seniors', href: '/seniors' },
        { label: 'Get Listed', href: '/seniors/get-listed' },
        { label: 'Thank You' },
      ]} />

      <div className="directory-page">
        <div className="thank-you-page">
          <div className="thank-you-icon">✅</div>
          <h1 className="thank-you-title">Thanks for submitting!</h1>
          <p className="thank-you-text">
            We have received your listing request and will review your submission within 48 hours.
            You will receive an email confirmation once your business has been added to the directory.
          </p>
          <div className="thank-you-actions">
            <Link href="/seniors" className="btn-primary">Back to Directory</Link>
            <Link href="/seniors/get-listed" className="btn-secondary">Submit Another</Link>
          </div>
        </div>
      </div>
    </>
  );
}
