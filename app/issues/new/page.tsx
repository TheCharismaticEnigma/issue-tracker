import dynamic from 'next/dynamic';
import IssueLoadingSkeleton from '../(components)/IssueLoadingSkeleton';
import { Metadata } from 'next';

const IssueForm = dynamic(() => import(`@/app/issues/(components)/IssueForm`), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: 'Issue Tracker -  New Issue',
  description: 'Create a new issue and add it to the list of issues. ',
};

export default NewIssuePage;