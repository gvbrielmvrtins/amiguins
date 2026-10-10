import type { Metadata } from 'next';
import LoadingPreview from '@/components/loading-preview';

export const metadata: Metadata = {
  title: 'Loading — AmiguINs',
  robots: { index: false, follow: false },
};

// Unlinked preview only; deliberately not an app/loading.tsx boundary.
export default function LoadingPreviewPage() {
  return <LoadingPreview />;
}
