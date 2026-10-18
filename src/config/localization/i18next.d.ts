import 'i18next';
import type { DEFAULT_NAMESPACE, resources } from '.';

// Makes t() and <Trans> check translation keys at compile time.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NAMESPACE;
    resources: (typeof resources)['sr'];
  }
}
