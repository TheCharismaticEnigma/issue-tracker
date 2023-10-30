// Create Context,
// Provide Context,
// Use Context in target components.
'use client';

import { IssueQuery } from '../page';

import { ReactNode } from 'react';
import { SearchParamsContext } from './searchParamsContext';

interface Props {
  searchParams: IssueQuery;
  children: ReactNode;
}

// export const SearchParamsContext = createContext<IssueQuery>({} as IssueQuery); // default value

// Create Context w/ default value and Provide it to the children.
const SearchParamsProvider = ({ children, searchParams }: Props) => {
  return (
    <SearchParamsContext.Provider value={searchParams}>
      {children}
    </SearchParamsContext.Provider>
  );
};

export default SearchParamsProvider;
