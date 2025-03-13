import * as React from "react"
import { cn } from "@/lib/utils"
import * as RadixPopover from "@radix-ui/react-popover"

const Popover = RadixPopover.Root

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixPopover.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </RadixPopover.Trigger>
))
PopoverTrigger.displayName = RadixPopover.Trigger.displayName

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  </RadixPopover.Portal>
))
PopoverContent.displayName = RadixPopover.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

