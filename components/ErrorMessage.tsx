import { PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

// no need to create props interface w/ children.

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null; // Or empty fragment.

  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
