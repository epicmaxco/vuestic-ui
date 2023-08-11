export type Step = {
  label: string
  icon?: string
  disabled?: boolean
  beforeSave?: (currentStep: Omit<Step, 'beforeSave'>, toStep: Omit<Step, 'beforeSave'>) => boolean
  /** Will be set to true if user completed step with validation error */
  hasError?: boolean | ((step: Step) => boolean)
  /**
   * Used in linear stepper to indicate if step is complete.
   * You can set it manually to false to prevent moving to next step.
   * If moved to other step became true if wasn't set to false manually.
   */
  completed?: boolean
}

export type StepControls = {
  setStep: (index: number) => void
  nextStep: (stepsToSkip?: number) => void
  prevStep: (stepsToSkip?: number) => void
}
