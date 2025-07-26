import { useSearchParams } from 'react-router';
import { getOneAssetFromApi } from '../../api/getOneAssetFromApi';
import { useCallback, useEffect, useState } from 'react';
import type { AssetType } from '../../api/types';
import { Spinner } from '../Spinner/Spinner';
import { Button } from '../Button/Button';

export function CardDetails() {
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

  if (pending) return <Spinner />;

  return (
    <article>
      <Button
        text={'X'}
        onClick={() => {
          setSearchParams((prev) => {
            const page = prev.get('page') ?? '1';
            return { page: page };
          });
        }}
      />
      <h2>{details?.title}</h2>
      <h3>Keywords: {details?.keywords.join('; ')}</h3>
      <p>{details?.description}</p>
    </article>
  );
}
