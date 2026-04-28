import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';

export const metadata = {
  title: 'TQOZIYS | Innovative Digital Solutions',
  description: 'A professional company portfolio for high-end digital services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Loader />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
