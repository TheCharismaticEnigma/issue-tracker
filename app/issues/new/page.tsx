'use client';

import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';
import createIssueSchema, { type IssueForm } from '@/schemas/createIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', {
        title: data.title?.trimEnd().trimStart(),
        description: data.description?.trimEnd().trimStart(),
      });
    } catch (error) {
      setIsSubmitting(false);
      setError('An Unexpected error occurred.');
      throw error;
    }
    router.push('/issues');
    reset();
  });

  return (
    <Box className="max-w-xl ">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Issue Title"
            size="3"
            {...register('title')}
          />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          control={control}
          name={'description'}
          render={({ field }) => {
            return <SimpleMDE placeholder="Description" {...field} />;
          }}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button size={'3'} disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default NewIssuePage;
