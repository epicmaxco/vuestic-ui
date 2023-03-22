export type FormFiled = {
  name?: string;
  value: unknown;
  isValid: boolean;
  errorMessages: string[];
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
  focus: () => void;
}
