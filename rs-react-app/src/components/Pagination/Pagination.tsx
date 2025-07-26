import { Button } from '../Button/Button';
import styles from './styles.module.css';
import { usePage } from '../../hooks/usePagination/usePagination';
import { useSearchParams } from 'react-router';

export function Pagination({ max }: { max: number | undefined }) {
  const { page, setPage } = usePage();
  const [_, setSearchParams] = useSearchParams();

  if (!max) throw new Error('Information about max page is not received!');

  return (
    <div className={styles.wrapper}>
      <Button
        text="<"
        onClick={() => {
          setPage((prev) => prev - 1);
          setSearchParams(() => ({ page: (parseInt(page) - 1).toString() }));
        }}
        disabled={page === '1' ? true : false}
      />
      <div>{`${page} / ${max}`}</div>
      <Button
        text=">"
        onClick={() => {
          setPage((prev) => prev + 1);
          setSearchParams(() => ({
            page: (page + 1).toString(),
          }));
        }}
        disabled={page === max.toString() ? true : false}
      />
    </div>
  );
}
