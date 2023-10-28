'use client'; // Rechart Library Convention.

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
  issueStats: {
    openCount: number;
    inProgressCount: number;
    closedCount: number;
  };
}

const IssueChart = ({ issueStats }: Props) => {
  const { closedCount, inProgressCount, openCount } = issueStats;

  const data = [
    { label: 'Open', value: openCount },
    { label: 'In Progress', value: inProgressCount },
    { label: 'Closed', value: closedCount },
  ];

  return (
    <Card className="p-1 w-5/6">
      <ResponsiveContainer width={'100%'} height={400}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={40} fill={'#30A46C'} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
