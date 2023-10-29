import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditIssueButton = ({ id }: { id: string }) => {
  return (
    <Button color="violet" className="max-w-xl">
      <Pencil2Icon />
      <Link href={`/issues/${id}/edit`}>Edit Issue </Link>
    </Button>
  );
};

export default EditIssueButton;
