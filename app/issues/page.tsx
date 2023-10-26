import Pagination from '@/components/Pagination';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema, IssueStatus } from '@/entities';
import Issue from '@/models/issueModel';
import IssueAction from './IssueAction';
import IssueTable from './IssueTable';

connectToDatabase();

export interface IssueQuery {
  status: IssueStatus;
  orderBy: string;
  page: string;
}

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const { status, page } = searchParams;

  let issues: IssueSchema[] = await Issue.find();

  const issueStatuses: IssueStatus[] = ['OPEN', 'CLOSED', 'IN_PROGRESS'];

  if (status && issueStatuses.indexOf(status) !== -1)
    issues = await Issue.find({
      status: status,
    });

  return (
    <div className="shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white flex flex-col gap-5 max-w-5xl mx-auto ">
      <IssueAction />

      <IssueTable issues={issues} searchParams={searchParams} />

      <Pagination
        currentPage={parseInt(page) || 1}
        totalItems={issues.length}
        itemsPerPage={5}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic'; // This page will be dynamically rendered .
// export const revalidate = 0 ; is the same.

export default IssuesPage;
