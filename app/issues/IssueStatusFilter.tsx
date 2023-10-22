'use client';

import { Select } from '@radix-ui/themes';
import { StatusFilter } from '@/entities';

const IssueStatusFilter = () => {
  const filterCriterion: StatusFilter[] = [
    { label: 'All Issues' },
    {
      label: 'Open',
      value: 'OPEN',
    },
    {
      label: 'In Progress',
      value: 'IN_PROGRESS',
    },
    {
      label: 'Closed',
      value: 'CLOSED',
    },
  ];

  return (
    <Select.Root size={'3'} defaultValue="all">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {filterCriterion.map(({ label, value = 'all' }) => {
            return (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;

// On Select => Navigate according to different page.
// ie. add different query string params /issues?status=OPEN : ''
// Params => get the selected status => filter from DB => render
// Object.values() to get it from interface
