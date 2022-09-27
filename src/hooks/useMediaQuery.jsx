import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const getMatches = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(false);

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    handleChange();

    const matchQueryList = window.matchMedia(query);

    matchQueryList.addEventListener('change', handleChange);

    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
