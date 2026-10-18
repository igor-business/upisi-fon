import { useMemo, useState, type ReactNode } from 'react';
import { OrderDialogContext, type OrderDialogContextValue, type OrderSelection } from './context';
import { OrderDialog } from './order-dialog';

/** Keeps the dialog at the top of the app, so every page can open it. */
export function OrderDialogProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  // Kept after closing, so the content does not change while the dialog fades out.
  const [selection, setSelection] = useState<OrderSelection | null>(null);

  const value = useMemo<OrderDialogContextValue>(
    () => ({
      openOrder: (product, tier = 'individual') => {
        setSelection({ product, tier });
        setOpened(true);
      },
    }),
    [],
  );

  return (
    <OrderDialogContext.Provider value={value}>
      {children}
      {selection && <OrderDialog opened={opened} selection={selection} onClose={() => setOpened(false)} />}
    </OrderDialogContext.Provider>
  );
}
