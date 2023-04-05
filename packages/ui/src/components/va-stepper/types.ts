export type Step = {
  label: string
  icon?: string
  disabled?: boolean
}

export type StepControls = {
  setStep: (index: number) => void
  nextStep: (stepsToSkip?: number) => void
  prevStep: (stepsToSkip?: number) => void
}
