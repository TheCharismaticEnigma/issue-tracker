import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { notFound } from 'next/navigation';
import IssueForm from '../../(components)/IssueForm';

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  connectToDatabase();

  const issue: IssueSchema | null = await Issue.findOne({ _id: id });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
