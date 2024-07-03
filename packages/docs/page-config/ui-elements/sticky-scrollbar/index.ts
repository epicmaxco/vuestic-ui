export default definePageConfig({
  blocks: [
    block.title("StickyScrollbar"),
    block.paragraph("This component adds floating scrollbar to element if it doesn't fit the screen. In case if you have large scroll container and want your scrollbar to be always visible, you need to use this component."),

    block.example('Horizontal'),
    block.example('WithDataTable', {
      title: 'With DataTable',
      description: '`VaStickyScrollbar` is designed to be used with scroll large containers like `VaDataTable`. Because having large scroll container is not common, we don\'t include sticky scroll by default.',
    }),

    block.api('VaStickyScrollbar', {
      props: {
        direction: 'Defines the direction of the scrollbar. If you need both horizontal and vertical scrollbars, you need to use two components',
        el: 'Where to attach the scrollbar. By default it attaches to the parent element of the component',
      }
    }, {
      props: {
        direction: {
          types: "'horizontal' | 'vertical'",
        }
      }
    })
  ],
});
