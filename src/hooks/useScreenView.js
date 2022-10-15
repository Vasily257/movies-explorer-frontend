import useMediaQuery from './useMediaQuery';

function useScreenView() {
  const isMobile = useMediaQuery('(min-width: 300px)');
  const isTablet = useMediaQuery('(min-width: 600px)');
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return { isMobile, isTablet, isDesktop };
}

export default useScreenView;
