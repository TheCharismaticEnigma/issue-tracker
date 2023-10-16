'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const deleteIssue = async () => {
    await axios.delete(`/api/issues/${id}`);
    router.push('/issues');
    router.refresh(); // to refresh the browser cache.
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className="max-w-xs">
            <TrashIcon />
            {/* <Link href={`/issues/${id}/`}>Delete Issue </Link> */}
            Delete Issue
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content size={'4'}>
          <AlertDialog.Title size={'6'}>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="5">
            Are you sure you want to delete this issue? This action can not be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="5" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
