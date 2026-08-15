'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider/AuthProvider';
import css from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          {user && (
            <>
              <li className={css.navigationItem}>
                <Link href="/notes/filter/all" className={css.navigationLink}>
                  Notes
                </Link>
              </li>
              <li className={css.navigationItem}>
                <Link href="/profile" className={css.navigationLink}>
                  Profile
                </Link>
              </li>
              <li className={css.navigationItem}>
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    className={css.miniAvatar}
                    width={32}
                    height={32}
                    unoptimized
                      priority
/>
                )}
                <span className={css.username}>{user.username}</span>
                <button
                  onClick={handleLogout}
                  className={css.logoutButton}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li className={css.navigationItem}>
                <Link href="/sign-in" className={css.navigationLink}>
                  Sign In
                </Link>
              </li>
              <li className={css.navigationItem}>
                <Link href="/sign-up" className={css.navigationLink}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}