import { MantineProvider } from '@mantine/core';
import { OrderDialogProvider } from '@components';
import { theme } from '@styles/theme';
import { Router } from './Router';

export function App() {
  return (
    <MantineProvider theme={theme}>
      <OrderDialogProvider>
        <Router />
      </OrderDialogProvider>
    </MantineProvider>
  );
}
