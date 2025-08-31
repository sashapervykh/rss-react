import { createPortal } from 'react-dom';
import { ADDITIONAL_COLUMNS } from '../../constants/constants';

import style from './style.module.css';
import { useEffect, useState } from 'react';
import { useColumns } from '../../hooks/useColumns/useColumns';
import { useControls } from '../../hooks/useControls/useControls';

export function ColumnsWidget() {
  const { modalOpen, setModalOpen } = useControls();
  const { columns, setColumns } = useColumns();
  const [newColumns, setNewColumns] = useState<string[]>([]);

  useEffect(() => {
    if (modalOpen) setNewColumns(columns ? columns : []);
  }, [modalOpen, columns]);

  return createPortal(
    modalOpen && (
      <div className={style.wrapper}>
        <div className={style.modal}>
          <h1 className={style['modal-title']}>Choose additional column</h1>
          <div className={style['column-wrapper']}>
            {ADDITIONAL_COLUMNS.map((elem) => {
              const newName =
                elem[0].toUpperCase() + elem.split('_').join(' ').slice(1);
              return (
                <div
                  key={elem}
                  className={`${style.column} ${newColumns.includes(newName) ? style.chosen : ''}`}
                  onClick={() => {
                    if (newColumns.includes(newName)) {
                      setNewColumns((prev) => {
                        return prev.filter((elem) => elem !== newName);
                      });
                    } else {
                      setNewColumns((prev) => {
                        return [...prev, newName];
                      });
                    }
                  }}
                >
                  {newName}
                </div>
              );
            })}
          </div>
          <div className={style['buttons-wrapper']}>
            <button
              className={style.button}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className={style.button}
              onClick={() => {
                setColumns(newColumns);
                setModalOpen(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    ),
    document.body
  );
}
