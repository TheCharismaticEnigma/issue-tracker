import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditIssueButton = ({ id }: { id: string }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${id}/update`}>Edit Issue </Link>
    </Button>
  );
};

export default EditIssueButton;
