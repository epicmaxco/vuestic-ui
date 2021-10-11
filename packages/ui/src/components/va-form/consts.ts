import { InjectionKey } from 'vue'

export type FormChild = {
  hasError?: () => any;
  reset: () => any;
  resetValidation: () => any;
  focus: () => any;
  validate: () => boolean;
}

export type FormProvider = {
  onChildMounted: (child: FormChild) => void;
  onChildUnmounted: (child: FormChild) => void;
}

export const FormServiceKey: InjectionKey<FormProvider> = Symbol('FormService')
