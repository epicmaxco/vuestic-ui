import { InjectionKey } from 'vue'

export type FormChild = {
  hasError?: () => boolean;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
  validate: () => boolean;
  focusInvalid?: () => void;
}

export type FormProvider = {
  onChildMounted: (child: FormChild) => void;
  onChildUnmounted: (child: FormChild) => void;
}

export const FormServiceKey: InjectionKey<FormProvider> = Symbol('FormService')
