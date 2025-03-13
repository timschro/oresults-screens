"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Command } from "@/components/ui/command"

import { ChevronsUpDown } from "lucide-react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, onChange, onValueChange, ...props }, ref) => (
    <select
      ref={ref}
      onChange={(e) => {
        onChange?.(e)
        onValueChange?.(e.target.value)
      }}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
)
Select.displayName = "Select"

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, children, ...props }, ref) => (
    <option
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </option>
  ),
)
SelectItem.displayName = "SelectItem"

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof PopoverTrigger>
>(({ className, children, ...props }, ref) => (
  <PopoverTrigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  </PopoverTrigger>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ className, children, ...props }, ref) => (
  <PopoverContent
    ref={ref}
    className={cn(
      "w-[var(--radix-select-trigger-width)] z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className,
    )}
    {...props}
  >
    <Command>{children}</Command>
  </PopoverContent>
))
SelectContent.displayName = "SelectContent"

const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn("line-clamp-1", className)} {...props}>
      {children}
    </span>
  ),
)
SelectValue.displayName = "SelectValue"

export { Select, SelectItem, SelectContent, SelectTrigger, SelectValue }

