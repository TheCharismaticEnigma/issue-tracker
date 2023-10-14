import { Link } from '@/components';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import { connectToDatabase } from '@/dbConfig/dbConfig';
import { IssueSchema } from '@/entities';
import Issue from '@/models/issueModel';
import { Table } from '@radix-ui/themes';
import IssueAction from './IssueAction';

connectToDatabase();

const IssuesPage = async () => {
  const issues: IssueSchema[] = await Issue.find();

  return (
    <div className="shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white flex flex-col gap-5 max-w-5xl mx-auto ">
      <IssueAction />

      <Table.Root size={'3'} variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>TITLE</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              STATUS
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              CREATION DATE
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

export default IssuesPage;
