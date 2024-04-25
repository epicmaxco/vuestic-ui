type MaybePromise<T> = T | Promise<T>

export type Step = {
  label: string
  icon?: string
  disabled?: boolean
  beforeLeave?: (currentStep: Omit<Step, 'beforeLeave'>, toStep: Omit<Step, 'beforeLeave'>) => MaybePromise<boolean | void>
  /** Will be set to true if user completed step with validation error */
  hasError?: boolean | ((currentStep: Omit<Step, 'hasError'>) => boolean | void)

  /** Prevents navigation and adds visual loader */
  isLoading?: boolean | ((currentStep: Omit<Step, 'isLoading'>) => boolean | void)
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
  finish: () => void
}
