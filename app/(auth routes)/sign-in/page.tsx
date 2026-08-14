import type { Metadata } from 'next';
import SignInForm from '@/components/SignInForm/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In | NoteHub',
  description: 'Sign in to your NoteHub account',
};

export default function SignInPage() {
  return <SignInForm />;
}