import { PropsWithChildren, ReactNode } from 'react';

export interface PageLayoutProps extends PropsWithChildren {
  title: string;
  sections?: PageLayoutSectionProps[];
}

export interface PageLayoutSectionProps {
  sectionPath: string;
  pagePath: string;
  icon: ReactNode;
  label?: string;
}
