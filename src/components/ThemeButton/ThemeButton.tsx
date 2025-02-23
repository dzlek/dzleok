import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import { Theme } from '../../types/types';
import s from './ThemeButton.module.scss';

const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  return (
    <div className={s.themeButton}>
      <label htmlFor="theme-select">Theme: </label>
      <select id="theme-select" value={theme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeButton;
