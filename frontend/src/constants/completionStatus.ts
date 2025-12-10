export const COMPLETION_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const;

export type CompletionStatusType = typeof COMPLETION_STATUS[keyof typeof COMPLETION_STATUS];

export const COMPLETION_STATUS_OPTIONS = [
  { value: COMPLETION_STATUS.ALL, label: 'All' },
  { value: COMPLETION_STATUS.ACTIVE, label: 'Active' },
  { value: COMPLETION_STATUS.COMPLETED, label: 'Completed' }
] as const;

