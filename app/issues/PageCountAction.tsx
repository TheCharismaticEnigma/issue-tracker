'use client';

import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const PageCountAction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelect = (itemsPerPage: string) => {
    const params = new URLSearchParams();

    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    params.set('pageSize', itemsPerPage);
    router.push(`?${params.toString()}`); // Update query string not the path.
  };

  return (
    <Select.Root size={'3'} defaultValue="5" onValueChange={onSelect}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="5"> 05 / page</Select.Item>
          <Select.Item value="10">10 / page</Select.Item>
          <Select.Item value="15">15 / page</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default PageCountAction;
