import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    icon: "The icon to be displayed inside a container",
    src: "URL to the image (will be placed inside `src` attribute of image tag)",
    alt: "Specifies an alternate text for an avatar image (not icon)",
    fontSize: "The font-size of text inside avatar",
    email: "Будет отображать `gravatar` для предоставленного email"
  },
  slots: {
    default: "Use this slot to replace default content to be displayed inside the component"
  },
  events: {
    error: "Triggers when failed to load an image"
  }
});
