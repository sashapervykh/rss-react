import {
  errorScheme,
  getDataFromApi,
  type SearchResultType,
} from '../../api/getDataFromApi';
import { Card } from '../Card/Card';
import NO_IMAGE from '/no_image_available.png';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Spinner } from '../Spinner/Spinner';
import { Pagination } from '../Pagination/Pagination';

export function SearchResults() {
  const { savedInput } = useLocalStorage();
  const [results, setResults] = useState<undefined | SearchResultType[]>(
    undefined
  );
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<undefined | string>(undefined);

  useEffect(() => {
    handleSearch(savedInput);
  }, [savedInput]);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  const handleSearch = async (input: string) => {
    try {
      setPending(true);
      const results = await getDataFromApi({ input: input });
      setPending(false);
      setResults(results);
    } catch (error) {
      const message = errorScheme.parse(error).message;
      setError(message);
    }
  };

  return (
    <section className={style['results-wrapper']}>
      <Pagination />
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
