import { ComputedRef, Ref, UnwrapRef } from 'vue'

export type FormFiled<Name extends string = string> = {
  name: Ref<Name | undefined>;
  value?: Ref<unknown>;
  isValid: Ref<boolean>;
  isLoading: Ref<boolean>;
  isDirty: Ref<boolean>;
  isTouched: Ref<boolean>;
  errorMessages: Ref<string[] | string>;
  validate: () => boolean;
  validateAsync: () => Promise<boolean>;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
}

export type Form<Names extends string = string> = {
  fields: ComputedRef<UnwrapRef<FormFiled<Names>[]>>;
  fieldsNamed: ComputedRef<Record<Names, UnwrapRef<FormFiled>>>;
  fieldNames: ComputedRef<Names[]>;
  formData: ComputedRef<Record<Names, unknown>>;
  isValid: ComputedRef<boolean>;
  isDirty: Ref<boolean>;
  isTouched: Ref<boolean>;
  isLoading: ComputedRef<boolean>;
  errorMessages: ComputedRef<string[]>;
  errorMessagesNamed: ComputedRef<Record<Names, string[]>>;
  immediate: ComputedRef<boolean>,
  validate: () => boolean;
  validateAsync: () => Promise<boolean>;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
  focusInvalidField: () => void;
}
