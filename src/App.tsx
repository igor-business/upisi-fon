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
          primaryColor: 'violet',
        }}
        defaultColorScheme="light"
      >
        <Router />
      </MantineProvider>
    </I18nextProvider>
  );
}

export default App;
