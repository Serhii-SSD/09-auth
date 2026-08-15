import type { Metadata } from 'next';
import ProfileForm from '@/components/ProfileForm/ProfileForm';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'Manage your NoteHub profile',
};

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <ProfileForm />
      </div>
    </main>
  );
}