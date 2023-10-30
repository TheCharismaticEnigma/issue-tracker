'use client';

import { ErrorMessage, Spinner } from '@/components';
import createIssueSchema, { type IssueForm } from '@/schemas/createIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Callout, TextField } from '@radix-ui/themes';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';
import { IssueSchema } from '@/entities';

interface Props {
  issue?: IssueSchema;
}

// Used for CREATING & UPDATING the issues.

const IssueForm = ({ issue }: Props) => {
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

  // Import when needed and is client-side rendered
  // const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  //   ssr: false,
  // });

  const onSubmit = handleSubmit(async (data) => {
    const formData = {
      title: data.title?.trimEnd().trimStart(),
      description: data.description?.trimEnd().trimStart(),
    };

    try {
      setIsSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue._id}`, formData);
      else await axios.post('/api/issues', formData);
    } catch (error) {
      setIsSubmitting(false);

      const errorMessage =
        (error instanceof AxiosError &&
          error.response?.data.error[0].message) ||
        'Title & Description must be longer. ';

      setError(errorMessage);
      throw error;
    }
    router.push('/issues');
    router.refresh(); // force a content-refresh
    reset();
  });

  return (
    <Box className="w-full">
      <Box className="max-w-2xl mx-auto ">
        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <TextField.Root>
            <TextField.Input
              placeholder="Issue Title"
              defaultValue={issue?.title}
              size="3"
              {...register('title')}
            />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            control={control}
            name={'description'}
            defaultValue={issue?.description}
            render={({ field }) => {
              return <SimpleMDE placeholder="Description" {...field} />;
            }}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button size={'3'} disabled={isSubmitting}>
            {`${issue ? 'Update Issue' : 'Create New Issue'}`}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default IssueForm;
