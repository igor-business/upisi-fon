import { Title as MantineTitle } from '@mantine/core';
import { TitleProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function Title({ children, order = 2, className }: TitleProps) {
  return (
    <MantineTitle order={order} className={clsx(styles.title, className)}>
      {children}
    </MantineTitle>
  );
}

export default Title;
