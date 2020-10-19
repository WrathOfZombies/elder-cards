import React, { useContext, useEffect } from "react";
import {
  Provider,
  teamsTheme,
  teamsDarkTheme,
} from "@fluentui/react-northstar";

const ThemeContext = React.createContext(false);

/**
 * Sets up a theme provider and the ability to toggle themes
 */
export const ThemeProvider: React.FC = ({ children }) => {
  const [isDarkTheme, toggleTheme] = React.useState(false);

  useEffect(() => {
    // Simple keydown handler to toggle the theme everytime someone
    // presses ALT + T or OPT + T
    const handler = (event: KeyboardEvent) => {
      if ((event.altKey || event.metaKey) && event.key.toUpperCase() === "T") {
        toggleTheme(theme => !theme);
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const options = {
      passive: true,
      capture: false,
    };

    document.addEventListener("keydown", handler, options);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <Provider
        id="elder-cards-app"
        theme={isDarkTheme ? teamsDarkTheme : teamsTheme}
      >
        {children}
      </Provider>
    </ThemeContext.Provider>
  );
};

/**
 * Returns whether the dark theme is currently active
 */
export const useIsDarkTheme = (): boolean => useContext(ThemeContext);
