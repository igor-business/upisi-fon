import { Text } from '@mantine/core';
import { DescriptionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function Description({ children, className }: DescriptionProps) {
  return (
    <Text component="p" className={clsx(styles.description, className)}>
      {children}
    </Text>
  );
}

export default Description;
