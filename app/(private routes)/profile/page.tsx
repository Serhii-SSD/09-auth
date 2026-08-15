'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfilePage.module.css';

const DEFAULT_AVATAR = 'https://ac.goit.global/fullstack/react/default-avatar.jpg';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <p style={{ color: '#ffa31a' }}>Loading profile...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Your Profile</h1>

        <Image
          src={user.avatar || DEFAULT_AVATAR}
          alt={user.username}
          width={120}
          height={120}
          className={css.avatar}
          unoptimized
        />

        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className={css.actions}>
          <Link href="/profile/edit" className={css.editButton}>
            Edit Profile
          </Link>
        </div>
      </div>
    </main>
  );
}