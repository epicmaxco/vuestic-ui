export default definePageConfig({
  blocks: [
    block.title("Grid System"),
    block.paragraph("Vuestic UI provides you with some flexbox helper classes. Of course, you can opt out using CSS Grid instead (or any other layout-scheme you'd like), but if you prefer using flexbox, we've got you covered. Still, the final decision is totally up to you."),
    block.alert("CSS helpers and the CSS reset file will remain in the Vuestic UI bundle until version 1.7.0, after which they will be permanently removed. We suggest to use Tailwind CSS instead.", "warning", true),

    block.example("Default", {
      title: "Enabling flexbox",
    }),

    block.headline("Breakpoints"),
    block.paragraph("Use the following classes (`breakpoints`) to apply provided styling to screens of certain widths exclusively."),
    block.paragraph("`.xs` - (< 640px) - Extra small devices"),
    block.paragraph("`.sm` - (>= 640px && < 1024px) - Small devices"),
    block.paragraph("`.md` - (>= 1024px && < 1440px) - Medium devices"),
    block.paragraph("`.lg` - (>= 1440px && < 1920px) - Large devices"),
    block.paragraph("`.xl` - (>= 1920) - Extra large devices"),
    block.example("Breakpoints", { hideTitle: true }),

    block.headline("Offsets"),
    block.paragraph("You can use the `offset`-classes to set spaces between a given element and the one to the left from it."),
    block.paragraph("`.offset-xs` - Extra small devices"),
    block.paragraph("`.offset-sm` - Small devices"),
    block.paragraph("`.offset-md` - Medium devices"),
    block.paragraph("`.offset-lg` - Large devices"),
    block.paragraph("`.offset-xl` - Extra large devices"),
    block.example("Offsets", { hideTitle: true }),

    block.subtitle("API"),
    block.headline("`align`:"),
    block.paragraph("`.align-start` - cross-start margin edge of the items is placed on the cross-start line"),
    block.paragraph("`.align-end` - cross-end margin edge of the items is placed on the cross-end line"),
    block.paragraph("`.align-center` - items are centered in the cross-axis"),
    block.paragraph("`.align-baseline` - items are aligned the way their baselines align"),
    block.example("AlignDefault", { hideTitle: true }),

    block.headline("`align-self`:"),
    block.paragraph("`.align-self-start` - cross-start margin edge of the items is placed on the cross-start line"),
    block.paragraph("`.align-self-end` - cross-end margin edge of the items is placed on the cross-end line"),
    block.paragraph("`.align-self-center` - items are centered in the cross-axis"),
    block.paragraph("`.align-self-baseline` - items are aligned the way their baselines align"),
    block.example("AlignSelf", { hideTitle: true }),

    block.headline("`align-content`:"),
    block.paragraph("`.align-content-start` - lines packed to the start of the container"),
    block.paragraph("`.align-content-end` - lines packed to the end of the container"),
    block.paragraph("`.align-content-center` - lines packed to the center of the container"),
    block.paragraph("`.align-content-space-between` - lines evenly distributed; the first line is at the start of the container while the last one is at the end"),
    block.paragraph("`.align-content-space-around` - lines evenly distributed with equal space between them"),
    block.example("AlignContent", { hideTitle: true }),

    block.headline("`justify`:"),
    block.paragraph("`.justify-start` - items are packed toward the start line"),
    block.paragraph("`.justify-end` - items are packed toward to end line"),
    block.paragraph("`.justify-center` - items are centered along the line"),
    block.paragraph("`.justify-space-around` - items are evenly distributed in the line, items have equal space around on either end"),
    block.paragraph("`.justify-space-between` - items are evenly distributed in the line; first item is on the start line, last item is on the end line"),
    block.paragraph("`.justify-space-evenly` - items are evenly distributed in the line; items have equal space around them"),
    block.example("AlignJustify", { hideTitle: true })
  ]
});
