import { ComputedRef, Ref } from 'vue'

export type FormFiled<Name extends string = string> = {
  name: Ref<Name | undefined>;
  value?: Ref<unknown>;
  isValid: Ref<boolean>;
  isLoading: Ref<boolean>;
  errorMessages: Ref<string[]>;
  validate: () => boolean;
  validateAsync: () => Promise<boolean>;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
}

export type Form<Names extends string = string> = {
  fields: ComputedRef<FormFiled<Names>[]>;
  fieldNames: ComputedRef<Names[]>;
  formData: ComputedRef<Record<Names, unknown>>;
  isValid: ComputedRef<boolean>;
  isLoading: ComputedRef<boolean>;
  errorMessages: ComputedRef<string[]>;
  errorMessagesNamed: ComputedRef<Record<Names, string[]>>;
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
  focusInvalidField: () => void;
}
