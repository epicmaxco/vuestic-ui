import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "The current visibility state of the alert",
    title: "The text content placed in the title",
    description: "The text content of the alert",
    icon: "Show icon in front of alert content",
    closeIcon: "Replace the default close icon with a custom one",
    closeText: "Use text instead of the close icon",
    closeable: "Add a close alert area",
    center: "Center the title and description of the alert",
    borderColor: "Border color of the alert",
    border: "Stripe border for alert. `top`, `right`, `bottom`, `left` sizes are available",
    dense: "Reduces alert paddings"
  },
  methods: {
    hide: "Hides alert (on stateless alert only emits `input`)"
  },
  slots: {
    default: "Content of alert body",
    title: "Alert title area content",
    icon: "Alert icon area content",
    close: "Alert close area content"
  }
});
