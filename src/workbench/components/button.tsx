// Adapted from shadcn/ui's new-york button registry. MIT, see third-party/shadcn-LICENSE.txt.
// Variant class names use the local semantic CSS contract instead of Tailwind utilities.
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('ui-button', {
  variants: {
    variant: { default:'ui-button-default', outline:'ui-button-outline', ghost:'ui-button-ghost' },
    size: { default:'ui-button-normal', sm:'ui-button-small', icon:'ui-button-icon' },
  },
  defaultVariants: { variant:'outline', size:'default' },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?:boolean }
const Button = React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,asChild=false,...props},ref)=>{
  const Comp=asChild?Slot:'button';
  return <Comp className={[buttonVariants({variant,size}),className].filter(Boolean).join(' ')} ref={ref} {...props}/>;
});
Button.displayName='Button';
export { Button, buttonVariants };
