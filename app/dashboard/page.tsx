import { Plus } from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { PageHeader } from '@/components/page-header'
import { KpiRow } from '@/components/dashboard/kpi-row'
import { StartScreeningPanel } from '@/components/dashboard/start-screening-panel'
import { RecentScreenings } from '@/components/dashboard/recent-screenings'
import { SecurityAlerts } from '@/components/dashboard/security-alerts'
import { SystemStatus } from '@/components/dashboard/system-status'

export default function DashboardPage() {
  return <><PageHeader title="Good morning, Officer" description="Review document screening activity and begin a new controlled screening." actions={<LinkButton href="/screening/new"><Plus data-icon="inline-start" />New Screening</LinkButton>} /><KpiRow /><StartScreeningPanel /><div className="grid gap-8 lg:grid-cols-2"><RecentScreenings /><SecurityAlerts /></div><SystemStatus /></>
}
