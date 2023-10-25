import Pagination from '@/components/Pagination';

interface Props {
  searchParams: {
    page: string;
  };
}

export default function Home({ searchParams }: Props) {
  const currentPage = Number.parseInt(searchParams?.page) || 1;

  return (
    <div className="text-white ">
      <Pagination currentPage={currentPage} totalItems={20} itemsPerPage={5} />
    </div>
  );
}
