import { PageHeader } from '@/components/page-header'
import { StepIndicator } from '@/components/screening/step-indicator'
import { UploadFlow } from '@/components/screening/upload-flow'

export default async function NewScreeningPage({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const { demo } = await searchParams
  return (
    <>
      <div className="flex flex-col gap-6">
        <StepIndicator current={1} />
        <PageHeader title="New Document Screening" description="Upload a document to begin authenticity and identity analysis." />
      </div>
      <UploadFlow initialDemo={demo} />
    </>
  )
}
