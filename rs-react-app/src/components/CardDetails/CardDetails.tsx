import { useSearchParams } from 'react-router';

import { useGetDetailsQuery } from '../../api/apiSlice';
import { useTheme } from '../../hooks/useTheme/useTheme';
import shared from '../../styles/shared.module.css';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';

import styles from './styles.module.css';

export function CardDetails() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('details');
  if (!id) throw new Error('Information about details was not received');
  const { data, isLoading, isFetching, refetch } = useGetDetailsQuery({
    nasa_id: id,
  });

  return (
    <article
      className={`${styles['card-details']} ${shared[`element-${theme}`]}`}
      data-testid="card-details"
    >
      {(isLoading || isFetching) && <Spinner />}
      {!(isLoading || isFetching) && (
        <>
          <div className={styles['detail-buttons']}>
            <Button text={'\u{21BA}'} onClick={() => refetch()} />
            <Button
              text={'X'}
              onClick={() => {
                setSearchParams((prev) => {
                  const page = prev.get('page') ?? '1';
                  return { page: page };
                });
              }}
            />
          </div>

          <h2 className={styles['details-title']}>{data?.title}</h2>
          <div className={styles['image-wrapper']}>
            <img
              className={styles['details-image']}
              src={data?.source}
              alt={data?.title}
            />
          </div>

          <h3 className={styles['details-keyword']}>
            Keywords: {data?.keywords.join('; ')}
          </h3>
          <h3 className={styles['description-title']}>Description:</h3>
          <p className={styles['details-description']}>{data?.description}</p>
        </>
      )}
    </article>
  );
}
