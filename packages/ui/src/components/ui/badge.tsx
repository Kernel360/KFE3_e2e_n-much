import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/ui/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        //기본 variants
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',

        //상태별 variants
        accent: 'bg-(--color-accent) text-white font-semibold border border-transparent',
        yellow: 'bg-(--color-yellow) text-white font-semibold border border-transparent',
        red: 'bg-(--color-red) text-white font-semibold border border-transparent',
        green: 'bg-(--color-green) text-white font-semibold border border-transparent',
        lightGray: 'bg-(--color-light-gray) text-white font-semibold border border-transparent',
        primary: 'bg-(--color-primary) text-white font-semibold border border-transparent',
        secondary: 'bg-(--color-secondary) text-white font-semibold border border-transparent',

        // ✅ 의미 기반 alias 추가
        success: 'bg-(--color-green) text-white font-semibold border border-transparent', // = green
        error: 'bg-(--color-red) text-white font-semibold border border-transparent', // = red
        info: 'bg-(--color-primary) text-white font-semibold border border-transparent', // = primary
        muted: 'bg-(--color-light-gray) text-white font-semibold border border-transparent' // = lightGray
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
