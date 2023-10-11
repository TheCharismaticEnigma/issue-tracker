'use client';

import { Box, TextField, TextArea, Button } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Issue Title" />
      </TextField.Root>

      <TextArea placeholder="Description" />

      <Button>Submit New Issue</Button>
    </Box>
  );
};

export default NewIssuePage;
