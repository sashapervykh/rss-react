import { useCustomDispatch, useCustomSelector } from '../../hooks/reduxHooks';
import { cardSlice } from '../../store/reducers/CardSlice';
import { createFileContent } from '../../utilities/createFileContent';
import { Button } from '../Button/Button';
import style from './style.module.css';
import { useRef, useState } from 'react';

export function Flyout() {
  const { amount, cards } = useCustomSelector((state) => state.CardReducer);
  const { clear } = cardSlice.actions;
  const dispatch = useCustomDispatch();
  const [downloadUrl, setDownloadUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [fileName, setFileName] = useState('');

  const handleDownloadClick = () => {
    const fileContent = createFileContent(cards);
    const blob = new Blob([fileContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);
    setFileName(`${amount}_item${amount === 1 ? '' : 's'}.csv`);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl('');
      }
    }, 0);
  };

  return (
    amount !== 0 && (
      <div className={style.flyout}>
        <div className={style['flyout-content']}>
          <div className={style['flyout-element']}>
            Selected items: {amount}
          </div>
          <Button
            style={style['flyout-element']}
            text="Unselect all"
            onClick={() => dispatch(clear())}
          />
          <Button
            style={style['flyout-element']}
            text="Download"
            onClick={handleDownloadClick}
          />
          <a
            ref={downloadRef}
            href={downloadUrl}
            className={style.link}
            download={fileName}
          />
        </div>
      </div>
    )
  );
}
