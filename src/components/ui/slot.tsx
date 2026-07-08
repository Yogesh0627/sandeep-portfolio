import * as React from 'react'

/**
 * Minimal Slot: merges its props/className onto a single child element.
 * Lightweight stand-in for @radix-ui/react-slot to support `asChild`.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) return null
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      ref,
      className: [props.className, child.props.className].filter(Boolean).join(' '),
    })
  }
)
Slot.displayName = 'Slot'
