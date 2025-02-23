import { createContext } from 'react';
import { ThemeContextProps } from '../../types/types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);
