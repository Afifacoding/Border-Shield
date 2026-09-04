'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Search, ChevronRight, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { navGroups } from './app-sidebar'

function resolveTitle(pathname: string): { title: string; crumb?: string } {
  if (pathname === '/' || pathname === '/login') return { title: 'Sign In' }
  if (pathname === '/dashboard') return { title: 'Dashboard' }
  if (pathname === '/screening/analyze') return { title: 'Analysis', crumb: 'Screening' }
  if (pathname.startsWith('/screening/demo:') || /^\/screening\/SCR-/.test(pathname)) return { title: 'Screening Result', crumb: 'Screening' }
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.href !== '/' && pathname.startsWith(item.href)) {
        return { title: item.title, crumb: group.label }
      }
    }
  }
  return { title: 'BorderShield AI' }
}

export function AppHeader() {
  const pathname = usePathname()
  const { title, crumb } = resolveTitle(pathname)
  const [profileOpen, setProfileOpen] = useState(false)
  const logout = () => { localStorage.removeItem('bordershield_demo_session'); window.location.href = '/login' }

  return (
    <header className="sticky top-0 z-20 flex h-14 min-w-0 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur-sm sm:gap-3 sm:px-4 md:px-8">
      <SidebarTrigger className="-ml-1 text-muted-foreground" />
      <Separator orientation="vertical" className="h-4" />
      <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
        {crumb ? (
          <>
            <span className="hidden text-muted-foreground sm:inline">{crumb}</span>
            <ChevronRight className="hidden size-3.5 text-muted-foreground/60 sm:inline" aria-hidden />
          </>
        ) : null}
        <span className="truncate font-medium">{title}</span>
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Open screening history" onClick={() => { window.location.href = '/screening/history' }} />}>
            <Search />
          </TooltipTrigger>
          <TooltipContent>Search</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications, 2 unread"
                className="relative"
                nativeButton={false}
                render={<Link href="/alerts" />}
              />
            }
          >
            <Bell />
            <span aria-hidden className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
          </TooltipTrigger>
          <TooltipContent>2 open alerts</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-2 h-4" />

        <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex" aria-live="polite">
          <span aria-hidden className="size-1.5 rounded-full bg-success" />
          Connected
        </div>

        <div className="relative ml-2">
          <Button variant="ghost" size="icon" aria-label="Open officer menu" onClick={() => setProfileOpen((open) => !open)}>
            <Avatar className="size-8"><AvatarFallback className="bg-secondary text-xs font-medium text-secondary-foreground">DO</AvatarFallback></Avatar>
          </Button>
          {profileOpen && <div className="absolute top-11 right-0 z-30 w-52 rounded-lg border border-border bg-popover p-2 shadow-xl"><p className="px-3 py-2 text-xs text-muted-foreground">Demo Officer</p><Link href="/settings" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"><Settings className="size-4" />Settings</Link><button onClick={logout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"><LogOut className="size-4" />Logout</button></div>}
        </div>
      </div>
    </header>
  )
}
