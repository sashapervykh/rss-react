import { ADDITIONAL_COLUMNS } from '../../constants/constants';
import { useControls } from '../../hooks/useControls/useControls';
import style from './style.module.css';

export function ColumnsWidget() {
  const { controls, setControls } = useControls();

  return (
    <div className={style.wrapper}>
      <div>Choose additional column:</div>
      <div className={style['column-wrapper']}>
        {ADDITIONAL_COLUMNS.map((elem) => {
          const newName =
            elem[0].toUpperCase() + elem.split('_').join(' ').slice(1);
          return (
            <div
              key={elem}
              className={`${style.column} ${controls.columns?.includes(newName) ? style.chosen : ''}`}
              onClick={() => {
                let newControls = { ...controls };
                if (!newControls.columns) {
                  newControls.columns = [newName];
                  setControls(newControls);
                  return;
                }

                if (newControls.columns.includes(newName)) {
                  newControls = {
                    ...newControls,
                    columns: newControls.columns.filter(
                      (elem) => elem !== newName
                    ),
                  };
                } else {
                  newControls.columns.push(newName);
                }
                setControls(newControls);
              }}
            >
              {newName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
