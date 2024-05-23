import { InjectionKey } from 'vue'
import { FormContext } from './formContext'

export const FormServiceKey: InjectionKey<FormContext> = Symbol('FormService')
