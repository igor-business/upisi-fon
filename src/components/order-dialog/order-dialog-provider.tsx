import { useMemo, useState, type ReactNode } from 'react';
import { OrderDialogContext, type OrderDialogContextValue, type OrderSelection } from './context';
import { OrderDialog } from './order-dialog';

/** Keeps the dialog at the top of the app, so every page can open it. */
export function OrderDialogProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  // Kept after closing, so the content does not change while the dialog fades out and an
  // unfinished form is still there when the same product is opened again.
  const [selection, setSelection] = useState<OrderSelection | null>(null);
  // Bumped once an application is sent, so the next opening starts with an empty form.
  const [formVersion, setFormVersion] = useState(0);

  const value = useMemo<OrderDialogContextValue>(
    () => ({
      openOrder: (product, tier = 'individual') => {
        setSelection((current) =>
          current?.product === product && current.tier === tier ? current : { product, tier },
        );
        setOpened(true);
      },
    }),
    [],
  );

  return (
    <OrderDialogContext.Provider value={value}>
      {children}
      {selection && (
        <OrderDialog
          opened={opened}
          selection={selection}
          formVersion={formVersion}
          onClose={() => setOpened(false)}
          onReset={() => setFormVersion((version) => version + 1)}
        />
      )}
    </OrderDialogContext.Provider>
  );
}
