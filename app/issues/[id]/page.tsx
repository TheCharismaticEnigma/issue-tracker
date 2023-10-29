import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { Metadata } from 'next';
import { cache } from 'react';
import StatusSelect from './StatusSelect';

interface Props {
  params: {
    id: string;
  };
}

connectToDatabase();

// Using React Cache (single request) for reducing load on database
const fetchIssue = cache(async (id: string) => {
  try {
    const issue: IssueSchema | null = await Issue.findOne({ _id: id });
    return issue;
  } catch (error) {
    return null;
  }
});

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(id);
  const session = await getServerSession(authOptions);

  if (!issue) notFound();

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '3',
      }}
      gap={'5'}
      className="shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white max-w-5xl mx-auto "
    >
      <Box className="md:col-span-2 ">
        <IssueDetails issue={issue} />
      </Box>

      {/* Display the issue modification box ONLY when LOGGED IN */}

      {session && (
        <Flex
          direction={'column'}
          align={'stretch'}
          className="gap-3 justify-center max-w-lg "
        >
          <StatusSelect issue={issue} />
          <AssigneeSelect issue={issue} />
          <EditIssueButton id={id} />
          <DeleteIssueButton id={id} />
        </Flex>
      )}
    </Grid>
  );
};

/*
export const metadata: Metadata = {
  title: 'Issue Tracker - Issue Details',
  description: 'Work with the intricate details of a particular issue. ',
};
*/

// Dynamic Metadata
export async function generateMetadata({ params: { id } }: Props) {
  try {
    const issue: IssueSchema | null = await fetchIssue(id);

    return {
      title: `Issue - ${issue?.title || 'Details Page'}`,
      description:
        issue?.description ||
        'Peruse the intricate details of a particular issue.',
    };
  } catch (error) {}
}

export default IssueDetailsPage;

/* 
 Single Responsibility Principle : 
 All of the entities must have a single responsibility. 
 Pages (page.tsx) must be confered upon a single responsibility. 
 Other reponsibilities must be assigned to specific components, which 
 must be co-located in the same folder as they aren't reusable. 
*/
