import { memo } from 'react';
import type { OneCountryType } from '../../models/schema';
import style from '../Table/style.module.css';

const TableRow = memo(function TableRow({
  country,
  columns,
}: {
  country: OneCountryType;
  columns: string[] | undefined;
}) {
  return (
    <tr>
      <td className={style.cell}>{country.name}</td>
      <td className={style.cell}>{country.data.at(-1)?.year}</td>
      <td className={style.cell}>{country.data.at(-1)?.population ?? 'N/A'}</td>
      <td className={style.cell}>{country.data.at(-1)?.co2 ?? 'N/A'}</td>
      <td className={style.cell}>
        {country.data.at(-1)?.co2_per_capita ?? 'N/A'}
      </td>
      {columns &&
        columns.length !== 0 &&
        columns.map((elem) => {
          const propName =
            elem[0].toLowerCase() + elem.split(' ').join('_').slice(1);
          const value = country.data.at(-1)?.[propName];
          return (
            <td className={style.cell} key={elem}>
              {typeof value === 'number' ? value : 'N/A'}
            </td>
          );
        })}
    </tr>
  );
});

export default TableRow;
