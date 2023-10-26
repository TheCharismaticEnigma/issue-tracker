import IssueStatusBadge from '@/components/IssueStatusBadge';
import { IssueSchema } from '@/entities';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueQuery } from './page';

interface IssueTableProps {
  issues: IssueSchema[];
  searchParams: IssueQuery;
}

interface TableHeaderCellInterface {
  label: string;
  value: string;
  className?: string;
}

const IssueTable = ({ issues, searchParams }: IssueTableProps) => {
  const { orderBy } = searchParams;

  const headerCells: TableHeaderCellInterface[] = [
    { label: 'TITLE', value: 'title' },
    { label: 'STATUS', value: 'status', className: 'hidden md:table-cell' },
    {
      label: 'CREATED AT',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];

  return (
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
  );
};

export default IssueTable;
