import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssuesPage = () => {
  return (
    <div className="text-white">
      <Button>
        <Link href="/issues/new">Hakuna Matata</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
