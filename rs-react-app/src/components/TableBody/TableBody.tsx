import { useControls } from '../../hooks/useControls/useControls';
import type { DisplayedDataType } from '../../models/schema';
import style from '../Table/style.module.css';

export function TableBody({ data }: { data: DisplayedDataType }) {
  const { controls } = useControls();

  return (
    <tbody>
      {data.map((country) => {
        return (
          <tr key={country.name}>
            <td className={style.cell}>{country.name}</td>
            <td className={style.cell}>{country.data.at(-1)?.year}</td>
            <td className={style.cell}>
              {country.data.at(-1)?.population ?? 'N/A'}
            </td>
            <td className={style.cell}>{country.data.at(-1)?.co2 ?? 'N/A'}</td>
            <td className={style.cell}>
              {country.data.at(-1)?.co2_per_capita ?? 'N/A'}
            </td>
            {controls.columns &&
              controls.columns.length !== 0 &&
              controls.columns.map((elem) => {
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
      })}
    </tbody>
  );
}
