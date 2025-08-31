import { memo } from 'react';
import type { DisplayedDataType } from '../../models/schema';
import TableRow from '../TableRow/TableRow';

const TableBody = memo(function TableBody({
  data,
  columns,
}: {
  data: DisplayedDataType;
  columns: string[] | undefined;
}) {
  return (
    <tbody>
      {data.map((country) => {
        return (
          <TableRow key={country.name} country={country} columns={columns} />
        );
      })}
    </tbody>
  );
});

export default TableBody;
