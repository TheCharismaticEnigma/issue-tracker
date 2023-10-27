import IssueStatusBadge from '@/components/IssueStatusBadge';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { Table, Flex, Card } from '@radix-ui/themes';
import Link from 'next/link';

connectToDatabase();

const LatestIssues = async () => {
  const allIssues: IssueSchema[] = await Issue.find();

  const latestIssues = allIssues
    .sort(
      ({ createdAt: firstCreationDate }, { createdAt: secondCreationDate }) => {
        const firstTime = new Date(firstCreationDate).getTime();
        const secondTime = new Date(secondCreationDate).getTime();

        if (firstTime === secondTime) return 0;
        return firstTime < secondTime ? -1 : 1;
      }
    )
    .slice(0, 5);

  return (
    <Card>
      <Table.Root variant="surface">
        <Table.Body>
          {latestIssues.map(
            ({
              _id: id,
              title,
              status,
              assignedToUserId: userId = 'unassigned',
            }) => {
              return (
                <Table.Row key={title}>
                  <Table.Cell>
                    <Flex direction={'column'} align={'start'} gap={'3'}>
                      <Link
                        className="text-lg hover:text-amber-500"
                        href={`/issues/${id}`}
                      >
                        {title}
                      </Link>
                      <IssueStatusBadge status={status} />
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
