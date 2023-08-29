import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaStepper from './VaStepper.vue'
import { Step } from './types'

export const VaStepper = withConfigTransport(_VaStepper)

export const defineVaStepperSteps = (steps: Step[]) => steps
