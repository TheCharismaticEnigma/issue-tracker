import { BadgeColors, IssueStatus } from '@/entities';
import { Badge } from '@radix-ui/themes';

const statusMap: Record<
  IssueStatus,
  {
    label: string;
    color: BadgeColors;
  }
> = {
  OPEN: {
    label: 'Open',
    color: 'red',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'violet',
  },
  CLOSED: {
    label: 'Closed',
    color: 'green',
  },
};

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
  return (
    <Badge color={statusMap[status].color} size={'2'}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
