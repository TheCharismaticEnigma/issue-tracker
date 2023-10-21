'use client';

import useFetchUsers from '@/hooks/useFetchUsers';
import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => {
  const { data: users, error } = useFetchUsers();

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assigned User" />
      <Select.Content>
        <Select.Group>
          <Select.Label>ALL USERS</Select.Label>
          <Select.Separator />

          {users &&
            users.length > 0 &&
            users.map((user, index) => {
              return (
                <Select.Item value={user._id} key={user._id}>
                  {user.name}
                </Select.Item>
              );
            })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
