import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloudProInsights™ - Smarter Cloud Decisions Start Here',
  description: 'Navigate your cloud journey with confidence. Compare cloud services across AWS, Azure, GCP, Oracle, and IBM Cloud with real pricing and features.',
  keywords: 'cloud comparison, AWS, Azure, Google Cloud, Oracle Cloud, IBM Cloud, cloud services, cost analysis',
  authors: [{ name: 'AAkinDev' }],
  openGraph: {
    title: 'CloudProInsights™ - Smarter Cloud Decisions Start Here',
    description: 'Comprehensive cloud service comparison platform with real pricing and features across major providers.',
    type: 'website',
    url: 'https://aakindev.github.io/CloudProInsights/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
