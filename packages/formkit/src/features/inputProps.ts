export const inputProps = {
  id: '$id',
  messages: '$help',
  'onUpdate:modelValue': '$node.input',
  modelValue: '$_value',
  errorMessages: '$errorMessages',
  error: '$node.context.state.failing || $node.context.state.errors',
  dirty: '$node.context.state.dirty || $node.context.state.submitted',
  label: '$label',
}
