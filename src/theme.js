import { useLayoutEffect } from 'react';
import { dark, light } from "./themes";

export default function useTheme(theme) {
const themes = {
    dark,
    light
};

  useLayoutEffect(
    () => {
      const values = themes[theme.label];
      for (const key in values) {
        document.documentElement.style.setProperty(`--${key}`, values[key]);
      }
    },
    [theme]
  );
}
