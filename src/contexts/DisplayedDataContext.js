import { createContext } from 'react';

const DisplayedDataContext = createContext({
  displayedData: {},
  setDisplayedData: () => {},
});

export default DisplayedDataContext;
