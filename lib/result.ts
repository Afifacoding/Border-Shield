import { findings, ocrFields, type Finding, type OcrField, type RiskLevel, type Screening } from './data'

export type ScreeningResult = {
  screening: Screening
  level: RiskLevel
  headline: string
  summary: string
  authenticity: number
  identityMatch: number
  watchlist: 'Clear' | 'Potential Match' | 'Match'
  findings: Finding[]
  ocr: OcrField[]
  faceScore: number
  mrzConsistent: boolean
  metadataFlags: boolean
}

export function buildResult(screening: Screening): ScreeningResult {
  if (screening.risk === 'high') {
    return {
      screening,
      level: 'high',
      headline: 'HIGH RISK',
      summary: 'Potential document tampering and identity mismatch detected.',
      authenticity: 42,
      identityMatch: 18,
      watchlist: 'Potential Match',
      findings,
      ocr: ocrFields,
      faceScore: 18,
      mrzConsistent: false,
      metadataFlags: true,
    }
  }
  if (screening.risk === 'suspicious') {
    return {
      screening,
      level: 'suspicious',
      headline: 'SUSPICIOUS',
      summary: 'Minor inconsistencies detected. Manual review recommended before clearance.',
      authenticity: 71,
      identityMatch: 88,
      watchlist: 'Clear',
      findings: findings.slice(2),
      ocr: ocrFields.map((f) => (f.field === 'Date of Birth' ? { ...f, confidence: 89, validation: 'Low confidence' } : f)),
      faceScore: 88,
      mrzConsistent: true,
      metadataFlags: true,
    }
  }
  return {
    screening,
    level: 'verified',
    headline: 'VERIFIED',
    summary: 'No tampering indicators detected. Identity matches document holder.',
    authenticity: 97,
    identityMatch: 96,
    watchlist: 'Clear',
    findings: [],
    ocr: ocrFields.map((f) => ({ ...f, confidence: Math.max(f.confidence, 95), validation: 'Valid' })),
    faceScore: 96,
    mrzConsistent: true,
    metadataFlags: false,
  }
}
