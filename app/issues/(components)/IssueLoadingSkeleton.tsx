import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueLoadingSkeleton = () => {
  return (
    <Box className="w-full">
      <Box className="max-w-5xl mx-auto shadow-sm shadow-violet-500 rounded-xl px-5 py-8 text-white flex flex-col gap-5 ">
        <Skeleton count={1} highlightColor="gray" height={'2rem'}></Skeleton>

        <Skeleton height={'20rem'}></Skeleton>
      </Box>
    </Box>
  );
};

export default IssueLoadingSkeleton;
