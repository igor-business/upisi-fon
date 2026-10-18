import { createTheme, type MantineColorsTuple } from '@mantine/core';

/**
 * Brand pink, from lightest to darkest. Shade 5 is the brand color and shade 6 the color of
 * filled buttons. CSS reads the same shades through --mantine-color-pink-N (see global.css).
 */
const pink: MantineColorsTuple = [
  '#fff4f9',
  '#ffe3f0',
  '#ffc3de',
  '#ff8bc2',
  '#f9459e',
  '#df0275',
  '#c40263',
  '#a30051',
  '#7d003e',
  '#57002b',
];

const fontFamily = '"Outfit Variable", Outfit, system-ui, sans-serif';

export const theme = createTheme({
  fontFamily,
  headings: { fontFamily },
  primaryColor: 'pink',
  colors: { pink },
});
