import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssueAction = () => {
  return (
    <div>
      <Button className="w-fit" color="violet" size={'3'}>
        <Link href="/issues/new"> New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueAction;
