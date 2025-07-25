import {
  errorScheme,
  getDataFromApi,
  type SearchResultType,
} from '../../api/getDataFromApi';
import { Card } from '../Card/Card';
import NO_IMAGE from '/no_image_available.png';
import style from './style.module.css';
import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Spinner } from '../Spinner/Spinner';
import { Pagination } from '../Pagination/Pagination';
import { usePage } from '../../hooks/usePagination/usePagination';

export function SearchResults() {
  const { page } = usePage();
  const { savedInput } = useLocalStorage();
  const [results, setResults] = useState<undefined | SearchResultType[]>(
    undefined
  );
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isPageShown, setIsPageShown] = useState(true);
  const prevInput = useRef(savedInput);

  useEffect(() => {
    handleSearch(savedInput, page);
    console.log(page);
  }, [savedInput, page]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  const handleSearch = async (input: string, page: number) => {
    try {
      setIsPageShown(prevInput.current === savedInput);
      setPending(true);
      const results = await getDataFromApi({ input: input, page: page });
      setPending(false);
      setResults(results);
      prevInput.current = savedInput;
      setIsPageShown(true);
    } catch (error) {
      const message = errorScheme.parse(error).message;
      setError(message);
    }
  };

  return (
    <section className={style['results-wrapper']}>
      {results && results.length !== 0 && isPageShown && (
        <Pagination max={10} />
      )}
      {pending || !results ? (
        <Spinner />
      ) : results.length === 0 ? (
        'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
      ) : (
        results.map((element, index) => (
          <Card
            key={index}
            source={element.source ?? NO_IMAGE}
            title={element.title}
            media_type={element.media_type}
            description={element.description}
          />
        ))
      )}
    </section>
  );
}
