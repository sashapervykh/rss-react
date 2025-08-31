import { memo } from 'react';
import type { DisplayedDataType } from '../../models/schema';
import TableRow from '../TableRow/TableRow';
import { useColumns } from '../../hooks/useColumns/useColumns';

const TableBody = memo(function TableBody({
  data,
}: {
  data: DisplayedDataType;
}) {
  const { columns } = useColumns();
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
