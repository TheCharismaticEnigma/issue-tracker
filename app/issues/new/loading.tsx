import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

const loading = () => {
  return (
    <Box className="w-full">
      <Box className="max-w-2xl mx-auto">
        <Box className="flex flex-col gap-3">
          <Box>
            <Skeleton></Skeleton>
          </Box>

          <Box>
            <Skeleton count={5}></Skeleton>
          </Box>

          <Skeleton />
        </Box>
      </Box>
    </Box>
  );
};

export default loading;
