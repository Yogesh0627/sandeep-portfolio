'use client'

import { Toaster as SonnerToaster } from 'sonner'
import { useTheme } from './theme-provider'

/** Sonner toaster synced to our class-based dark mode + accent tokens. */
export function Toaster() {
  const { mode } = useTheme()
  return (
    <SonnerToaster
      theme={mode}
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: 'var(--font-sans)',
        },
      }}
    />
  )
}
