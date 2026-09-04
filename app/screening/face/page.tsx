import { FaceVerification } from '@/components/screening/face-verification'
import Link from 'next/link'

export default async function FaceVerificationPage({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const { demo } = await searchParams
  if (!demo) return <p className="text-sm text-muted-foreground">Select a controlled document from <Link href="/screening/new" className="text-primary underline">New Screening</Link> to begin face verification.</p>
  return <FaceVerification demoFile={demo} />
}
