import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/data/site';

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: '%s',
  },
  description: site.bio,
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plexMono.className}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="site-shell mx-auto flex min-h-screen max-w-[680px] flex-col gap-7 px-4 pt-6 pb-12 sm:gap-9 sm:px-6 sm:pt-14 sm:pb-24">
          <Header />
          <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
