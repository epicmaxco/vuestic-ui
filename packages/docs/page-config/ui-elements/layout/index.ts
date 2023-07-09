export default definePageConfig({
  blocks: [
    block.title('Layout'),
    block.paragraph('Component is used for building App layout. It is based on CSS Grid and provides a simple API for building complex layouts.'),

    block.example('Default', {
      title: 'Default usage',
      description: 'Default usage of Layout component.',
    }),
    block.example('AllSlots', {
      title: 'All slots',
      description: 'Layout component has 4 slots: top, right, bottom, left, content (or default). You can use them to place your content.',
    }),
    block.example('Order', {
      title: 'Rendering order',
      description: 'You can use order area attribute to change order of slots. By default, order is 0. If order of one area is higher than another, it will be rendered on top of it.',
    }),
    block.example('Absolute', {
      title: 'Absolute',
      description: 'You can use absolute area attribute to make area absolute. It will be rendered on top of other areas and overflow them. Absolute respect order prop.',
    }),

    block.subtitle('Accessibility'),
    block.paragraph(`
Layout component is not handling accessibility by default. 

You should always wrap content in slot with \`<div role="region" aria-label="...">\` to make it accessible.
Make sure you have \`main\` role on your main content in \`content\` slot,
\`aside\` in \`left\`, \`right\` slots, \`header\` in \`top\` slot and \`footer\` in \`bottom\` slot.
More about landmarks you can read [here](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)[[target=_blank]].

Notice that if you're using components like VaSidebar, VaHeader the correct role will be added automatically.
    `),

    block.api('VaLayout', {
      props: {
        top: 'AreaConfig for top slot',
        right: 'AreaConfig for right slot',
        bottom: 'AreaConfig for bottom slot',
        left: 'AreaConfig for left slot',
      }
    },
    {
      props: {
        top: {
          types: `{ absolute?: boolean, order?: number }`
        },
        bottom: {
          types: `{ absolute?: boolean, order?: number }`
        },
        left: {
          types: `{ absolute?: boolean, order?: number }`
        },
        right: {
          types: `{ absolute?: boolean, order?: number }`
        }
      }
    })
  ]
})