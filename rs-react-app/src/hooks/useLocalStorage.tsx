import { useEffect, useState } from 'react';

import { getLocalStorageData } from '../utilities/getLocalStorageData';
import { setLocalStorageData } from '../utilities/setLocalStorageData';

export function useLocalStorage() {
  const [savedInput, setSavedInput] = useState(() => {
    return getLocalStorageData() ?? '';
  });

  useEffect(() => {
    const handleLocalStorageChange = () => {
      const newInput = getLocalStorageData();
      setSavedInput(newInput ?? '');
    };
    window.addEventListener('search', handleLocalStorageChange);
    return () => {
      window.removeEventListener('search', handleLocalStorageChange);
    };
  }, []);

  function updateStorageBySearch(input: string) {
    setLocalStorageData(input);
    const search = new CustomEvent('search');
    window.dispatchEvent(search);
  }

  return { savedInput, setSavedInput, updateStorageBySearch };
}
