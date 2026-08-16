import { Container } from "@mantine/core";
import { PageContainerProps } from "@/types/common";
import clsx from "clsx";
import styles from "./index.module.css";

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <Container fluid className={clsx(styles.container, className)}>
      {children}
    </Container>
  );
}

export default PageContainer;
