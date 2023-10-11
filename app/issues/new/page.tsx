'use client';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Box, TextField, TextArea, Button } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" />
      </TextField.Root>

      <SimpleMDE placeholder="Description" />

      <Button>Submit New Issue</Button>
    </Box>
  );
};

export default NewIssuePage;
