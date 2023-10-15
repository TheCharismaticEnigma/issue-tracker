'use client';

import { ErrorMessage, Spinner } from '@/components';
import createIssueSchema, { type IssueForm } from '@/schemas/createIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';
import { IssueSchema } from '@/entities';

interface Props {
  issue?: IssueSchema;
}

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
            Submit New Issue
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default IssueForm;
