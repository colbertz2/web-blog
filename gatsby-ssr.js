// Used to insert a script tag before body in each page of the site
// to implement non-flickery dark mode
//
// Reference: https://www.joshwcomeau.com/react/dark-mode/#order-of-operations

import React from 'react';

import {
  COLOR_MODE_KEY,
  COLORS,
  INITIAL_COLOR_MODE_CSS_PROP,
} from './src/constants';

const MagicScriptTag = () => {
  let codeToRunOnClient = `
  (function() {
    function getInitialColorMode() {
      const persistedColorPreference = window.localStorage.getItem('color-mode');
      const hasPersistedPreference = typeof persistedColorPreference === 'string';

      // If the user has explicitly chosen light or dark,
      // let's use it. Otherwise, this value will be null.
      if (hasPersistedPreference) {
        return persistedColorPreference;
      }

      // If they haven't been explicit, let's check the media
      // query
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof mql.matches === 'boolean';

      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
      }

      // If they are using a browser/OS that doesn't support
      // color themes, let's default to 'light'.
      return 'light';
    }

    const colorMode = getInitialColorMode();

    const root = document.documentElement;

    root.style.setProperty(
      '--color-text',
      colorMode === 'light'
        ? '${COLORS.text.light}'
        : '${COLORS.text.dark}'
    );
    root.style.setProperty(
      '--color-background',
      colorMode === 'light'
        ? '${COLORS.background.light}'
        : '${COLORS.background.dark}'
    );
    root.style.setProperty(
      '--color-primary',
      colorMode === 'light'
        ? '${COLORS.primary.light}'
        : '${COLORS.primary.dark}'
    );

    root.style.setProperty('--initial-color-mode', colorMode);
  })()`;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
}
