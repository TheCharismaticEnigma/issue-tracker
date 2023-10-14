import { IssueStatusBadge } from '@/components';
import { IssueSchema } from '@/entities';
import { Flex, Card, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';

interface Props {
  issue: IssueSchema;
}

const IssueDetails = ({
  issue: { title, createdAt, status, description },
}: Props) => {
  return (
    <Flex className="flex-col mx-auto gap-5 w-full p-2">
      <Text size={'7'}>{title}</Text>

      <Flex className="gap-5 items-center ">
        <Text>{createdAt.toDateString()}</Text>
        <IssueStatusBadge status={status} />
      </Flex>

      <Card className="w-fit">
        <Markdown>{description}</Markdown>
      </Card>
    </Flex>
  );
};

export default IssueDetails;
