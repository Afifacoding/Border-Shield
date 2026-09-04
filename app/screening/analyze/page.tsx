import { PageHeader } from '@/components/page-header'
import { StepIndicator } from '@/components/screening/step-indicator'
import { AnalysisView } from '@/components/screening/analysis-view'

export default async function AnalyzePage({ searchParams }: { searchParams: Promise<{ case?: string; demo?: string }> }) {
  const { case: caseId, demo: demoFile } = await searchParams
  return (
    <>
      <div className="flex flex-col gap-6">
        <StepIndicator current={2} />
        <PageHeader title="Analyzing Document" description="BorderShield AI is examining the submitted document." />
      </div>
      <AnalysisView caseId={caseId ?? 'tampered'} demoFile={demoFile} />
    </>
  )
}
