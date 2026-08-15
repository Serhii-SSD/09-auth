'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api/clientApi';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(
    500,
    'Content must be at most 500 characters'
  ),
  tag: Yup.string()
    .oneOf(
      ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
      'Invalid tag'
    )
    .required('Tag is required'),
});

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/all');
    },
  });

  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await mutation.mutateAsync(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage
              name="title"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              as="textarea"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field
              id="tag"
              as="select"
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage
              name="tag"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}