import { useContext } from 'react';
import { OrderDialogContext, type OrderDialogContextValue } from './context';

/** Gives any component a way to open the application dialog. */
export function useOrderDialog(): OrderDialogContextValue {
  const context = useContext(OrderDialogContext);
  if (!context) {
    throw new Error('useOrderDialog must be used inside OrderDialogProvider');
  }
  return context;
}
