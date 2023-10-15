import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const DeleteIssueButton = ({ id }: { id: string }) => {
  return (
    <Button color="red" className="max-w-xs">
      <TrashIcon />
      <Link href={`/issues/${id}/`}>Delete Issue </Link>
    </Button>
  );
};

export default DeleteIssueButton;
