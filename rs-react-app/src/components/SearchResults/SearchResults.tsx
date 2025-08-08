import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useGetResultsQuery } from '../../api/apiSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePage } from '../../hooks/usePagination/usePagination';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import { Spinner } from '../Spinner/Spinner';

import style from './style.module.css';

export function SearchResults() {
  const { page } = usePage();
  const { savedInput } = useLocalStorage();

  const [isPageShown, setIsPageShown] = useState(true);
  const prevInput = useRef<string | undefined>(undefined);

  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const { data, error, isLoading, isFetching, refetch } = useGetResultsQuery({
    q: savedInput,
    page: page,
  });

  useEffect(() => {
    if (error) {
      if (
        typeof error === 'object' &&
        'data' in error &&
        typeof error.data === 'string'
      ) {
        throw new Error(error.data);
      } else {
        throw new Error('Unknown error!');
      }
    }
  }, [error]);

  useEffect(() => {
    setIsPageShown(prevInput.current === savedInput);
    if (
      prevInput.current === savedInput &&
      Number(searchParams.get('page')) === page
    )
      return;
    if (prevInput.current !== savedInput) navigate(`/home`, { replace: true });

    prevInput.current = savedInput;
    setIsPageShown(true);
    if (data?.results.length !== 0) {
      navigate(`/home?page=${page}`, { replace: true });
    }
  }, [data, isLoading, savedInput, navigate, page, searchParams]);

  return (
    <div className={style['results-wrapper']}>
      {data?.results && data.results.length !== 0 && isPageShown && (
        <div className={style['results-controls']}>
          <Button
            text={'\u{21BA}'}
            onClick={() => {
              refetch();
            }}
          />
          <Pagination max={data.max} />
        </div>
      )}
      {isLoading || isFetching || !data ? (
        <Spinner />
      ) : data.results.length === 0 ? (
        'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
      ) : (
        data.results.map((element, index) => (
          <Card
            key={index.toString()}
            nasa_id={element.nasa_id}
            source={element.source}
            title={element.title}
            media_type={element.media_type}
            description={element.description}
          />
        ))
      )}
    </div>
  );
}
