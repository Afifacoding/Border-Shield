'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    const applyTheme = (theme: 'light' | 'dark') => {
      root.classList.toggle('dark', theme === 'dark')
      root.classList.toggle('light', theme === 'light')
      root.style.colorScheme = theme
    }
    const stored = localStorage.getItem('border-shield-theme')
    applyTheme(stored === 'light' ? 'light' : 'dark')
    const onThemeChange = (event: Event) => applyTheme((event as CustomEvent<'light' | 'dark'>).detail)
    window.addEventListener('border-shield-theme', onThemeChange)
    return () => window.removeEventListener('border-shield-theme', onThemeChange)
  }, [])

  return children
}