import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
};

const base =
  'relative inline-flex items-center justify-center gap-2 font-medium transition min-w-[300px] h-[70px]' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary text-white border border-secondary hover:bg-transparent hover:text-primary hover:border-primary focus-visible:ring-neutral-900',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-400',
  outline:
    'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:ring-neutral-400',
  ghost:
    'bg-transparent text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-400',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[50px] px-3 text-sm',
  md: 'h-[70px] px-4 text-sm',
  lg: 'h-[70px] px-6 text-base',
};

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span className={cn(isLoading && 'opacity-0')}>{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      {isLoading ? (
        <span
          aria-hidden="true"
          className="absolute inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled || isLoading}
        tabIndex={disabled || isLoading ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      type="button"
      {...props}
    >
      {content}
    </button>
  );
}
