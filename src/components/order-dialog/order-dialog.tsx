import { useTranslation } from 'react-i18next';
import { Modal, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { OrderSelection } from './context';
import { OrderForm } from './order-form';
import styles from './index.module.css';

interface OrderDialogProps {
  opened: boolean;
  selection: OrderSelection;
  onClose: () => void;
}

/** Wide dialog (full screen on phones) with the product name on top and the application form. */
export function OrderDialog({ opened, selection, onClose }: OrderDialogProps) {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(width < ${theme.breakpoints.sm})`);
  const { product } = selection;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="min(64rem, 94vw)"
      radius="lg"
      centered
      fullScreen={isMobile}
      closeButtonProps={{ 'aria-label': t('order.close') }}
      title={
        <span className={styles.titleBlock}>
          <span className={styles.title}>{t(`pricing.products.${product}.name`)}</span>
          <span className={styles.subtitle}>{t(`pricing.products.${product}.description`)}</span>
        </span>
      }
      classNames={{ title: styles.modalTitle, header: styles.modalHeader, body: styles.modalBody }}
    >
      {/* Keyed by the selection, so the form starts fresh for every product and tier. */}
      <OrderForm key={`${product}-${selection.tier}`} selection={selection} onDone={onClose} />
    </Modal>
  );
}
