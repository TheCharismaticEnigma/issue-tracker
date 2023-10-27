import Pagination from '@/components/Pagination';
import LatestIssues from './LatestIssues';

interface Props {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams }: Props) {
  return (
    <div className="text-white">
      <LatestIssues />
    </div>
  );
}
