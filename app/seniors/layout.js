import PrimaryNav from '../../components/PrimaryNav';
import SecondaryNav from '../../components/SecondaryNav';
import Footer from '../../components/Footer';

export default function SeniorsLayout({ children }) {
  return (
    <>
      <PrimaryNav />
      <SecondaryNav />
      {children}
      <Footer />
    </>
  );
}
