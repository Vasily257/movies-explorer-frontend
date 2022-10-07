import { useState, useEffect } from 'react';

function useColumns(element) {
  const getColumns = () => {
    if (element) {
      return window.getComputedStyle(element).getPropertyValue('grid-template-columns').split(' ').length;
    }
    return 0;
  };

  const [columns, setColumns] = useState(0);

  function handleResize() {
    setColumns(getColumns(element));
  }

  function handleResizeWithTimeout() {
    let timer;
    function configureTimeout() {
      clearTimeout(timer);
      timer = setTimeout(handleResize, 1000);
    }

    configureTimeout();
  }

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResizeWithTimeout);
    return () => {
      window.removeEventListener('resize', handleResizeWithTimeout);
    };
  }, [element]);

  return columns;
}

export default useColumns;
