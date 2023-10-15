import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueLoadingSkeleton from '../../(components)/IssueLoadingSkeleton';

interface Props {
  params: {
    id: string;
  };
}

// Dynamically imported from server.
const IssueForm = dynamic(() => import(`@/app/issues/(components)/IssueForm`), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

const EditIssuePage = async ({ params: { id } }: Props) => {
  connectToDatabase();

  const issue: IssueSchema | null = await Issue.findOne({ _id: id });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
