import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { fetchNoteById } from '@/lib/api/serverApi';
import NotePreviewClient from './NotePreview.client';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id, cookieHeader),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}