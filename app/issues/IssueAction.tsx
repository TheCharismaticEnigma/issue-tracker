import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssueAction = () => {
  return (
    <Flex mb={'3'} justify={'between'}>
      <IssueStatusFilter />

      <Button className="w-fit" variant="surface" color="brown" size={'3'}>
        <Link href="/issues/new"> New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
