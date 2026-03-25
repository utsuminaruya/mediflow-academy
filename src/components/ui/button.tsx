'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[#0066CC] text-white hover:bg-[#0052A3] focus:ring-[#0066CC] shadow-sm hover:shadow-md',
        secondary:
          'bg-[#00B894] text-white hover:bg-[#009974] focus:ring-[#00B894] shadow-sm hover:shadow-md',
        accent:
          'bg-[#FF6B6B] text-white hover:bg-[#E55555] focus:ring-[#FF6B6B] shadow-sm hover:shadow-md',
        outline:
          'border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white focus:ring-[#0066CC]',
        ghost:
          'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300',
        danger:
          'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        link:
          'text-[#0066CC] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 h-8',
        md: 'text-base px-4 py-2 h-10',
        lg: 'text-lg px-6 py-3 h-12',
        xl: 'text-xl px-8 py-4 h-14',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
