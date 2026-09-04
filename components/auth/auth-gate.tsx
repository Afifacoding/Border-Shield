'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const publicPath = pathname === '/' || pathname === '/login'

  useEffect(() => {
    const signedIn = Boolean(localStorage.getItem('bordershield_demo_session'))
    if (!signedIn && !publicPath) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
      return
    }
    if (signedIn && publicPath) {
      router.replace('/dashboard')
      return
    }
    setReady(true)
  }, [pathname, publicPath, router])

  if (!ready && !publicPath) return null
  return <>{children}</>
}
