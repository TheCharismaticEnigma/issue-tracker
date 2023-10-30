import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';
import PageCountAction from './PageCountAction';

const IssueAction = () => {
  return (
    <Flex mb={'3'} justify={'between'}>
      <Button className="w-fit" variant="surface" color="brown" size={'3'}>
        <Link href="/issues/new"> New Issue</Link>
      </Button>

      <IssueStatusFilter />

      <PageCountAction />
    </Flex>
  );
};

export default IssueAction;
