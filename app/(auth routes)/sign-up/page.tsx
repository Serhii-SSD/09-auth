import type { Metadata } from 'next';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';

export const metadata: Metadata = {
  title: 'Sign Up | NoteHub',
  description: 'Create a new NoteHub account',
};

export default function SignUpPage() {
  return (
    <main className={css.mainContent}>
      <SignUpForm />
    </main>
  );
}