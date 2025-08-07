import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useGetResultsQuery } from '../../api/apiSlice';
import { getDataFromApi } from '../../api/getDataFromApi';
import { errorScheme, type SearchResultType } from '../../api/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePage } from '../../hooks/usePagination/usePagination';
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import { Spinner } from '../Spinner/Spinner';

import style from './style.module.css';

export function SearchResults() {
  const { page } = usePage();
  const { savedInput } = useLocalStorage();
  const [results, setResults] = useState<undefined | SearchResultType[]>(
    undefined
  );
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isPageShown, setIsPageShown] = useState(true);
  const prevInput = useRef<string | undefined>(undefined);
  const [maxPage, setMaxPage] = useState<number | undefined>(undefined);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetResultsQuery({
    q: savedInput,
    page: page,
  });

  useEffect(() => {
    console.log(isLoading, data, error);
  }, [data, error, isLoading]);

  const handleSearch = useCallback(
    async (input: string, page: number) => {
      try {
        setIsPageShown(prevInput.current === savedInput);
        if (
          prevInput.current === savedInput &&
          Number(searchParams.get('page')) === page
        )
          return;
        if (prevInput.current !== savedInput)
          navigate(`/home`, { replace: true });
        setPending(true);
        const response = await getDataFromApi({ input: input, page: page });
        setPending(false);
        setResults(response.results);
        setMaxPage(response.max);
        prevInput.current = savedInput;
        setIsPageShown(true);
        if (response.results.length !== 0) {
          navigate(`/home?page=${page}`, { replace: true });
        }
      } catch (error) {
        const message = errorScheme.parse(error).message;
        setError(message);
      }
    },
    [savedInput, navigate, searchParams]
  );

  useEffect(() => {
    handleSearch(savedInput, page);
  }, [savedInput, page, handleSearch]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <div className={style['results-wrapper']}>
      {results && results.length !== 0 && isPageShown && (
        <Pagination max={maxPage} />
      )}
      {pending || !results ? (
        <Spinner />
      ) : results.length === 0 ? (
        'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
      ) : (
        results.map((element, index) => (
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
