'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (page: number) => {
    const params = new URLSearchParams();

    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    params.set('page', `${page}`);
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Flex gap={'3'} align={'center'} mt={'3'}>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => {
          updatePage(1);
        }}
      >
        <DoubleArrowLeftIcon />
      </PaginationButton>

      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => {
          updatePage(currentPage - 1);
        }}
      >
        <ChevronLeftIcon />
      </PaginationButton>

      <Text size={'4'}>
        Page {currentPage} of {totalPages}
      </Text>

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => {
          updatePage(currentPage + 1);
        }}
      >
        <ChevronRightIcon />
      </PaginationButton>

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => {
          updatePage(totalPages);
        }}
      >
        <DoubleArrowRightIcon />
      </PaginationButton>
    </Flex>
  );
};

// Sub Component.

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const PaginationButton = ({
  disabled = false,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      variant="surface"
      color="indigo"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default Pagination;

/* 
   4 buttons - next, prev, start, end 
   currentPage, itemsCount, itemsPerPage. 
*/
