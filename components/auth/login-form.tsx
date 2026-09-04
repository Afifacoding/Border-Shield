'use client'

import { FormEvent, useState } from 'react'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const officer = String(form.get('officer') || '').trim()
    const password = String(form.get('password') || '').trim()
    if (!officer || !password) {
      setError('Enter an Officer ID and password to continue.')
      return
    }
    localStorage.setItem('bordershield_demo_session', JSON.stringify({ officer, remember, signedInAt: new Date().toISOString() }))
    const next = new URLSearchParams(window.location.search).get('next')
    router.replace(next || '/dashboard')
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl lg:grid-cols-[1.05fr_.95fr]">
        <section className="hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
          <div>
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></span><div><p className="font-semibold">BorderShield AI</p><p className="text-[10px] uppercase tracking-[.18em] text-sidebar-foreground/55">Document Intelligence</p></div></div>
            <div className="mt-28 max-w-sm"><p className="text-xs uppercase tracking-[.18em] text-primary">Border security workstation</p><h1 className="mt-4 text-4xl font-semibold tracking-tight">Document Intelligence &amp; Verification</h1><p className="mt-5 text-sm leading-7 text-sidebar-foreground/65">A controlled workstation for document screening, forensic review, and evidence-led decisions.</p></div>
          </div>
          <p className="text-xs text-sidebar-foreground/45">Synthetic data environment</p>
        </section>
        <section className="p-6 sm:p-10">
          <div className="mb-10 flex items-center gap-3 lg:hidden"><span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></span><span className="font-semibold">BorderShield AI</span></div>
          <div className="max-w-md"><p className="text-xs font-medium uppercase tracking-[.18em] text-primary">Officer access</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Sign in to the workstation</h2><p className="mt-2 text-sm text-muted-foreground">Enter your access details to continue.</p></div>
          <form onSubmit={signIn} className="mt-8 space-y-5">
            <label className="block space-y-2 text-sm font-medium">Officer ID / Email<Input name="officer" type="text" autoComplete="username" /></label>
            <label className="block space-y-2 text-sm font-medium">Password<div className="relative"><Input name="password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" className="pr-10" /><button type="button" aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible((visible) => !visible)} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground">{passwordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />Remember me on this workstation</label>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="lg" className="w-full">Sign In</Button>
          </form>
          <p className="mt-8 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">Local prototype environment · No external authentication or government data is used.</p>
        </section>
      </div>
    </main>
  )
}
