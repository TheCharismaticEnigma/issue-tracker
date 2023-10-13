import { BadgeColors, IssueStatus } from '@/entities';
import { Badge } from '@radix-ui/themes';

interface Props {
  status: IssueStatus;
}

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

const IssueStatusBadge = ({ status }: Props) => {
  if (!status) return null;

  return (
    <Badge color={statusMap[status].color} size={'2'} className="w-fit">
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
