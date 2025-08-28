import type { DisplayedDataType } from '../../models/schema';
import style from './style.module.css';

export function Table({ data }: { data: DisplayedDataType }) {
  return (
    <section>
      {
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.cell}>Country</th>
              <th className={style.cell}>Year</th>
              <th className={style.cell}>Population</th>
              <th className={style.cell}>CO2</th>
              <th className={style.cell}>CO2 per capita</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key) => {
              return (
                <tr key={key}>
                  <td className={style.cell}>{key}</td>
                  <td className={style.cell}>{data[key].data.at(-1)?.year}</td>
                  <td className={style.cell}>
                    {data[key].data.at(-1)?.population ?? 'N/A'}
                  </td>
                  <td className={style.cell}>
                    {data[key].data.at(-1)?.co2 ?? 'N/A'}
                  </td>
                  <td className={style.cell}>
                    {data[key].data.at(-1)?.co2_per_capita ?? 'N/A'}
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
