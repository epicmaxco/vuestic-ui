import { createSection, type FormKitSchemaExtendableSection } from '@formkit/inputs'

export const icon = (
  sectionKey: string,
  el?: string
): FormKitSchemaExtendableSection => {
  return createSection(`${sectionKey}Icon`, () => {
    return {
      if: `$${sectionKey}Icon`,
      $cmp: 'VaIcon',
      props: {
        tag: el,
        for: {
          if: `${el === 'label'}`,
          then: '$id',
        },
        class: 'material-icons',
        onClick: `$handlers.iconClick(${sectionKey})`,
        role: `$fns.iconRole(${sectionKey})`,
        tabindex: `$fns.iconRole(${sectionKey}) === "button" && "0" || undefined`,
      },
      children: '$prefixIcon'
    }
  })()
}

export const help = createSection('help', () => ({
  $cmp: 'VaMessageList',
  if: '$help',
  props: {
    id: '$: "help-" + $id',
    modelValue: '$help'
  }
}))

export const messages = createSection('messages', () => ({
  $cmp: 'VaMessageList',
  if: '$defaultMessagePlacement && $fns.length($messages)',
  props: {
    id: '$: "errors-" + $id',
    modelValue: '$fns.arrayMessages($messages)',
    color: 'danger'
  }
}))
