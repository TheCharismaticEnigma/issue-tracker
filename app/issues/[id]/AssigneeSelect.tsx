'use client';

import useFetchUsers from '@/hooks/useFetchUsers';
import { Select } from '@radix-ui/themes';
import axios from 'axios';

const AssigneeSelect = ({ id: issueId }: { id: string }) => {
  const { data: users, error } = useFetchUsers();

  if (error) return null;

  const onSelect = async (userId: string) => {
    await axios.patch(`/api/issues/${issueId}`, {
      assignedToUserId: userId,
    });
  };

  return (
    <Select.Root onValueChange={onSelect}>
      <Select.Trigger placeholder="Assigned User" />
      <Select.Content>
        <Select.Separator />
        <Select.Group>
          <Select.Item value={'unassigned'}>Unassign User</Select.Item>

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
        <Select.Separator />
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
