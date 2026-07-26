import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card = ({ children, className, glass = false }: CardProps) => {
  return (
    <div className={clsx(styles.card, glass && 'glass', className)}>
      {children}
    </div>
  );
};
