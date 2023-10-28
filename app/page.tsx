import Issue from '@/models/issueModel';
import IssueSummary from './IssueSummary';
import { IssueSchema } from '@/entities';
import IssueChart from './IssueChart';
import { Grid, Flex, Box } from '@radix-ui/themes';
import LatestIssues from './LatestIssues';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const allIssues: IssueSchema[] = await Issue.find();

  const openCount = allIssues.filter((issue) => issue.status === 'OPEN').length;

  const closedCount = allIssues.filter(
    (issue) => issue.status === 'CLOSED'
  ).length;

  const inProgressCount = allIssues.length - (openCount + closedCount);

  const issueStats = {
    openCount,
    inProgressCount,
    closedCount,
  };

  return (
    <Grid
      columns={{
        initial: '1',
        md: '2',
      }}
      gap={'5'}
    >
      <Flex direction={'column'} gap={'3'} align={'center'} justify={'between'}>
        <IssueSummary issueStats={issueStats} />
        <IssueChart issueStats={issueStats} />
      </Flex>

      <Flex align={'center'}>
        <LatestIssues />
      </Flex>
    </Grid>
  );
}
