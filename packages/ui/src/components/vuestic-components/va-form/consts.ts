import { InjectionKey } from 'vue'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'

export type FormElement = {
  focus: () => void;
  reset: () => void;
  resetValidation: () => void;
  hasError?: () => boolean;
  validate: () => boolean;
}

export type FormProvider = {
  onChildMounted: (child: FormElement | FormComponentMixin) => void;
  onChildUnmounted: (child: FormElement | FormComponentMixin) => void;
}

export const FormServiceKey: InjectionKey<FormProvider> = Symbol('FormService')
