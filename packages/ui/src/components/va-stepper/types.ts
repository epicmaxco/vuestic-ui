export type Step = {
  label: string
  icon?: string
  disabled?: boolean
  beforeSave?: (step: Omit<Step, 'beforeSave'>) => boolean
  /** Will be set to true if user completed step with validation error */
  hasError?: boolean
  /** Will be set to true if user completed step without validation error */
  completed?: boolean
}

export type StepControls = {
  setStep: (index: number) => void
  nextStep: (stepsToSkip?: number) => void
  prevStep: (stepsToSkip?: number) => void
}
