import { IssueStatus } from '@/entities';
import Issue from '@/models/issueModel';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  openCount: number;
  inProgressCount: number;
  closedCount: number;
}

interface IssueSummaryContainer {
  label: string;
  count: number;
  status: IssueStatus;
}

const IssueSummary = ({ openCount, inProgressCount, closedCount }: Props) => {
  const containers: IssueSummaryContainer[] = [
    { label: 'Open Issues', count: openCount, status: 'OPEN' },
    {
      label: 'Progressing Issues',
      count: inProgressCount,
      status: 'IN_PROGRESS',
    },
    { label: 'Closed Issues', count: closedCount, status: 'CLOSED' },
  ];

  return (
    <Flex gap={'4'}>
      {containers.map(({ status, label, count }) => {
        return (
          <Card key={label} className="gap-5">
            <Flex direction={'column'} gap={'2'}>
              <Link
                className="text-md font-medium"
                href={`/issues?status=${status}`}
              >
                {label}
              </Link>
              <Text size={'6'} className="font-bold text-amber-600">
                {count}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
