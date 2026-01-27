import * as React from "react"

import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <input
          type="checkbox"
          id={id}
          className={cn(
            "h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
