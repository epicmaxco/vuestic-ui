import apiOptions from "./api-options";
import { apiExamplesObject, methodsApi, optionsApi } from "./modal-api";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Modal"),
    block.paragraph("Classic modal overlay which represents a dialog box or other interactive component, such as a dismissible alert, sub-window, etc."),

    block.subtitle("Examples"),

    block.example("Overview", {
      title: "Overview",
      description: "`va-modal`, by default, has the **OK** and **Cancel** buttons in the footer. You can provide a custom message and title with the `message` and `title` props respectively.\n\n`va-modal` supports close on **Esc** (enabled by default) and close on overlay click (enabled by default). These features may be disabled by setting the props `no-esc-dismiss` and `no-outside-dismiss` respectively, or `no-dismiss` as a shorthand to disable both of them."
    }),
    block.example("Stateful", {
      title: "Stateful",
      description: "By default `va-modal` is stateless. You can change it by setting the `stateful` prop"
    }),
    block.example("Fullscreen", {
      title: "Full screen",
      description: "Add the `fullscreen` prop to cover the whole page.\n\nNote that `va-modal` is full screen on mobile viewports by default. You can change it by setting the `mobile-fullscreen` prop to `false`."
    }),
  
    block.headline("Toggle modal visibility"),
    block.paragraph("There are several methods that you can employ to toggle the visibility of `va-modal`."),
    block.paragraph("`v-model` property is always automatically synced with `va-modal` visible state and you can show/hide using `v-model`."),
    block.paragraph("You can access modal using `ref` attribute and then call the `show()`, `hide()` or `toggle()` methods."),
    block.example("ToggleVisibility", { hideTitle: true }),
  
    block.example("DisableAnimation", {
      title: "Disable open and close animation",
      description: "To disable the transition/animation when modal opens and closes, set the prop `without-transitions`."
    }),
    block.example("ModalSizing", {
      title: "Modal sizing",
      description: "Modals have three optional sizes, available via the prop `size`. These sizes kick in at certain breakpoints to avoid horizontal scrollbars on narrower viewports. Valid optional sizes are `small`, `medium` (default), and `large`."
    }),
    block.example("HidingOverlay", {
      title: "Hiding the overlay",
      description: "Hide the modal's overlay via setting the `overlay` prop to `false`.\n\nNote that clicking outside of the modal will still close the modal even though the overlay is hidden. You can disable this behavior by setting the `no-outside-dismiss` prop on `va-modal`."
    }),
    block.example("BlurredOverlay", {
      title: "Blurred overlay",
      description: "Use the `blur` CSS filter for the overlay layer by setting the `blur` property to `true`. You can override the root CSS variable `--va-modal-overlay-background-blur-radius` to set your own blur radius."
    }),
    block.example("ScrollingLongContent", {
      title: "Scrolling long content",
      description: "When modals become too long for the user's viewport or device, they allow the scrolling of the modal body. Try the demo below to see what we mean.\n\nYou can also allow scrolling only content in modal via setting the `fixed-layout` prop. Title and actions will be fixed."
    }),
    block.example("Customization", {
      title: "Customization",
      description: "`va-modal` provides several slots (`default`, `header` and `footer`), that you can use to customize the content of various sections of the modal.\n\nYou can set custom text for **Cancel** and **Ok** buttons via `ok-text` and `cancel-text` props respectively, or you can hide them via `hide-default-actions` prop.\n\n`va-modal` also supports custom `overlay-opacity` as well as `z-index`, `max-width` and `max-height` for a modal."
    }),
    block.example("Anchor", {
      description: "Using the `anchor` slot, the user can access the `show()`, `hide()` and `toggle()` methods."
    }),
    block.example("CustomContent", {
      description: "You can remove default padding with `no-padding` prop and change default action buttons with `content` slot."
    }),
    block.example("NestedModals", {
      title: "Nested modals",
      description: "Modals can be nested: you can open one modal from another."
    }),
    block.example("BeforeClose", {
      title: "Before close",
      description: "You can set custom before close event to prevent modal from closing."
    }),

    block.subtitle("API"),
    block.api("VaModal", apiDescription, apiOptions),

    block.subtitle("Modal functional API"),
    block.paragraph("To make it easier to create modal we have a shorthands. For options API it is `$vaModal` that provides the VaModalPlugin (automatically installed with createVuestic). For composition Api we have `useModal` hook. Hook and global object have similar API."),
    block.code(apiExamplesObject),
    block.example("Create"),
    block.headline("Methods"),
    methodsApi(block),
    block.headline("Options"),
    optionsApi(block),
  ],
});
