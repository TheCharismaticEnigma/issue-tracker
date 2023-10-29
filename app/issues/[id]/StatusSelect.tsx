'use client';

import { IssueSchema, IssueStatus } from '@/entities';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  issue: IssueSchema;
}

const StatusSelect = ({ issue: { _id: id, status: issueStatus } }: Props) => {
  const router = useRouter();

  const statuses: {
    label: String;
    value: IssueStatus;
  }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const onSelect = async (status: IssueStatus) => {
    if (status === issueStatus) return;

    try {
      await axios.patch(`/api/issues/${id}`, {
        status,
      });
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved. Please try again later!');
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issueStatus}
        onValueChange={(status: IssueStatus) => onSelect(status)}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Separator />
          <Select.Group>
            {statuses.map(({ label, value }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Group>
          <Select.Separator />
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
};

export default StatusSelect;
