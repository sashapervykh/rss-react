import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { AssetType } from '../../api/types';

import { getOneAssetFromApi } from '../../api/getOneAssetFromApi';
import { useTheme } from '../../hooks/useTheme/useTheme';
import shared from '../../styles/shared.module.css';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';

import styles from './styles.module.css';

export function CardDetails() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [details, setDetails] = useState<AssetType | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const getDetails = useCallback(async () => {
    setPending(true);
    const id = searchParams.get('details');
    if (!id) throw new Error('Id of the asset was not received');
    const results = await getOneAssetFromApi(id);
    setDetails(results);
    setPending(false);
  }, [setPending, searchParams]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return (
    <article
      className={`${styles['card-details']} ${shared[`element-${theme}`]}`}
      data-testid="card-details"
    >
      {pending && <Spinner />}
      {!pending && (
        <>
          <Button
            style={styles.button}
            text={'X'}
            onClick={() => {
              setSearchParams((prev) => {
                const page = prev.get('page') ?? '1';
                return { page: page };
              });
            }}
          />

          <h2 className={styles['details-title']}>{details?.title}</h2>
          <div className={styles['image-wrapper']}>
            <img
              className={styles['details-image']}
              src={details?.source}
              alt={details?.title}
            />
          </div>

          <h3 className={styles['details-keyword']}>
            Keywords: {details?.keywords.join('; ')}
          </h3>
          <h3 className={styles['description-title']}>Description:</h3>
          <p className={styles['details-description']}>
            {details?.description}
          </p>
        </>
      )}
    </article>
  );
}
