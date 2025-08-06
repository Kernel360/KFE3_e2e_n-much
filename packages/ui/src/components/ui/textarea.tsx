import * as React from 'react';

import { cn } from '@repo/ui/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-(--color-accent) focus-visible:ring-(--color-accent)/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content shadow-xs flex min-h-20 w-full resize-none rounded-md border bg-white px-3 py-2.5 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[1px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-white',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
