import { useState, useCallback } from "preact/hooks";

export type Theme = "dark" | "light";

export const THEME_KEY = "theme";

export const DEFAULT_THEME: Theme = "dark";
 
export const themeService = {
  restoreThemeInDom(theme?: Theme): void {
    theme = theme ?? this.get() ?? DEFAULT_THEME;

    const classListAction = theme === "dark" ? "add" : "remove";
    document.documentElement.classList[classListAction]("dark"); 
  },
  get(): Theme | null {
    return localStorage.getItem(THEME_KEY) as Theme ?? null;
  },
  set(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme);
    this.restoreThemeInDom(theme);
  }
}

export type ThemeOrSetter = Theme | null | ((prev: Theme) => Theme | null)

const dispatchThemeSetter = (prevValue: Theme, theme: ThemeOrSetter): Theme | null => {
  if (typeof theme === "function") {
    return theme(prevValue);
  }

  return theme;
}

export const useTheme = (defaultValue: Theme = DEFAULT_THEME) => {
  const [theme, _setTheme] = useState(() => {
    const storedTheme = themeService.get();

    if (!storedTheme) {
      themeService.set(defaultValue);
      return defaultValue;
    }

    return storedTheme;
  });

  const setTheme = useCallback((theme: ThemeOrSetter) => {
    _setTheme((prev) => {
      const newTheme = dispatchThemeSetter(prev, theme) ?? defaultValue;
      themeService.set(newTheme);

      return newTheme;
    });
  }, [_setTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  }, [setTheme]);

  return [theme, setTheme, toggleTheme] as const;
}