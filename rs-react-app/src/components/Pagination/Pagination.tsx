import { Button } from '../Button/Button';
import styles from './styles.module.css';
import { usePage } from '../../hooks/usePagination/usePagination';
import { useSearchParams } from 'react-router';

export function Pagination({ max }: { max: number | undefined }) {
  const { page, setPage } = usePage();
  const [_, setSearchParams] = useSearchParams();

  if (!max) throw new Error('Information about max page is not received!');

  return (
    <div className={styles.wrapper} data-testid="pagination">
      <Button
        text="<"
        onClick={() => {
          setPage((prev) => prev - 1);
          setSearchParams(() => ({ page: (page - 1).toString() }));
        }}
        disabled={page === 1 ? true : false}
      />
      <div className={styles['page-number']}>{`${page} / ${max}`}</div>
      <Button
        text=">"
        onClick={() => {
          setPage((prev) => prev + 1);
          setSearchParams(() => ({
            page: (page + 1).toString(),
          }));
        }}
        disabled={page === max ? true : false}
      />
    </div>
  );
}
