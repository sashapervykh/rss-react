import { useCustomDispatch, useCustomSelector } from '../../hooks/reduxHooks';
import { cardSlice } from '../../store/reducers/CardSlice';
import { Button } from '../Button/Button';
import style from './style.module.css';
import { useRef, useState } from 'react';

export function Flyout() {
  const { amount } = useCustomSelector((state) => state.CardReducer);
  const { clear } = cardSlice.actions;
  const dispatch = useCustomDispatch();
  const [downloadUrl, setDownloadUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [fileName, setFileName] = useState('');

  const handleDownloadClick = () => {
    const fileContent = 'file content';
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
    amount && (
      <div className={style.flyout}>
        <div>Selected items: {amount}</div>
        <Button text="Unselect all" onClick={() => dispatch(clear())} />
        <Button
          text="Download"
          disabled={amount === 0 ? true : false}
          onClick={handleDownloadClick}
        />
        <a
          ref={downloadRef}
          href={downloadUrl}
          className={style.link}
          download={fileName}
        />
      </div>
    )
  );
}
