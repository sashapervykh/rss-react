import { Button } from '../Button/Button';
import styles from './styles.module.css';
import { usePage } from '../../hooks/usePagination/usePagination';

export function Pagination({ max = 10 }: { max: number | undefined }) {
  const { page, setPage } = usePage();

  if (!max) throw new Error('Information about max page is not received!');

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
