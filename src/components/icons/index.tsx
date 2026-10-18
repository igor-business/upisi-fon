import type { ReactNode, SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Width and height in px. */
  size?: number;
}

interface OutlineIconProps extends IconProps {
  children: ReactNode;
}

/** Base for the 24×24 outline icons: draws in the current text color and is hidden from screen readers. */
export function OutlineIcon({ size = 24, strokeWidth = 2, children, ...props }: OutlineIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <OutlineIcon strokeWidth={3} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </OutlineIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <OutlineIcon strokeWidth={2.5} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </OutlineIcon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <OutlineIcon strokeWidth={2.5} {...props}>
      <path d="M12 5v14M5 12h14" />
    </OutlineIcon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <OutlineIcon strokeWidth={2.5} {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </OutlineIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <OutlineIcon strokeWidth={2.5} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </OutlineIcon>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </OutlineIcon>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </OutlineIcon>
  );
}

/** Solid "play" triangle with rounded corners. */
export function PlayIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <polygon points="8.3,5 8.3,19 19.3,12" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <OutlineIcon strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </OutlineIcon>
  );
}
