import { z } from 'zod';

const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email({ message: 'Email is Required' }),
  image: z.string(),
  emailVerified: z.boolean().nullable().default(null),
});

export type User = z.infer<typeof userSchema>;

export default userSchema;
