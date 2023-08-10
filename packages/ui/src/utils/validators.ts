export function required (value: any, validationMessage?: string): any {
  return (
    (value && value.toString().length > 0) ||
    (validationMessage ?? 'This field is required!')
  )
}
