'use client';

import { IssueSchema } from '@/entities';
import useFetchUsers from '@/hooks/useFetchUsers';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  issue: IssueSchema;
}

const AssigneeSelect = ({ issue: { _id, assignedToUserId } }: Props) => {
  const { data: users, error } = useFetchUsers();
  const issueId = _id.toString();

  if (error) return null;

  const onSelect = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issueId}`, {
        assignedToUserId: userId,
      });
    } catch (error) {
      toast.error('Changes could not be saved. Please try again later!');
    }
  };

  return (
    <>
      <Select.Root
        onValueChange={onSelect}
        defaultValue={assignedToUserId || 'unassigned'}
      >
        <Select.Trigger placeholder="Assigned User" />
        <Select.Content>
          <Select.Separator />
          <Select.Group>
            <Select.Item value={'unassigned'}>Unassigned Issue</Select.Item>

            {users &&
              users.length > 0 &&
              users.map(({ _id, name }, index) => {
                return (
                  <Select.Item value={_id} key={_id}>
                    {name}
                  </Select.Item>
                );
              })}
          </Select.Group>
          <Select.Separator />
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

export default AssigneeSelect;
