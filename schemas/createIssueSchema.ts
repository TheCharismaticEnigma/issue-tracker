import { z } from 'zod';

const createIssueSchema = z.object({
  title: z.string().min(3, { message: 'Title is required ' }).max(255),
  description: z.string().min(3, { message: 'Description is required' }),
});

export type IssueForm = z.infer<typeof createIssueSchema>;

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title is required ' })
    .max(255)
    .optional(),

  description: z
    .string()
    .min(3, { message: 'Description is required' })
    .optional(),

  assignedToUserId: z
    .string()
    .min(1, { message: 'Id is required' })
    .optional()
    .default('unassigned'),

  status: z.string().optional().default('OPEN'),
});

export type PatchIssueInterface = z.infer<typeof patchIssueSchema>;

export default createIssueSchema;
