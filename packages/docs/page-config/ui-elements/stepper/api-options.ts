export default defineManualApi({
  props: {
    steps: {
      types:
        '{ label: string, icon?: string, disabled?: boolean, save?: Function, hasError?: boolean, completed?: boolean }',
    },
  },
  slots: {
    stepButton: { },
    stepContent: { },
    controls: { },
    divider: { },
  },
  events: {
    finish: { types: '' }
  },
  methods: {
    setStep: { types: '`(stepNumber: number) => void`' },
    nextStep: { types: '`(stepsToSkip: number) => void`' },
    prevStep: { types: '`(stepsToSkip: number) => void`' },
  },
})
