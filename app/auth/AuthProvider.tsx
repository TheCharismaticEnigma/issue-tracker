'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

// interface Props {
//   children: ReactNode; => React.PropsWithChildren
// }

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
