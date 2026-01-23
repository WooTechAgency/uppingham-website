'use client';
import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  id: string;
  label: string;
  options: SelectOption[];
  className?: string;
  selectClassName?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function Select({
  id,
  label,
  options,
  className,
  selectClassName,
  defaultValue = '',
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current || rootRef.current.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className={cn(
          'h-[70px] w-[157px] border border-dark-stone bg-white px-4 pr-10',
          'text-[20px] font-[450] leading-normal text-primary text-left',
          'transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40',
          'hover:border-secondary/60',
          selectClassName,
        )}
      >
        <span className={cn(!selectedOption && 'text-primary/60')}>
          {selectedOption?.label ?? label}
        </span>
      </button>
      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="13"
          viewBox="0 0 22 13"
          fill="none"
        >
          <path
            d="M20.707 0.707032L10.707 10.707L0.707031 0.707031"
            stroke="#E13246"
            strokeWidth="2"
          />
        </svg>
      </span>

      {isOpen ? (
        <div
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 top-[calc(100%+8px)] z-20 w-full rounded-[10px] border border-dark-stone bg-white py-2 shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
        >
          <div className="max-h-[240px] overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'flex w-full items-center justify-start px-4 py-2 text-left text-[16px] font-[450] text-primary',
                    isSelected && 'text-secondary',
                    'hover:bg-stone',
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
