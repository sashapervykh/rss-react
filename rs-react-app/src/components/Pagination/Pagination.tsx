import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './styles.module.css';

export function Pagination({ max = 10 }: { max: number }) {
  const [page, setPage] = useState(1);

  console.log(max);
  return (
    <div className={styles.wrapper}>
      <Button
        text="<"
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
        disabled={page === 1 ? true : false}
      />
      <div>{`${page}`}</div>
      <Button
        text=">"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === max ? true : false}
      />
    </div>
  );
}
