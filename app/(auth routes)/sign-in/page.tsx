'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider/AuthProvider';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign In</h1>
        {error && <p className={css.error}>{error}</p>}
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={css.input}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={css.input}
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
}