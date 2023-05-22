import { InjectionKey } from 'vue'
import { type createFormContext } from './useFormParent'

export const FormServiceKey: InjectionKey<ReturnType<(typeof createFormContext)>> = Symbol('FormService')
