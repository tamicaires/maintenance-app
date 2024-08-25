import { setTheme } from "@/store/features/theme-settings";
import { useAppSelector } from "@/store/hook/app-selector";
import { selectThemeSettings } from "@/store/selectors";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

type Theme = "dark" | "light" | "system";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const theme = useAppSelector(selectThemeSettings);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const handleSetTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    dispatch(setTheme(theme));
  };

  return (
    <div>
      {React.cloneElement(children as React.ReactElement, {
        setTheme: handleSetTheme,
      })}
    </div>
  );
}
