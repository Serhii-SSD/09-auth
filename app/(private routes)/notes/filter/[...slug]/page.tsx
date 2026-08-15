import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugValue = slug[0];
  const filterLabel = slugValue === 'all' ? 'All notes' : slugValue;

  return {
    title: `${filterLabel} | NoteHub`,
    description: `Browse ${filterLabel.toLowerCase()} in NoteHub. Manage your personal notes efficiently.`,
    openGraph: {
      title: `${filterLabel} | NoteHub`,
      description: `Browse ${filterLabel.toLowerCase()} in NoteHub. Manage your personal notes efficiently.`,
      url: `/notes/filter/${slugValue}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const slugValue = slug[0];
  const queryClient = new QueryClient();

  const fetchParams: { page: number; perPage: number; tag?: string } = {
    page: 1,
    perPage: 12,
  };

  if (slugValue !== 'all') {
    fetchParams.tag = slugValue;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 0, '', slugValue],
    queryFn: () => fetchNotes(fetchParams, cookieHeader),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialSlug={slugValue} />
    </HydrationBoundary>
  );
}