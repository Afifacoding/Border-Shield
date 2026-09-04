'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { AppSidebar } from './app-sidebar'
import { AppHeader } from './app-header'
import { AuthGate } from '@/components/auth/auth-gate'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const publicPath = pathname === '/' || pathname === '/login'
  return <AuthGate>{publicPath ? children : <ShellContent>{children}</ShellContent>}</AuthGate>
}

function ShellContent({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-background">
        <AppHeader />
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          <div className="page-enter mx-auto flex w-full max-w-[1280px] flex-col gap-8">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
