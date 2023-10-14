import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
      <Box>
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueButton id={id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;

/* 
 Single Responsibility Principle : 
 All of the entities must have a single responsibility. 
 Pages (page.tsx) must be confered upon a single responsibility. 
 Other reponsibilities must be assigned to specific components, which 
 must be co-located in the same folder as they aren't reusable. 
*/
