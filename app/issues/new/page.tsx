'use client';

import { Button, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control, reset } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', {
          title: data.title?.trimEnd().trimStart(),
          description: data.description?.trimEnd().trimStart(),
        });

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

      <Controller
        control={control}
        name={'description'}
        render={({ field }) => {
          return <SimpleMDE placeholder="Description" {...field} />;
        }}
      />

      <Button size={'3'}>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
