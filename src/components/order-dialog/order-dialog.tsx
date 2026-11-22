import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { OrderSelection } from './context';
import { OrderForm } from './order-form';
import styles from './index.module.css';

interface OrderDialogProps {
  opened: boolean;
  selection: OrderSelection;
  /** Part of the form's key: a new version starts an empty form. */
  formVersion: number;
  onClose: () => void;
  /** Asks for an empty form next time (called once the dialog has closed after sending). */
  onReset: () => void;
}

/** Wide dialog (full screen on phones) with the product name on top and the application form. */
export function OrderDialog({ opened, selection, formVersion, onClose, onReset }: OrderDialogProps) {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(width < ${theme.breakpoints.sm})`);
  const { product } = selection;
  // Whether the user has typed anything; a click next to the dialog then no longer closes it.
  const [dirty, setDirty] = useState(false);
  const sent = useRef(false);

  const handleExited = () => {
    if (sent.current) {
      sent.current = false;
      setDirty(false);
      onReset();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="min(64rem, 94vw)"
      radius="lg"
      centered
      fullScreen={isMobile}
      // Closing keeps the entered data, so an accidental close loses nothing.
      keepMounted
      closeOnClickOutside={!dirty}
      onExitTransitionEnd={handleExited}
      closeButtonProps={{ 'aria-label': t('order.close') }}
      title={
        <span className={styles.titleBlock}>
          <span className={styles.title}>{t(`pricing.products.${product}.name`)}</span>
          <span className={styles.subtitle}>{t(`pricing.products.${product}.description`)}</span>
        </span>
      }
      classNames={{ title: styles.modalTitle, header: styles.modalHeader, body: styles.modalBody }}
    >
      {/* Keyed by the selection, so the form starts fresh for every product and tier, and after sending. */}
      <OrderForm
        key={`${product}-${selection.tier}-${formVersion}`}
        selection={selection}
        onDirtyChange={setDirty}
        onSent={() => {
          sent.current = true;
        }}
        onDone={onClose}
      />
    </Modal>
  );
}
