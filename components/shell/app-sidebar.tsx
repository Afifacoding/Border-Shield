'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ScanLine,
  History,
  Network,
  ListChecks,
  Bell,
  BarChart3,
  Link2,
  FileText,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export const navGroups = [
  {
    label: 'Core',
    items: [{ title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Screening',
    items: [
      { title: 'New Screening', href: '/screening/new', icon: ScanLine },
      { title: 'History', href: '/screening/history', icon: History },
    ],
  },
  {
    label: 'Operations',
    items: [
      { title: 'Identity Intelligence', href: '/intelligence', icon: Network },
      { title: 'Watchlist', href: '/watchlist', icon: ListChecks },
      { title: 'Alerts', href: '/alerts', icon: Bell },
      { title: 'Analytics', href: '/analytics', icon: BarChart3 },
      { title: 'Blockchain Audit', href: '/audit', icon: Link2 },
      { title: 'Reports', href: '/reports', icon: FileText },
      { title: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

export function isActivePath(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/dashboard'
  if (href === '/screening/new') return pathname.startsWith('/screening') && !pathname.startsWith('/screening/history')
  return pathname.startsWith(href)
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <Link href="/dashboard" className="flex items-center gap-2.5 rounded-md px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="size-4" />
          </span>
          <span className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">BorderShield AI</span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.14em] text-sidebar-foreground/55">DOCUMENT INTELLIGENCE</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-1 pt-2">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-1">
            <SidebarGroupLabel className="text-[10px] font-medium tracking-[0.14em] uppercase text-sidebar-foreground/45">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActivePath(pathname, item.href)
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.title}
                        render={<Link href={item.href} />}
                        className="h-9 text-sidebar-foreground/80 data-active:text-sidebar-accent-foreground"
                      >
                        <item.icon className={active ? 'text-primary' : undefined} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-4 pb-4 group-data-[collapsible=icon]:hidden">
        <p className="text-[11px] leading-relaxed text-sidebar-foreground/45">
          Checkpoint Node 02 · v4.2.1
          <br />
          Synthetic screening data
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
