'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '@/lib/api';
import css from './ProfileForm.module.css';

export default function ProfileForm() {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  if (isLoading) {
    return <p style={{ color: '#ffa31a' }}>Loading profile...</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ username, email });
      }}
      className={css.form}
    >
      <h1 className={css.title}>Your Profile</h1>
      <div className={css.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={css.input}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={css.input}
        />
      </div>
      <button
        type="submit"
        className={css.submitButton}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}