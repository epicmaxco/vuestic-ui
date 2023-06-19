import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Skeleton"),
    block.paragraph("Skeleton is a component that is used to show the user that the content is loading. It is used to improve the user experience and to show the user that the content is loading."),

    block.component('Playground'),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "The default skeleton is a `squared` reactable with a width of 100% and a height of 5rem."
    }),
    block.example("Text", {
      title: "Text",
      description: "The skeleton with `text` variant looks like a text line. Count of lines can be configured with `lines` prop. The last line can be shorter than others with `lastLineWidth` prop."
    }),
    block.example("Headline", {
      title: "Headline",
      description: "You can apply typography or any other classes to the skeleton. For example, `va-h1` class will make the skeleton look like a headline."
    }),
    block.example("Circle", {
      title: "Circle",
      description: "The skeleton with `circle` variant looks like a circle. The size of the circle can be configured with `height` and `width` prop. Usualy used as avatar placeholder."
    }),
    block.example("Rounded", {
      title: "Rounded",
      description: "The skeleton with `rounded` variant looks like a rounded rectangle. The size of the rectangle can be configured with `height` and `width` prop. Can be used as button or input placeholder."
    }),
    block.example("Square", {
      title: "Square",
      description: "The skeleton with `square` variant looks like a square. The size of the square can be configured with `height` and `width` prop. Can be used as card or image placeholder."
    }),
    block.example("Group", {
      title: "Group",
      description: "Skeletons can be grouped in `VaSekeletonGroup` component to sync their animations. For example, you can use it to create a card, list or table placeholder."
    }),
    block.example("GroupWave", {
      title: "Wave animation",
      description: "You can use `wave` animation for `VaSkeletonGroup` to make it look like a wave. VaSkeletonGroup will sync animations."
    }),
    block.example("Loading", {
      title: "Loading",
      description: "Down bellow is an example how you can use skeleton in your application. We use `isLoading` ref to indicate if content is loading. Don't forget to add `aria-busy` attribute to the content to indicate that it is loading to sreen reader."
    }),

    block.subtitle("API"),
    block.api("VaSkeleton", apiDescription, apiOptions),
  ],
});
