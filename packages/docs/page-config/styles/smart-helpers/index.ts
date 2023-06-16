export default definePageConfig({
  blocks: [
    block.title("Smart Helpers"),
    block.paragraph("Vuestic UI provides amount of smart CSS helpers which are adopting to the current breakpoint (see also [Breakpoint Service](/services/breakpoints))."),

    block.headline("Gutters"),
    block.paragraph("Sets the margin between the cells of your flex-container with the `gutter` class."),
    block.paragraph("`.va-gutter-1` - Extra small gutter between cells"),
    block.paragraph("`.va-gutter-2` - Small gutter between cells"),
    block.paragraph("`.va-gutter-3` - Default gutter between cells"),
    block.paragraph("`.va-gutter-4` - Large gutter between cells"),
    block.paragraph("`.va-gutter-5` - Extra large gutter between cells"),
    block.example("Gutters", { hideTitle: true }),

    block.headline("Spacing"),
    block.paragraph("Sets the margin (`x` or `y`) between child items of the container with the `spacing` class."),
    block.paragraph("`.va-spacing-x/y-1` - Extra small spacing between items"),
    block.paragraph("`.va-spacing-x/y-2` - Small spacing between items"),
    block.paragraph("`.va-spacing-x/y-3` - Default spacing between items"),
    block.paragraph("`.va-spacing-x/y-4` - Large spacing between items"),
    block.paragraph("`.va-spacing-x/y-5` - Extra large spacing between items"),
    block.example("Spacing", { hideTitle: true }),
  ],
});
