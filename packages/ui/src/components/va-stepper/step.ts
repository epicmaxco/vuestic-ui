import { unFunction } from '../../utils/un-function'
import type { Step } from './types'

/** Checks if hasError a function and returns its result. Otherwise returns hasError as boolean */
export const isStepHasError = (step: Step) => {
  return unFunction(step.hasError, step) || false
}
