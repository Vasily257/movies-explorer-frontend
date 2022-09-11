import { createContext } from 'react';

export const MenuContext = createContext({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

export default MenuContext;
