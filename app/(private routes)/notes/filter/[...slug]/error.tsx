'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function FilterError({ error }: ErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}