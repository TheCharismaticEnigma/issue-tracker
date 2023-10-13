import IssueStatusBadge from '@/components/IssueStatusBadge';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { Card, Flex, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

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
    <div className="shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white flex flex-col gap-5 max-w-5xl mx-auto ">
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
    </div>
  );
};

export default IssueDetailsPage;
