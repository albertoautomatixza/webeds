import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

const roboto = Inter({ subsets: ['latin'], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'Engineering DS - Soluciones de Ingeniería 4.0',
  description:
    'Innovación eléctrica e industrial con tecnología de vanguardia. Diseño, desarrollo y construcción de proyectos eléctricos e industriales en México.',
  keywords: [
    'ingeniería eléctrica',
    'automatización industrial',
    'proyectos eléctricos',
    'ingeniería 4.0',
    'México',
    'Monterrey',
  ],
  authors: [{ name: 'Engineering DS' }],
  creator: 'Engineering DS',
  publisher: 'Engineering DS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://engineeringds.com.mx',
    title: 'Engineering DS - Soluciones de Ingeniería 4.0',
    description:
      'Innovación eléctrica e industrial con tecnología de vanguardia. Diseño, desarrollo y construcción de proyectos eléctricos e industriales en México.',
    siteName: 'Engineering DS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering DS - Soluciones de Ingeniería 4.0',
    description:
      'Innovación eléctrica e industrial con tecnología de vanguardia.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      </head>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
