import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    stripe: "Displays a stripe above a card title.",
    stripeColor: "Customize stripe color (theme string or *HEX* string).",
    gradient: "Adds color gradient to `va-card` body.",
    bordered: "Toggles borders of a card component.",
    outlined: "Toggles shadow of `va-card`",
    dark: "Applies dark color and background to card"
  }
});
