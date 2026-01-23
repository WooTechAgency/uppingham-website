import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white';
export type ButtonSize = 'sm' | 'lg';

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
  'relative inline-flex items-center justify-center gap-[10px] font-tt-norms font-[450] transition-colors box-border' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary text-white border border-[2px] border-secondary hover:bg-transparent hover:text-primary hover:border-primary focus-visible:ring-neutral-900',
  secondary:
    'bg-secondary text-white border border-[2px] border-secondary hover:bg-transparent hover:text-white hover:border-white focus-visible:ring-neutral-900',
  outline:
    'border border-[2px] bg-transparent border-white text-white hover:bg-white hover:text-primary focus-visible:ring-neutral-400',
  white:
    'bg-white text-primary border border-[2px] border-white hover:bg-transparent hover:text-white hover:border-white focus-visible:ring-neutral-900',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[50px] py-[10px] px-[24px] text-base leading-[30px]',
  lg: 'h-[70px] py-[10px] px-[24px] text-xl leading-[30px]',
};

export function Button({
  href,
  variant = 'primary',
  size = 'lg',
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
    className,
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
