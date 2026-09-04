export type RiskLevel = 'verified' | 'suspicious' | 'high'

export const riskLabel: Record<RiskLevel, string> = {
  verified: 'Verified',
  suspicious: 'Suspicious',
  high: 'High Risk',
}

export type Screening = {
  id: string
  traveler: string
  documentType: 'Passport' | 'Visa' | 'ID Card' | 'Travel Document'
  documentNumber: string
  nationality: string
  checkpoint: string
  officer: string
  time: string
  risk: RiskLevel
  score: number
}

export const screenings: Screening[] = [
  { id: 'SCR-24871', traveler: 'Marcus Okonkwo', documentType: 'Passport', documentNumber: 'P<UTO7841203', nationality: 'Utopia', checkpoint: 'Terminal 2 · Lane 4', officer: 'A. Reyes', time: '2 min ago', risk: 'high', score: 87 },
  { id: 'SCR-24870', traveler: 'Elena Varga', documentType: 'Passport', documentNumber: 'P<HUN3320145', nationality: 'Hungary', checkpoint: 'Terminal 2 · Lane 1', officer: 'A. Reyes', time: '9 min ago', risk: 'verified', score: 6 },
  { id: 'SCR-24869', traveler: 'Daniel Achterberg', documentType: 'ID Card', documentNumber: 'ID-NLD-88214', nationality: 'Netherlands', checkpoint: 'Terminal 1 · Lane 7', officer: 'K. Osei', time: '14 min ago', risk: 'verified', score: 4 },
  { id: 'SCR-24868', traveler: 'Priya Natarajan', documentType: 'Visa', documentNumber: 'V-IND-5502931', nationality: 'India', checkpoint: 'Terminal 2 · Lane 4', officer: 'A. Reyes', time: '21 min ago', risk: 'suspicious', score: 48 },
  { id: 'SCR-24867', traveler: 'Tomas Lindqvist', documentType: 'Passport', documentNumber: 'P<SWE9001172', nationality: 'Sweden', checkpoint: 'Terminal 1 · Lane 2', officer: 'M. Duarte', time: '33 min ago', risk: 'verified', score: 3 },
  { id: 'SCR-24866', traveler: 'Yusuf Demir', documentType: 'Passport', documentNumber: 'P<TUR4471120', nationality: 'Türkiye', checkpoint: 'Terminal 1 · Lane 5', officer: 'K. Osei', time: '41 min ago', risk: 'suspicious', score: 57 },
  { id: 'SCR-24865', traveler: 'Chloé Marchand', documentType: 'ID Card', documentNumber: 'ID-FRA-20318', nationality: 'France', checkpoint: 'Terminal 2 · Lane 3', officer: 'M. Duarte', time: '52 min ago', risk: 'verified', score: 5 },
  { id: 'SCR-24864', traveler: 'Ivan Petrov', documentType: 'Travel Document', documentNumber: 'TD-7788123', nationality: 'Stateless', checkpoint: 'Terminal 1 · Lane 7', officer: 'K. Osei', time: '1 h ago', risk: 'high', score: 79 },
  { id: 'SCR-24863', traveler: 'Aisha Bello', documentType: 'Passport', documentNumber: 'P<NGA1120993', nationality: 'Nigeria', checkpoint: 'Terminal 2 · Lane 1', officer: 'A. Reyes', time: '1 h ago', risk: 'verified', score: 8 },
  { id: 'SCR-24862', traveler: 'Hiroshi Tanaka', documentType: 'Passport', documentNumber: 'P<JPN6620114', nationality: 'Japan', checkpoint: 'Terminal 1 · Lane 2', officer: 'M. Duarte', time: '2 h ago', risk: 'verified', score: 2 },
  { id: 'SCR-24861', traveler: 'Sofia Reyes', documentType: 'Visa', documentNumber: 'V-MEX-3391027', nationality: 'Mexico', checkpoint: 'Terminal 2 · Lane 4', officer: 'A. Reyes', time: '2 h ago', risk: 'suspicious', score: 44 },
  { id: 'SCR-24860', traveler: 'Omar Haddad', documentType: 'Passport', documentNumber: 'P<LBN2201936', nationality: 'Lebanon', checkpoint: 'Terminal 1 · Lane 5', officer: 'K. Osei', time: '3 h ago', risk: 'high', score: 91 },
]

export type Alert = {
  id: string
  severity: RiskLevel
  reason: string
  screeningId: string
  time: string
  checkpoint: string
  status: 'Open' | 'Acknowledged' | 'Resolved'
}

export const alerts: Alert[] = [
  { id: 'ALT-1093', severity: 'high', reason: 'Photo replacement and face mismatch', screeningId: 'SCR-24871', time: '2 min ago', checkpoint: 'Terminal 2 · Lane 4', status: 'Open' },
  { id: 'ALT-1092', severity: 'high', reason: 'Potential watchlist match', screeningId: 'SCR-24871', time: '2 min ago', checkpoint: 'Terminal 2 · Lane 4', status: 'Open' },
  { id: 'ALT-1091', severity: 'suspicious', reason: 'Visa issue date after entry stamp', screeningId: 'SCR-24868', time: '21 min ago', checkpoint: 'Terminal 2 · Lane 4', status: 'Acknowledged' },
  { id: 'ALT-1090', severity: 'suspicious', reason: 'MRZ check digit failure', screeningId: 'SCR-24866', time: '41 min ago', checkpoint: 'Terminal 1 · Lane 5', status: 'Open' },
  { id: 'ALT-1089', severity: 'high', reason: 'Document listed as stolen blank', screeningId: 'SCR-24864', time: '1 h ago', checkpoint: 'Terminal 1 · Lane 7', status: 'Acknowledged' },
  { id: 'ALT-1088', severity: 'suspicious', reason: 'Editing software detected in metadata', screeningId: 'SCR-24861', time: '2 h ago', checkpoint: 'Terminal 2 · Lane 4', status: 'Resolved' },
  { id: 'ALT-1087', severity: 'high', reason: 'Duplicate identity across two passports', screeningId: 'SCR-24860', time: '3 h ago', checkpoint: 'Terminal 1 · Lane 5', status: 'Resolved' },
]

export type Finding = {
  id: string
  severity: 'high' | 'suspicious'
  title: string
  confidence: number
  summary: string
  evidence: string[]
  region: { x: number; y: number; w: number; h: number }
}

export const findings: Finding[] = [
  {
    id: 'photo',
    severity: 'high',
    title: 'Photo replacement detected',
    confidence: 94,
    summary: 'The portrait region shows compression and noise patterns inconsistent with the surrounding laminate. Edge artefacts indicate the photo was composited after printing.',
    evidence: ['Error Level Analysis: 3.8x local deviation around portrait boundary', 'JPEG quantisation tables differ between portrait and background', 'Security laminate pattern discontinuous at photo edge', 'Face embedding distance to live capture: 0.71 (threshold 0.42)'],
    region: { x: 6, y: 22, w: 26, h: 48 },
  },
  {
    id: 'mrz',
    severity: 'high',
    title: 'MRZ inconsistency',
    confidence: 91,
    summary: 'The composite check digit in the second MRZ line does not validate. Date of birth in the MRZ disagrees with the visual inspection zone.',
    evidence: ['Composite check digit expected 7, read 3', 'MRZ DOB 850312 vs VIZ 12 MAR 1988', 'Optional data field contains non-standard filler characters'],
    region: { x: 4, y: 78, w: 92, h: 16 },
  },
  {
    id: 'typography',
    severity: 'suspicious',
    title: 'Typography anomaly',
    confidence: 86,
    summary: 'The date of birth field uses a glyph weight and baseline offset that differs from adjacent personalised fields.',
    evidence: ['Stroke width variance 18% vs 3% on other fields', 'Baseline offset of 0.6px on DOB characters', 'Font hinting inconsistent with OCR-B reference'],
    region: { x: 38, y: 46, w: 30, h: 8 },
  },
  {
    id: 'metadata',
    severity: 'suspicious',
    title: 'Metadata anomaly',
    confidence: 74,
    summary: 'File metadata references image editing software and a modification timestamp after the declared capture time.',
    evidence: ['Software tag: Adobe Photoshop 25.2', 'Modify date 14 minutes after capture date', 'Two embedded thumbnail generations present'],
    region: { x: 0, y: 0, w: 0, h: 0 },
  },
]

export type OcrField = {
  field: string
  value: string
  confidence: number
  validation: 'Valid' | 'Mismatch' | 'Low confidence'
}

export const ocrFields: OcrField[] = [
  { field: 'Name', value: 'OKONKWO, MARCUS ADEBAYO', confidence: 98, validation: 'Valid' },
  { field: 'Document Number', value: 'UTO7841203', confidence: 97, validation: 'Valid' },
  { field: 'Nationality', value: 'UTOPIAN', confidence: 99, validation: 'Valid' },
  { field: 'Date of Birth', value: '12 MAR 1988', confidence: 71, validation: 'Mismatch' },
  { field: 'Issue Date', value: '04 JUN 2019', confidence: 96, validation: 'Valid' },
  { field: 'Expiry Date', value: '03 JUN 2029', confidence: 96, validation: 'Valid' },
]

export const mrz = {
  lines: ['P<UTOOKONKWO<<MARCUS<ADEBAYO<<<<<<<<<<<<<<<<', 'UTO78412034UTO8503121M2906035<<<<<<<<<<<<<<03'],
  parsed: [
    { label: 'Document type', value: 'P (Passport)' },
    { label: 'Issuing state', value: 'UTO' },
    { label: 'Surname', value: 'OKONKWO' },
    { label: 'Given names', value: 'MARCUS ADEBAYO' },
    { label: 'Document number', value: 'UTO784120' },
    { label: 'Nationality', value: 'UTO' },
    { label: 'Date of birth', value: '1985-03-12' },
    { label: 'Sex', value: 'M' },
    { label: 'Expiry', value: '2029-06-03' },
  ],
  checkDigits: [
    { label: 'Document number', expected: 4, read: 4, ok: true },
    { label: 'Date of birth', expected: 1, read: 1, ok: true },
    { label: 'Expiry date', expected: 5, read: 5, ok: true },
    { label: 'Optional data', expected: 0, read: 0, ok: true },
    { label: 'Composite', expected: 7, read: 3, ok: false },
  ],
}

export const metadata = [
  { label: 'EXIF', value: 'Present (partial)', flag: false },
  { label: 'Software', value: 'Adobe Photoshop 25.2', flag: true },
  { label: 'Capture timestamp', value: '2026-09-04 08:12:41', flag: false },
  { label: 'Modify timestamp', value: '2026-09-04 08:26:09', flag: true },
  { label: 'Compression', value: 'JPEG q=88, double-compressed', flag: true },
  { label: 'Editing indicators', value: '2 thumbnail generations', flag: true },
]

export type WatchlistEntry = {
  id: string
  name: string
  documentNumber: string
  nationality: string
  reason: string
  source: string
  added: string
  category: 'blacklisted' | 'suspicious' | 'expired' | 'duplicate'
}

export const watchlist: WatchlistEntry[] = [
  { id: 'WL-3301', name: 'OKONKWO, M.', documentNumber: 'UTO784120*', nationality: 'Utopia', reason: 'Reported stolen blank series', source: 'INTERPOL SLTD (demo)', added: '2026-07-14', category: 'blacklisted' },
  { id: 'WL-3298', name: 'PETROV, IVAN', documentNumber: 'TD-7788***', nationality: 'Stateless', reason: 'Fraudulent travel document', source: 'National (demo)', added: '2026-06-02', category: 'blacklisted' },
  { id: 'WL-3290', name: 'HADDAD, OMAR', documentNumber: 'LBN2201936', nationality: 'Lebanon', reason: 'Identity used with 2 passports', source: 'BorderShield AI', added: '2026-05-21', category: 'duplicate' },
  { id: 'WL-3284', name: 'UNKNOWN', documentNumber: 'P<XXX1140*', nationality: '—', reason: 'Face cluster linked to 3 screenings', source: 'BorderShield AI', added: '2026-05-09', category: 'suspicious' },
  { id: 'WL-3277', name: 'DEMIR, YUSUF', documentNumber: 'TUR4471120', nationality: 'Türkiye', reason: 'MRZ failures on 2 occasions', source: 'BorderShield AI', added: '2026-04-30', category: 'suspicious' },
  { id: 'WL-3269', name: 'MARCHAND, C.', documentNumber: 'FRA-11029', nationality: 'France', reason: 'Expired 2025-11-01', source: 'Issuing authority', added: '2026-04-11', category: 'expired' },
  { id: 'WL-3262', name: 'REYES, SOFIA', documentNumber: 'MEX-0192834', nationality: 'Mexico', reason: 'Expired 2026-01-15', source: 'Issuing authority', added: '2026-03-28', category: 'expired' },
  { id: 'WL-3255', name: 'NATARAJAN, P.', documentNumber: 'IND-5502931', nationality: 'India', reason: 'Same biometrics, different name', source: 'BorderShield AI', added: '2026-03-02', category: 'duplicate' },
]

export type EvidenceRecord = {
  screeningId: string
  documentHash: string
  evidenceHash: string
  timestamp: string
  txId: string
  status: 'Confirmed' | 'Pending'
  block: number
}

export const evidenceRecords: EvidenceRecord[] = [
  { screeningId: 'SCR-24871', documentHash: '9f2a…c41e', evidenceHash: '7b10…8d2f', timestamp: '2026-09-04 08:31:12', txId: '0x3fa1…9e07', status: 'Confirmed', block: 184221 },
  { screeningId: 'SCR-24870', documentHash: '11c9…0a72', evidenceHash: 'e4d3…5b91', timestamp: '2026-09-04 08:24:40', txId: '0x91b4…22c8', status: 'Confirmed', block: 184220 },
  { screeningId: 'SCR-24869', documentHash: 'a7f0…ee19', evidenceHash: '02cd…7f60', timestamp: '2026-09-04 08:19:03', txId: '0x5c72…d1a4', status: 'Confirmed', block: 184219 },
  { screeningId: 'SCR-24868', documentHash: '5e31…b8c0', evidenceHash: 'c9a8…14e2', timestamp: '2026-09-04 08:12:57', txId: '0xd08e…7b33', status: 'Confirmed', block: 184218 },
  { screeningId: 'SCR-24867', documentHash: 'bb42…37d9', evidenceHash: '6f1e…a0c5', timestamp: '2026-09-04 08:00:21', txId: '0x2a9f…c6e1', status: 'Confirmed', block: 184217 },
  { screeningId: 'SCR-24866', documentHash: '48ad…91f3', evidenceHash: 'd27b…e83a', timestamp: '2026-09-04 07:52:08', txId: '0x7e13…4f90', status: 'Pending', block: 184216 },
]

export type Report = {
  id: string
  screeningId: string
  date: string
  risk: RiskLevel
  status: 'Ready' | 'Draft' | 'Archived'
}

export const reports: Report[] = [
  { id: 'RPT-5120', screeningId: 'SCR-24871', date: '2026-09-04', risk: 'high', status: 'Draft' },
  { id: 'RPT-5119', screeningId: 'SCR-24868', date: '2026-09-04', risk: 'suspicious', status: 'Ready' },
  { id: 'RPT-5118', screeningId: 'SCR-24864', date: '2026-09-04', risk: 'high', status: 'Ready' },
  { id: 'RPT-5117', screeningId: 'SCR-24860', date: '2026-09-04', risk: 'high', status: 'Ready' },
  { id: 'RPT-5116', screeningId: 'SCR-24861', date: '2026-09-04', risk: 'suspicious', status: 'Archived' },
  { id: 'RPT-5115', screeningId: 'SCR-24855', date: '2026-09-03', risk: 'verified', status: 'Archived' },
]

export const analysisSteps = [
  'Document received',
  'Document type detected',
  'Image quality check',
  'OCR extraction',
  'MRZ validation',
  'Visual forensic inspection',
  'Face verification',
  'Metadata inspection',
  'Risk calculation',
  'Final screening decision',
]

export const demoCases = [
  { id: 'verified', title: 'Verified Document', description: 'Low-risk synthetic passport', result: 'SCR-24870' },
  { id: 'tampered', title: 'Tampered Document', description: 'Synthetic passport with document alterations', result: 'SCR-24871' },
  { id: 'impersonation', title: 'Identity Impersonation', description: 'Valid-looking document with face mismatch', result: 'SCR-24871' },
]

export function getScreening(id: string) {
  return screenings.find((s) => s.id === id) ?? screenings[0]
}
