import { InjectionKey } from 'vue'

export type Form = {
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
  validate: () => boolean;
  focusInvalid: () => void;
}

export type FormChild = {
  hasError: () => boolean;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
  validate: () => boolean;
}

export type FormProvider = {
  onChildMounted: (child: FormChild | Form) => void;
  onChildUnmounted: (child: FormChild | Form) => void;
}

export const FormServiceKey: InjectionKey<FormProvider> = Symbol('FormService')
