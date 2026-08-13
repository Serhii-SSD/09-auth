'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreviewClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {(error || !note) && <p>Something went wrong.</p>}
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}