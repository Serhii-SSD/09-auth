import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 150) || 'Note details',
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content.slice(0, 150) || 'Note details',
        url: `/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note Details | NoteHub',
      description: 'View note details in NoteHub',
    };
  }
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}