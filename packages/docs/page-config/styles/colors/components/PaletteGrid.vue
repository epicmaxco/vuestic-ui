<template>
  <div class="color-grid">
    <div
      v-for="{ type, colors, description } in colorNames"
      :key="type"
      class="flex flex-wrap mb-8"
    >
      <div class="px-4">
        <h6 class="va-text-capitalize va-h6">{{ type }}</h6>
        <p>
          {{ description }}
        </p>
      </div>
      <div
        v-for="name in colors"
        :key="type + name"
        class="color-grid__item-wrapper sm:w-1/2 w-full"
      >
        <ColorsGridCard
          class="color-grid__item"
          :value="getColor(name)"
          :name="name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColors } from "vuestic-ui";
import ColorsGridCard from "./components/PaletteGridCard.vue";

const { getColor } = useColors();

const colorNames = [
  {
    type: "accent",
    description: "Accent colors are used to highlight interactive elements such as buttons, links, and other interactive elements.",
    colors: ["primary", "secondary", "success", "warning", "danger", "info"],
  },
  {
    type: "background",
    description: "Background colors are used to define the background of the page, cards, modals, dropdowns, and other elements.",
    colors: [
      "backgroundPrimary",
      "backgroundSecondary",
      "backgroundElement",
      "backgroundBorder",
    ],
  },
  {
    type: "text",
    description: "Text colors are used to define the main and alternative text colors. Vuestic automatically choose correct text color based on background color.",
    colors: ["textPrimary", "textInverted"],
  },
  {
    type: "utility",
    description: "Utility colors are used to define the color of shadows and keyboard focus outline.",
    colors: ["shadow", "focus"],
  },
];
</script>

<style lang="scss" scoped>
$gap: 16px;

.color-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -$gap;
  padding: $gap 0;

  p {
    margin-bottom: 0.25rem;
  }

  &__item {
    box-sizing: border-box;
    border: 1px solid rgba(58, 58, 58, 0.307);
    border-radius: 5px;

    &-wrapper {
      padding: $gap;
    }
  }
}
</style>
