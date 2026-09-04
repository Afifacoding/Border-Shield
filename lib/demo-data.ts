import type { ScreeningResult } from '@/lib/result'
import type { Screening, RiskLevel } from '@/lib/data'

// Demo dataset image mapping to screening results
export type DemoImageType = 'realpassport' | 'fakepassport' | 'realvisa' | 'fakevisa'

export const DEMO_DATASET = {
  'realpassport.png': {
    id: 'realpassport',
    screening: {
      id: 'DEMO-RP-001',
      traveler: 'DEMO - Real Passport',
      documentType: 'Passport',
      documentNumber: 'G9850821',
      nationality: 'India',
      checkpoint: 'Demo Terminal · Lane 1',
      officer: 'Demo Officer',
      time: 'now',
      risk: 'verified' as RiskLevel,
      score: 8,
    },
    result: {
      level: 'verified' as RiskLevel,
      headline: 'VERIFIED',
      summary: 'Document authenticity confirmed. No indicators of tampering detected.',
      authenticity: 98,
      identityMatch: 97,
      watchlist: 'Clear' as const,
      faceScore: 96,
      mrzConsistent: true,
      metadataFlags: false,
      findings: [],
      ocr: [
        { field: 'Document Type', value: 'PASSPORT', confidence: 99, validation: 'Valid' },
        { field: 'Country Code', value: 'IND', confidence: 99, validation: 'Valid' },
        { field: 'Passport Number', value: 'G9850821', confidence: 98, validation: 'Valid' },
        { field: 'Full Name', value: 'DEMO HOLDER', confidence: 97, validation: 'Valid' },
        { field: 'Date of Birth', value: '01 JAN 1990', confidence: 96, validation: 'Valid' },
        { field: 'Date of Expiry', value: '31 DEC 2030', confidence: 97, validation: 'Valid' },
      ],
    },
  },
  'fakepassport.png': {
    id: 'fakepassport',
    screening: {
      id: 'DEMO-FP-001',
      traveler: 'DEMO - Fake Passport',
      documentType: 'Passport',
      documentNumber: 'F4521890',
      nationality: 'India',
      checkpoint: 'Demo Terminal · Lane 2',
      officer: 'Demo Officer',
      time: 'now',
      risk: 'high' as RiskLevel,
      score: 91,
    },
    result: {
      level: 'high' as RiskLevel,
      headline: 'HIGH RISK',
      summary: 'Multiple indicators of document tampering detected. Recommend escalation for secondary inspection.',
      authenticity: 18,
      identityMatch: 22,
      watchlist: 'Potential Match' as const,
      faceScore: 31,
      mrzConsistent: false,
      metadataFlags: true,
      findings: [
        {
          id: 'portrait',
          severity: 'high',
          title: 'Portrait Region Anomaly',
          confidence: 94,
          summary: 'Visual inconsistency detected in portrait area. Compression patterns inconsistent with laminate.',
          evidence: [
            'JPEG quantization discrepancy detected',
            'Edge artifacts indicate composite operation',
            'Noise pattern variance 3.2x expected',
          ],
          region: { x: 6, y: 22, w: 26, h: 48 },
        },
        {
          id: 'text',
          severity: 'high',
          title: 'Text/Date Inconsistency',
          confidence: 91,
          summary: 'Document field dates show inconsistency with visual inspection zone.',
          evidence: ['MRZ date differs from visual date field', 'Font weight variance detected', 'Baseline offset on DOB field'],
          region: { x: 38, y: 46, w: 30, h: 8 },
        },
        {
          id: 'mrz',
          severity: 'high',
          title: 'MRZ Data Consistency Warning',
          confidence: 88,
          summary: 'Check digit validation failed in machine readable zone.',
          evidence: ['Composite check digit mismatch', 'Optional data field irregular format'],
          region: { x: 4, y: 78, w: 92, h: 16 },
        },
        {
          id: 'structure',
          severity: 'high',
          title: 'Document Structure Anomaly',
          confidence: 85,
          summary: 'Document structure shows suspicious formatting patterns.',
          evidence: ['Security feature layout inconsistent', 'Print quality degradation detected'],
          region: { x: 0, y: 0, w: 100, h: 100 },
        },
      ],
      ocr: [
        { field: 'Document Type', value: 'PASSPORT', confidence: 72, validation: 'Valid' },
        { field: 'Country Code', value: 'IND', confidence: 65, validation: 'Mismatch' },
        { field: 'Passport Number', value: 'F4521890', confidence: 58, validation: 'Mismatch' },
        { field: 'Full Name', value: 'DEMO ALTERED', confidence: 68, validation: 'Mismatch' },
        { field: 'Date of Birth', value: '15 MAR 1992', confidence: 71, validation: 'Low confidence' },
        { field: 'Date of Expiry', value: '20 AUG 2025', confidence: 55, validation: 'Mismatch' },
      ],
    },
  },
  'realvisa.png': {
    id: 'realvisa',
    screening: {
      id: 'DEMO-RV-001',
      traveler: 'DEMO - Real Visa',
      documentType: 'Visa',
      documentNumber: 'V-IND-8822456',
      nationality: 'India',
      checkpoint: 'Demo Terminal · Lane 3',
      officer: 'Demo Officer',
      time: 'now',
      risk: 'verified' as RiskLevel,
      score: 10,
    },
    result: {
      level: 'verified' as RiskLevel,
      headline: 'VERIFIED',
      summary: 'Visa document authenticity confirmed. All validation checks passed.',
      authenticity: 97,
      identityMatch: 98,
      watchlist: 'Clear' as const,
      faceScore: 95,
      mrzConsistent: true,
      metadataFlags: false,
      findings: [],
      ocr: [
        { field: 'Visa Type', value: 'TOURIST VISA', confidence: 99, validation: 'Valid' },
        { field: 'Full Name', value: 'DEMO VISA HOLDER', confidence: 98, validation: 'Valid' },
        { field: 'Passport Number', value: 'G9850821', confidence: 99, validation: 'Valid' },
        { field: 'Date of Issue', value: '15 JAN 2024', confidence: 97, validation: 'Valid' },
        { field: 'Date of Expiry', value: '14 JAN 2029', confidence: 97, validation: 'Valid' },
        { field: 'Number of Entries', value: 'Multiple', confidence: 96, validation: 'Valid' },
      ],
    },
  },
  'fakevisa.png': {
    id: 'fakevisa',
    screening: {
      id: 'DEMO-FV-001',
      traveler: 'DEMO - Fake Visa',
      documentType: 'Visa',
      documentNumber: 'V-FAKE-123456',
      nationality: 'India',
      checkpoint: 'Demo Terminal · Lane 4',
      officer: 'Demo Officer',
      time: 'now',
      risk: 'high' as RiskLevel,
      score: 86,
    },
    result: {
      level: 'high' as RiskLevel,
      headline: 'HIGH RISK',
      summary: 'Visa document shows multiple indicators of forgery. Recommend immediate escalation.',
      authenticity: 24,
      identityMatch: 35,
      watchlist: 'Potential Match' as const,
      faceScore: 42,
      mrzConsistent: false,
      metadataFlags: true,
      findings: [
        {
          id: 'date',
          severity: 'high',
          title: 'Visa Date Region Inconsistency',
          confidence: 93,
          summary: 'Issue and expiry dates show inconsistent formatting and placement.',
          evidence: [
            'Date field misalignment detected',
            'Font inconsistency in date stamps',
            'Printing defect pattern identified',
          ],
          region: { x: 60, y: 35, w: 35, h: 12 },
        },
        {
          id: 'portrait',
          severity: 'high',
          title: 'Portrait Region Anomaly',
          confidence: 89,
          summary: 'Visa photo shows visual inconsistencies consistent with replacement.',
          evidence: ['Photo lamination edge artifacts', 'Compression pattern variance', 'Lighting inconsistency'],
          region: { x: 8, y: 8, w: 18, h: 22 },
        },
        {
          id: 'security',
          severity: 'high',
          title: 'Security Pattern Inconsistency',
          confidence: 87,
          summary: 'Document security features show suspicious formatting.',
          evidence: [
            'Security thread pattern disrupted',
            'Watermark placement irregular',
            'Hologram reflection inconsistent',
          ],
          region: { x: 20, y: 20, w: 60, h: 60 },
        },
        {
          id: 'fields',
          severity: 'high',
          title: 'Cross-Field Validation Warning',
          confidence: 84,
          summary: 'Document fields contain inconsistent or conflicting information.',
          evidence: ['Name field transcription error', 'Nationality code mismatch', 'Passport number format invalid'],
          region: { x: 25, y: 50, w: 50, h: 25 },
        },
      ],
      ocr: [
        { field: 'Visa Type', value: 'BUSINESS VISA', confidence: 61, validation: 'Valid' },
        { field: 'Full Name', value: 'DEMO FORGED', confidence: 54, validation: 'Mismatch' },
        { field: 'Passport Number', value: 'X-INVALID-123', confidence: 48, validation: 'Mismatch' },
        { field: 'Date of Issue', value: '20 JUL 2023', confidence: 59, validation: 'Low confidence' },
        { field: 'Date of Expiry', value: '19 JUL 2024', confidence: 52, validation: 'Mismatch' },
        { field: 'Number of Entries', value: 'Single', confidence: 63, validation: 'Valid' },
      ],
    },
  },
} as const

export const demoDocuments = [
  { filename: 'realpassport.png', label: 'Real Passport', classification: 'VERIFIED', type: 'Passport' },
  { filename: 'fakepassport.png', label: 'Fake Passport', classification: 'HIGH RISK', type: 'Passport' },
  { filename: 'realvisa.png', label: 'Real Visa', classification: 'VERIFIED', type: 'Visa' },
  { filename: 'fakevisa.png', label: 'Fake Visa', classification: 'HIGH RISK', type: 'Visa' },
] as const

export function getDemoCase(filename: string) {
  const data = DEMO_DATASET[filename as keyof typeof DEMO_DATASET]
  return data ? { ...data, image: `/dataset/${filename}` } : null
}

export function getDemoResult(filename: string): { screening: Screening; result: ScreeningResult } | null {
  const demoKey = Object.keys(DEMO_DATASET).find((key) => key === filename)
  if (!demoKey) return null
  const data = DEMO_DATASET[demoKey as keyof typeof DEMO_DATASET]
  return {
    screening: data.screening,
    result: {
      screening: data.screening,
      ...data.result,
    } as unknown as ScreeningResult,
  }
}

export function isDemoDatasetImage(filename: string): boolean {
  return filename in DEMO_DATASET
}
