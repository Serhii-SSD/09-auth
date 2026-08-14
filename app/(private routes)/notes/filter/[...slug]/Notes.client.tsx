'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.client.module.css';

const PER_PAGE = 12;

interface NotesClientProps {
  initialSlug: string;
}

export default function NotesClient({ initialSlug }: NotesClientProps) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(0);
  }, 500);

  const tag = initialSlug === 'all' ? undefined : initialSlug;

  const { data, isLoading, isPlaceholderData, error } = useQuery({
    queryKey: ['notes', page, search, initialSlug],
    queryFn: () => fetchNotes({ page: page + 1, perPage: PER_PAGE, search, tag }),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={({ selected }) => setPage(selected)}
            forcePage={page}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && !isPlaceholderData && <p>Communing with the Machine Spirit... Please wait.</p>}
      {error && <p className={css.error}>Failed to load notes. Please try again.</p>}

      <div className={isPlaceholderData ? css.loadingOpacity : ''}>
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>

      {data && data.notes.length === 0 && !isLoading && <p>No notes found</p>}
    </div>
  );
}