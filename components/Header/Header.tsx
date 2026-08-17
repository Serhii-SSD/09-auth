'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuthenticated();
      router.push('/sign-in');
    }
  };

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link href="/notes/filter/all">Notes</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className={css.authButton}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link href="/sign-in">Sign In</Link>
              </li>
              <li>
                <Link href="/sign-up">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}