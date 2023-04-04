export default definePageConfig({
  blocks: [
    block.title("confirm.title"),
    block.paragraph("confirm.description"),

    block.code({
      "Options Api": "options-api",
      "Composition Api": "composition-api",
    }),

    block.example('Default', { hideTitle: true }),
    block.example('Props'),

    block.api('VaModal', {
      props: {
        stateful: { hidden: true },
        modelValue: { hidden: true },
        'onOk': { types: 'Function' },
        'onCancel': { types: 'Function' },
        'onClickOutside': { types: 'Function' },
        'onBeforeOpen': { types: 'Function' },
        'onOpen': { types: 'Function' },
        'onBeforeClose': { types: 'Function' },
        'onClose': { types: 'Function' },
      },
    }, {
      hidePropsTitle: true,
      hideMethods: true,
      hideSlots: true,
      hideCssVariables: true
    })
  ],
})