// A *.d.ts FILE only allows you to write the TS code that doesn't
// generate a JS code on transpilation.

export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
export type BadgeColors = 'red' | 'violet' | 'green';

export interface IssueSchema {
  _id: object;
  title: string;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  assignedToUserId?: string;
}
