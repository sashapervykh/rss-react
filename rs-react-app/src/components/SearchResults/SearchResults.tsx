import { getDataFromApi } from '../../api/getDataFromApi';
import { Card } from '../Card/Card';
import NO_IMAGE from '/no_image_available.png';
import style from './style.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Spinner } from '../Spinner/Spinner';
import { Pagination } from '../Pagination/Pagination';
import { usePage } from '../../hooks/usePagination/usePagination';
import { useSearchParams } from 'react-router';
import { errorScheme, type SearchResultType } from '../../api/types';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    async (input: string, page: number) => {
      try {
        setIsPageShown(prevInput.current === savedInput);
        if (
          prevInput.current === savedInput &&
          Number(searchParams.get('page')) === page
        )
          return;
        if (prevInput.current !== savedInput && prevInput.current !== undefined)
          setSearchParams();
        setPending(true);
        const response = await getDataFromApi({ input: input, page: page });
        setPending(false);
        setResults(response.results);
        setMaxPage(response.max);
        prevInput.current = savedInput;
        setIsPageShown(true);
        if (response.results.length !== 0) {
          setSearchParams((prev) => {
            const newState: { page: string; details?: string } = {
              page: page.toString(),
            };
            const details = prev.get('details');
            if (details && prev.get('page') === page.toString())
              newState.details = details;
            return newState;
          });
        }
      } catch (error) {
        const message = errorScheme.parse(error).message;
        setError(message);
      }
    },
    [savedInput, setSearchParams, searchParams]
  );

  useEffect(() => {
    console.log('render');
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
            key={index}
            id={element.nasa_id}
            source={element.source ?? NO_IMAGE}
            title={element.title}
            media_type={element.media_type}
            description={element.description}
          />
        ))
      )}
    </div>
  );
}
