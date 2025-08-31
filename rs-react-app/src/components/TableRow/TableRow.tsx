import { memo, useEffect, useRef, useState } from 'react';
import type { OneCountryType } from '../../models/schema';
import style from '../Table/style.module.css';

const TableRow = memo(function TableRow({
  country,
  columns,
}: {
  country: OneCountryType;
  columns: string[] | undefined;
}) {
  const [highlight, setHighlight] = useState(false);
  const prevYear = useRef<number>(2023);
  useEffect(() => {
    const elemWithYear = country.data.find(
      (elem) => typeof elem.year === 'number'
    );
    const currentYear = elemWithYear?.year;
    if (!currentYear) return;
    if (prevYear.current !== currentYear) {
      prevYear.current = currentYear;
      setHighlight(true);
    }
    const timer = setTimeout(() => setHighlight(false), 1000);
    return () => clearTimeout(timer);
  }, [country]);

  const isHighlighted = highlight ? style['cell-highlighted'] : '';
  return (
    <tr>
      <td className={style.cell}>{country.name}</td>
      <td className={style.cell}>{country.iso_code ?? 'N/A'}</td>
      <td className={`${style.cell} ${isHighlighted}`}>
        {country.data.at(-1)?.year ?? 'N/A'}
      </td>
      <td className={`${style.cell} ${isHighlighted}`}>
        {country.data.at(-1)?.population ?? 'N/A'}
      </td>
      <td className={`${style.cell} ${isHighlighted}`}>
        {country.data.at(-1)?.co2 ?? 'N/A'}
      </td>
      <td className={`${style.cell} ${isHighlighted}`}>
        {country.data.at(-1)?.co2_per_capita ?? 'N/A'}
      </td>
      {columns &&
        columns.length !== 0 &&
        columns.map((elem) => {
          const propName =
            elem[0].toLowerCase() + elem.split(' ').join('_').slice(1);
          const value = country.data.at(-1)?.[propName];
          return (
            <td className={`${style.cell} ${isHighlighted}`} key={elem}>
              {typeof value === 'number' ? value : 'N/A'}
            </td>
          );
        })}
    </tr>
  );
});

export default TableRow;
