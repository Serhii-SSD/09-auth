'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider/AuthProvider';
import css from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();

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
                  onClick={logout}
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