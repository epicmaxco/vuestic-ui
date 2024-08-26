export type HumanState = {
  direction: 'horizontal' | 'vertical',
  horizontal: 'left' | 'center' | 'right',
  vertical: 'top' | 'center' | 'bottom',
}

export type FlexState = {
  display: 'flex',
  'flex-direction': 'row' | 'column',
  'justify-content': 'flex-start' | 'center' | 'flex-end',
  'align-items': 'flex-start' | 'center' | 'flex-end',
}
