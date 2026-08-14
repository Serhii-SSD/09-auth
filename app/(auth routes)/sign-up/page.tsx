import type { Metadata } from 'next';
import SignUpForm from '@/components/SignUpForm/SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up | NoteHub',
  description: 'Create a new NoteHub account',
};

export default function SignUpPage() {
  return <SignUpForm />;
}