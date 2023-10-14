import { IssueStatusBadge } from '@/components';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { Box, Card, Flex, Grid, Text, Button } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';

interface Props {
  params: {
    id: string;
  };
}

connectToDatabase();

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issue: IssueSchema | null = await Issue.findOne({ _id: id });

  if (!issue) notFound();

  return (
    <Grid
      columns={{
        initial: '1',
        md: '2',
      }}
      gap={'5'}
      className="shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white flex flex-col gap-5 max-w-5xl mx-auto "
    >
      <Flex className="flex-col mx-auto gap-5 w-full p-2  ">
        <Text size={'7'}>{issue.title}</Text>

        <Flex className="gap-5 items-center ">
          <Text>{issue.createdAt.toDateString()}</Text>
          <IssueStatusBadge status={issue.status} />
        </Flex>

        <Card className="w-fit">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Flex>

      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${id}/update`}>Edit Issue </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
