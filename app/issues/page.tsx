import Link from 'next/link';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema, IssueStatus } from '@/entities';
import Issue from '@/models/issueModel';
import { Table } from '@radix-ui/themes';
import IssueAction from './IssueAction';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/components/Pagination';

connectToDatabase();

interface Props {
  searchParams: {
    status: IssueStatus;
    orderBy: string;
    page: string;
  };
}

interface TableHeaderCellInterface {
  label: string;
  value: string;
  className?: string;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const { status, orderBy, page } = searchParams;

  let issues: IssueSchema[] = await Issue.find();

  const issueStatuses: IssueStatus[] = ['OPEN', 'CLOSED', 'IN_PROGRESS'];

  const headerCells: TableHeaderCellInterface[] = [
    { label: 'TITLE', value: 'title' },
    { label: 'STATUS', value: 'status', className: 'hidden md:table-cell' },
    {
      label: 'CREATED AT',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];

  if (status && issueStatuses.indexOf(status) !== -1)
    issues = await Issue.find({
      status: status,
    });

  return (
    <div className="shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white flex flex-col gap-5 max-w-5xl mx-auto ">
      <IssueAction />

      <Table.Root size={'3'} variant="surface">
        <Table.Header>
          <Table.Row>
            {headerCells.map(({ label, value, className = '' }) => {
              return (
                <Table.ColumnHeaderCell key={value} className={className}>
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: value,
                      },
                    }}
                  >
                    {label}
                  </Link>
                  {orderBy === value && (
                    <ArrowUpIcon className="inline pb-1" height={'1.1rem'} />
                  )}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(({ status, title, createdAt, _id }) => {
            return (
              <Table.Row key={title}>
                <Table.RowHeaderCell>
                  <Link href={`/issues/${_id.toString()}`}>{title}</Link>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

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
