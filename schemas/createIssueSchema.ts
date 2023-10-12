import { z } from 'zod';

const createIssueSchema = z.object({
  title: z.string().min(3, { message: 'Title is required ' }).max(255),
  description: z.string().min(3, { message: 'Description is required' }),
});

export type IssueForm = z.infer<typeof createIssueSchema>;

export default createIssueSchema;
