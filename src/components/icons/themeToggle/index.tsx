import { useMemo } from "preact/hooks";
import { ThemeToggleMoon } from "./ThemeToggleMoon";
import { ThemeToggleSun } from "./ThemeToggleSun";
import { useTheme } from "../../../utils/theme";

export const ThemeToggle = () => {
  const [theme, _setTheme, toggleTheme] = useTheme();

  const Icon = useMemo(() => ({ dark: ThemeToggleSun, light: ThemeToggleMoon }[theme]), [theme]);

  return (
    <span className="cursor-pointer" onClick={toggleTheme}>
      <Icon />
    </span>
  );
};