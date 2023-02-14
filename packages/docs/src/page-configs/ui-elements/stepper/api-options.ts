import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  props: {
    steps: { types: '{ label: string, icon?: string, disabled?: boolean }' },
  },
  slots: {
    stepButton: { },
    stepContent: { },
    controls: { },
    divider: { },
  },
  methods: {
    setStep: { types: '`(stepNumber: number) => void`' },
    nextStep: { types: '`(stepsToSkip: number) => void`' },
    prevStep: { types: '`(stepsToSkip: number) => void`' },
  },
})
