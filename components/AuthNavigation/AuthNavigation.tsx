'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider/AuthProvider';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link
            href="/profile"
            prefetch={false}
            className={css.navigationLink}
          >
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userName}>{user.username}</p>
          <button
            className={css.logoutButton}
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={css.navigationLink}
        >
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={css.navigationLink}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}