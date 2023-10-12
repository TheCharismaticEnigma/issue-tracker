'use client';

import { Button, Text, TextField, Box, Callout } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import createIssueSchema, { type IssueForm } from '@/schemas/createIssueSchema';

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

  return (
    <Box className="max-w-xl ">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', {
              title: data.title?.trimEnd().trimStart(),
              description: data.description?.trimEnd().trimStart(),
            });
          } catch (error) {
            setError('An Unexpected error occurred.');
            throw error;
          }
          router.push('/issues');
          reset();
        })}
      >
        <TextField.Root>
          <TextField.Input
            placeholder="Issue Title"
            size="3"
            {...register('title')}
          />
        </TextField.Root>

        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}

        <Controller
          control={control}
          name={'description'}
          render={({ field }) => {
            return <SimpleMDE placeholder="Description" {...field} />;
          }}
        />

        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button size={'3'}>Submit New Issue</Button>
      </form>
    </Box>
  );
};

export default NewIssuePage;
