import { useThemeContext, Theme } from '../context/ThemeContext';

export type { Theme };

export function useTheme() {
  return useThemeContext();
}
