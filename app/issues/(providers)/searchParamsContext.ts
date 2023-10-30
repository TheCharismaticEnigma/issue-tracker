import { createContext } from 'react';
import { IssueQuery } from '../page';

export const SearchParamsContext = createContext<IssueQuery>({
  pageSize: '5',
  page: '1',
} as IssueQuery);
