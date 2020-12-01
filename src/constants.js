export const COLORS = {
    text: {
        light: '#000',
        dark: '#fff',
    },
    background: {
        light: '#fff',
        dark: '#121212',
    },
    primary: {
        light: 'hsl(340deg, 100%, 40%)', // Pinkish-red
        dark: 'hsl(50deg, 100%, 50%)', // Yellow
    },
    secondary: {
        light: '#007ACC',
        dark: '#5ca9ff',
    },
    // Grays, scaling from least-noticeable to most-noticeable
    gray300: {
        light: 'hsl(0deg, 0%, 70%)',
        dark: 'hsl(0deg, 0%, 30%)',
    },
    gray500: {
        light: 'hsl(0deg, 0%, 50%)',
        dark: 'hsl(0deg, 0%, 50%)',
    },
    gray700: {
        light: 'hsl(0deg, 0%, 30%)',
        dark: 'hsl(0deg, 0%, 70%)',
    },
};

export const COLOR_MODE_KEY = 'color-mode';
export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';