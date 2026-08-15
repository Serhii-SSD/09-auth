import type { Metadata } from 'next';
import SignInForm from '@/components/SignInForm/SignInForm';
import css from './SignInPage.module.css';

export const metadata: Metadata = {
  title: 'Sign In | NoteHub',
  description: 'Sign in to your NoteHub account',
};

export default function SignInPage() {
  return (
    <main className={css.mainContent}>
      <SignInForm />
    </main>
  );
}