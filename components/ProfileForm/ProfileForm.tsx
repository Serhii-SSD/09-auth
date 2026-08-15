'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';
import css from './ProfileForm.module.css';

const DEFAULT_AVATAR = 'https://ac.goit.global/fullstack/react/default-avatar.jpg';

interface ProfileFormContentProps {
  user: User;
  onSubmit: (data: Partial<User>) => void;
  isPending: boolean;
}

function ProfileFormContent({ user, onSubmit, isPending }: ProfileFormContentProps) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  return (
    <div className={css.container}>
      <h1 className={css.formTitle}>Your Profile</h1>

<div className={css.avatarWrapper}>
  <Image
    src={user.avatar || DEFAULT_AVATAR}
    alt={user.username}
    className={css.avatar}
    width={200}
    height={200}
          unoptimized
           loading="lazy" 
  />
</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ username, email });
        }}
        className={css.form}
      >
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

        <div className={css.actions}>
          <button
            type="submit"
            className={css.saveButton}
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProfileForm() {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  if (isLoading) {
    return <p style={{ color: '#ffa31a' }}>Loading profile...</p>;
  }

  if (!user) {
    return <p style={{ color: '#ffa31a' }}>User not found</p>;
  }

  return (
    <ProfileFormContent
      user={user}
      onSubmit={mutation.mutate}
      isPending={mutation.isPending}
    />
  );
}