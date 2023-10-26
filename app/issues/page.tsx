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
  const issueStatuses: IssueStatus[] = ['OPEN', 'CLOSED', 'IN_PROGRESS'];
  const { status, page, orderBy } = searchParams;

  let issues: IssueSchema[] = await Issue.find();

  if (status && issueStatuses.indexOf(status) !== -1)
    issues = await Issue.find({
      status: status,
    });

  const itemsPerPage = 5;
  const pageNumber = parseInt(page) || 1;
  let renderedIssues: IssueSchema[] = [];

  if (pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    renderedIssues =
      issues.length <= endIndex
        ? issues.slice(startIndex)
        : issues.slice(startIndex, endIndex);
  }

  if (orderBy) {
    if (orderBy === 'title' || orderBy === 'createdAt' || orderBy === 'status')
      renderedIssues.sort((issueA, issueB) => {
        const criteriaA = issueA[orderBy];
        const criteriaB = issueB[orderBy];

        if (criteriaA === criteriaB) return 0;
        return criteriaA < criteriaB ? -1 : 1;
      });
  }

  return (
    <div className="shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white flex flex-col gap-5 max-w-5xl mx-auto ">
      <IssueAction />

      <IssueTable issues={renderedIssues} searchParams={searchParams} />

      <Pagination
        currentPage={pageNumber}
        totalItems={issues.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic'; // This page will be dynamically rendered .
// export const revalidate = 0 ; is the same.

export default IssuesPage;
