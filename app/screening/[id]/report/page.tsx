import { ReportView } from '@/components/result/report-view'
import { getDemoResult, isDemoDatasetImage } from '@/lib/demo-data'
import { getScreening } from '@/lib/data'
import { buildResult } from '@/lib/result'

export default async function ScreeningReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const decoded = decodeURIComponent(id)
  const filename = decoded.startsWith('demo:') ? decoded.slice(5) : ''
  if (isDemoDatasetImage(filename)) {
    const demo = getDemoResult(filename)
    if (demo) return <ReportView screening={demo.screening} result={demo.result} demoFile={filename} />
  }
  const screening = getScreening(decoded)
  return <ReportView screening={screening} result={buildResult(screening)} demoFile="realpassport.png" />
}
