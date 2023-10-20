// Callbacks are functions that are executed after an action is performed.
// CredentialsProvider bestows upon us, the ability to sign in w/ arbitrary credentials.

import NextAuth from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
