import { VaForm } from 'src/services/vue-plugin/components'
import { Ref } from 'vue'

export type Step = {
  label: string;
  icon?: string;
  disabled?: boolean;
  save?: Function;
};

export type StepControls = {
  setStep: (index: number) => void;
  nextStep: (stepsToSkip?: number) => void;
  prevStep: (stepsToSkip?: number) => void;
};
