import * as React from 'react';

import { cn } from '@repo/ui/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground border-input shadow-xs flex h-auto w-full min-w-0 rounded-md border bg-white px-3 py-2.5 text-base outline-none transition-[color,box-shadow] selection:bg-blue-100 selection:text-blue-900 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-white',
        'focus-visible:border-(--color-accent) focus-visible:ring-(--color-accent)/50 focus-visible:ring-[1px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };
