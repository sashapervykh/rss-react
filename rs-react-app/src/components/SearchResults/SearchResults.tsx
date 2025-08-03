import { getDataFromApi } from '../../api/getDataFromApi';
import { Card } from '../Card/Card';
import style from './style.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Spinner } from '../Spinner/Spinner';
import { Pagination } from '../Pagination/Pagination';
import { usePage } from '../../hooks/usePagination/usePagination';
import { useNavigate, useSearchParams } from 'react-router';
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
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
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
        results.map((element) => (
          <Card
            key={element.nasa_id}
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
