import dynamic from 'next/dynamic';
import IssueLoadingSkeleton from '../(components)/IssueLoadingSkeleton';

const IssueForm = dynamic(() => import(`@/app/issues/(components)/IssueForm`), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
