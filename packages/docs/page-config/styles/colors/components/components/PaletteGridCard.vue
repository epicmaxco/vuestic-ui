<template>
  <div
    class="color-grid-item"
    :style="{ backgroundColor: value, color: textColorComputed }"
  >
    <div class="color-grid-item__header flex-col md:flex-row">
      <p>
        {{ name }}
      </p>
      <p class="text-sm">
        var(--va-{{ kebabCase(name) }})<span class="ml-2">{{ value }}</span>
      </p>
    </div>
    <div class="color-grid-item__content">
      {{ colorDescriptions[name] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementBackground, useTextColor } from "vuestic-ui/src/composables";
import kebabCase from "lodash/kebabCase";

const { background } = useElementBackground();
const { textColorComputed } = useTextColor(background);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const colorDescriptions = {
  primary: "Accent color used on button, links and other interactive elements",
  secondary: "Accent color used on non important interactive elements",
  success: "Accent color for success validation, alerts or toasts",
  danger: "Accent color for error validation, alerts or toasts",
  info: "Accent color for info toasts or alerts",
  warning: "Accent color for warning toasts or alerts",
  backgroundPrimary: "Page background",
  backgroundSecondary: "Card, Modal, Dropdown background",
  backgroundElement: "Input, switch, divider background colors",
  backgroundBorder: "Used as border color in elements like input, switch etc.",
  textPrimary: "Main text used on page. Used as default color on background colors.",
  textInverted: "Used as text color, if textPrimary doesn't have enough contrast with background color.",
  shadow: "Color of shadows that used in elements like cards, modals etc.",
  focus: "Keyboard focus outline color"
}
</script>

<style lang="scss" scoped>
.color-grid-item {
  padding: 0.5rem 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
