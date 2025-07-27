export default definePageConfig({
  blocks: [
    block.title('Tailwind'),

    block.paragraph('Vuestic UI supports Tailwind CSS as a compiler feature. This allows you to use Tailwind CSS classes alongside Vuestic components and styles.'),

    block.paragraph('`@vuestic/compiler` automatically detects if Tailwind CSS 4 is installed in your project and applies necessary transformations to ensure that `vuestic.config` colors are available as Tailwind CSS classes.'),
  ]
})
