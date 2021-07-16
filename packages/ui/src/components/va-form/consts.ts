import { InjectionKey } from 'vue'
import { FormComponentMixin } from '../../mixins/FormComponent/FormComponentMixin'

export type FormProvider = {
  onChildMounted: (child: FormComponentMixin) => void;
  onChildUnmounted: (child: FormComponentMixin) => void;
}

export const FormServiceKey: InjectionKey<FormProvider> = Symbol('FormService')
