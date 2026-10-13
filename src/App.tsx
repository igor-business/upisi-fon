import { I18nextProvider } from 'react-i18next';
import { MantineProvider } from '@mantine/core';
import i18n from '@config/localization';
import { Router } from './Router';

export function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <MantineProvider
        theme={{
          fontFamily: 'Outfit Variable, Outfit, system-ui, sans-serif',
          headings: { fontFamily: 'Outfit Variable, Outfit, system-ui, sans-serif' },
          primaryColor: 'pink',
          colors: {
            pink: [
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
            ],
          },
        }}
        defaultColorScheme="light"
      >
        <Router />
      </MantineProvider>
    </I18nextProvider>
  );
}

export default App;
