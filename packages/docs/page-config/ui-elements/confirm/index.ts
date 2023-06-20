import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Confirm"),
    block.paragraph("A simple modal with message and ok and cancel buttons. Returns promise with `true` if ok clicked and `false` if cancel is clicked."),

    block.code({
      "Options Api": "options-api",
      "Composition Api": "composition-api",
    }),

    block.example('Default', { hideTitle: true }),
    block.example('Props', {
      title: "Props",
      description: "Any prop from VaModal can be passed to confirm. Event listeners can be passed with `on` prefix. For example, `onClickOutside`."
    }),

    block.api('VaModal', apiDescription, {
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
