'use client';

import { Spinner } from '@/components';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${id}`);
      router.push('/issues');
      router.refresh(); // to refresh the browser cache.
    } catch (error) {
      setError(true);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            style={{
              backgroundColor: 'red',
              cursor: 'pointer',
            }}
            className="max-w-xl"
            disabled={isDeleting}
          >
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

      <AlertDialog.Root open={error}>
        <AlertDialog.Content size={'4'}>
          <AlertDialog.Title size={'6'}>ERROR!</AlertDialog.Title>
          <AlertDialog.Description size="5" mb={'5'}>
            Cannot delete issue. Please try again later.
          </AlertDialog.Description>

          <Button
            variant="solid"
            color="red"
            onClick={() => {
              setError(false);
            }}
          >
            Proceed
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
//
