import * as React from "react"
import { cn } from "@/lib/utils"

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "variant"
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClass = variant === "variant" ? "gradient-button-variant" : ""

    return (
      <button
        className={cn(
          "gradient-button",
          "inline-flex items-center justify-center",
          "rounded-[11px] min-w-[132px] px-9 py-4",
          "text-base leading-[19px] font-[500] text-white",
          "font-sans font-bold",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClass,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton }
