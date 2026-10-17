import type { ReactNode } from 'react';

/** Props for the Title component. */
export interface TitleProps {
  /** Title content (translated text passed from the page). */
  children: ReactNode;
  /** Heading level (h1-h3). Defaults to 2; the hero owns the page h1. */
  order?: 1 | 2 | 3;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the Description component. */
export interface DescriptionProps {
  /** Description content (translated text passed from the page). */
  children: ReactNode;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the PageContainer wrapper component. */
export interface PageContainerProps {
  /** Page content. */
  children: ReactNode;
  /** Optional extra class name. */
  className?: string;
}

/** A card with a title and a description (used by the process and mentor sections). */
export interface ProblemCard {
  /** Card title (translated text passed from the page). */
  title: ReactNode;
  /** Card description (translated text passed from the page). */
  description: ReactNode;
}

/** A single statistic shown next to the testimonials. */
export interface TestimonialStat {
  /** Statistic value, e.g. "15.000+". */
  value: ReactNode;
  /** Short label below the value. */
  label: ReactNode;
}

/** A single testimonial. */
export interface Testimonial {
  /** Testimonial text. */
  quote: ReactNode;
  /** Author name. */
  name: string;
  /** Author details, e.g. "Student FON-a". */
  meta: ReactNode;
}

/** Props for the TestimonialsSection component. */
export interface TestimonialsSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Testimonials shown side by side. */
  testimonials: readonly Testimonial[];
  /** Optional extra class name. */
  className?: string;
}

/** A part of the preparation shown on a card of the program section. */
export interface ProgramCard {
  /** Decorative illustration at the top of the card. */
  media?: ReactNode;
  /** Name of the card. */
  title: ReactNode;
  /** What the solution includes. */
  items: readonly ReactNode[];
}

/** Props for the ProgramSection component. */
export interface ProgramSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Section description (translated text passed from the page). */
  description: ReactNode;
  /** Cards describing the parts of the preparation. */
  cards: readonly ProgramCard[];
  /** Label of the button below the cards. */
  actionLabel: ReactNode;
  /** Called when the button is clicked. */
  onAction: () => void;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the ProcessSection component. */
export interface ProcessSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Steps shown in order (title and description cards). */
  steps: readonly ProblemCard[];
  /** Label of the button below the steps. */
  actionLabel: ReactNode;
  /** Called when the button is clicked. */
  onAction: () => void;
  /** Optional extra class name. */
  className?: string;
}

/** A single free lesson (YouTube video). */
export interface Lesson {
  /** YouTube video id. */
  videoId: string;
  /** Lesson title (translated text passed from the page). */
  title: string;
  /** Video length, e.g. "07:56". */
  duration: string;
}

/** Groups the free lessons are divided into on the lessons page. */
export type LessonGroup = 'intro' | 'numbers' | 'polynomials';

/** Props for the LessonList component (video cards with a player dialog). */
export interface LessonListProps {
  /** Lessons shown as video cards. */
  lessons: readonly Lesson[];
  /** Builds the accessible label of a card's play button. */
  getPlayLabel: (title: string) => string;
  /** Accessible label of the close button in the video dialog. */
  closeLabel: string;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the LessonsSection component. */
export interface LessonsSectionProps extends LessonListProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Short text below the title. */
  description: ReactNode;
  /** Label of the button below the lessons. */
  actionLabel: ReactNode;
  /** Called when the button is clicked. */
  onAction: () => void;
}

/** A person presented in the about section. */
export interface TeamMember {
  /** Full name. */
  name: string;
  /** Role shown above the name. */
  role: string;
  /** Short biography. */
  description: string;
  /** Photo; a placeholder with the initials is shown when omitted. */
  photo?: ReactNode;
}

/** Props for the AboutSection component. */
export interface AboutSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Section description (translated text passed from the page). */
  description: ReactNode;
  /** The people behind the preparation (the first one is the main card). */
  members: readonly TeamMember[];
  /** Partner (Binary Bioskop) band below the cards. */
  partner: {
    logo: ReactNode;
    title: ReactNode;
    description: ReactNode;
    actionLabel: ReactNode;
    actionHref: string;
  };
  /** Optional extra class name. */
  className?: string;
}

/** Products that can be bought on the site. */
export type ProductId = 'mockExams' | 'summerSchool' | 'fullPrep';

/** Pricing tiers: one person, a group of 3 to 5, or a group of 5 or more. */
export type PricingTier = 'individual' | 'group3' | 'group5';

/** Features a product can include. */
export type ProductFeature = 'program' | 'videos' | 'mentor' | 'mockExams' | 'summerSchool';

/** Configuration of a product (prices in RSD per person). */
export interface ProductConfig {
  /** Price per person for each available tier; every product has an individual price. */
  prices: { individual: number } & Partial<Record<Exclude<PricingTier, 'individual'>, number>>;
  /** Features included in the product. */
  features: readonly ProductFeature[];
  /** Highlights the product as the recommended one. */
  recommended?: boolean;
}

/** Props for the PricingSection component. */
export interface PricingSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Called when the user chooses a product (opens the purchase dialog). */
  onSelect: (product: ProductId, tier: PricingTier) => void;
  /** Called when the user opens the Summer School page from the strip below the cards. */
  onSummerSchool: () => void;
  /** Optional extra class name. */
  className?: string;
}

/** Contact details of a single student in a purchase request. */
export interface OrderStudent {
  /** First and last name. */
  name: string;
  /** Phone number. */
  phone: string;
  /** Email address. */
  email: string;
}

/** A purchase request sent from the purchase dialog. */
export interface OrderRequest {
  product: ProductId;
  tier: PricingTier;
  /** Price per person in RSD at the time of the request. */
  pricePerPerson: number;
  /** Total price in RSD (price per person x number of students). */
  total: number;
  students: OrderStudent[];
  /** Optional promo code entered by the user. */
  promoCode?: string;
}

/** Router state used to scroll the landing page to a section after navigating back. */
export interface ScrollToSectionState {
  scrollTo?: string;
}

/** A single FAQ entry. */
export interface FaqItem {
  /** Question (accordion label). */
  question: ReactNode;
  /** Answer (accordion content). */
  answer: ReactNode;
}

/** Props for the FaqSection component. */
export interface FaqSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Questions and answers. */
  items: readonly FaqItem[];
  /** Optional extra class name. */
  className?: string;
}

/** Props for the Hero component. */
export interface HeroProps {
  /** Small uppercase label above the main title. */
  eyebrow: ReactNode;
  /** Hero description (translated text passed from the page). */
  description: ReactNode;
  /** Label of the primary call-to-action button. */
  primaryAction: ReactNode;
  /** Called when the primary button is clicked. */
  onPrimaryAction: () => void;
  /** Label of the secondary call-to-action button. */
  secondaryAction: ReactNode;
  /** Called when the secondary button is clicked. */
  onSecondaryAction: () => void;
  /** Statistics shown in a row below the hero. */
  stats: readonly TestimonialStat[];
  /** Alternative text of the hero image. */
  imageAlt: string;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the ContactSection component. */
export interface ContactSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Called when the closing call-to-action button is clicked. */
  onAction: () => void;
  /** Optional extra class name. */
  className?: string;
}

/** A message sent from the contact form. */
export interface ContactRequest {
  /** Sender name. */
  name: string;
  /** Sender email (empty when a phone number is given instead). */
  email: string;
  /** Sender phone number (empty when an email is given instead). */
  phone: string;
  /** Message text. */
  message: string;
}
