import { useState } from 'react';
import type { DisplayedDataType } from '../../models/schema';
import style from './style.module.css';
import { sortData } from '../../utilities/sortData';

export function Table({ data }: { data: DisplayedDataType }) {
  const [displayedData, setDisplayedData] = useState(data);
  const [populationOrder, setPopulationOrder] = useState<
    '\u2191' | '\u2193' | null
  >(null);
  const [nameOrder, setNameOrder] = useState<'\u2191' | '\u2193' | null>(null);
  const sort = (column: 'population' | 'name', order?: '\u2191' | '\u2193') => {
    setDisplayedData(sortData(data, column, order));
  };
  return (
    <section>
      {
        <table className={style.table}>
          <thead>
            <tr>
              <th
                className={style.cell}
                onClick={() => {
                  const newOrder = !nameOrder
                    ? '\u2191'
                    : nameOrder === '\u2191'
                      ? '\u2193'
                      : '\u2191';
                  setPopulationOrder(null);
                  setNameOrder(newOrder);
                  sort('name', newOrder);
                }}
              >
                Country {Boolean(nameOrder) && nameOrder}
              </th>
              <th className={style.cell}>Year</th>
              <th
                className={style.cell}
                onClick={() => {
                  const newOrder = !populationOrder
                    ? '\u2191'
                    : populationOrder === '\u2191'
                      ? '\u2193'
                      : '\u2191';
                  setPopulationOrder(newOrder);
                  setNameOrder(null);
                  sort('population', newOrder);
                }}
              >
                Population {Boolean(populationOrder) && populationOrder}
              </th>
              <th className={style.cell}>CO2</th>
              <th className={style.cell}>CO2 per capita</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((country) => {
              return (
                <tr key={country.name}>
                  <td className={style.cell}>{country.name}</td>
                  <td className={style.cell}>{country.data.at(-1)?.year}</td>
                  <td className={style.cell}>
                    {country.data.at(-1)?.population ?? 'N/A'}
                  </td>
                  <td className={style.cell}>
                    {country.data.at(-1)?.co2 ?? 'N/A'}
                  </td>
                  <td className={style.cell}>
                    {country.data.at(-1)?.co2_per_capita ?? 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </section>
  );
}
