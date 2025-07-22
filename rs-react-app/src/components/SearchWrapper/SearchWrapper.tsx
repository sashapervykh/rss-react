import { useEffect, useState } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import {
  errorScheme,
  getDataFromApi,
  type SearchResultType,
} from '../../api/getDataFromApi';
import { Spinner } from '../Spinner/Spinner';

export function SearchWrapper() {
  const [results, setResults] = useState<undefined | SearchResultType[]>(
    undefined
  );
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<undefined | string>(undefined);

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
    <>
      <SearchForm handleSearch={handleSearch} disabled={pending} />
      <section>
        {pending && <Spinner />}
        {!pending && <SearchResults results={results} />}
      </section>
    </>
  );
}
