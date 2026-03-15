import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90':
              variant === 'default',
            'border border-white/20 bg-transparent hover:bg-white/10': variant === 'outline',
            'hover:bg-white/10': variant === 'ghost',
            'h-10 px-4 py-2': size === 'default',
            'h-8 px-3 text-sm': size === 'sm',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
