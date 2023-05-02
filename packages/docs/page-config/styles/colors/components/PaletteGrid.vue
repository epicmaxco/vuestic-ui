<template>
  <div class="color-grid">
    <div
      v-for="{ type, colors } in colorNames"
      :key="type"
      class="flex flex-wrap mb-8"
    >
      <div class="px-4">
        <h6 class="va-text-capitalize">{{ type }}</h6>
        <p>
          {{ $t('colors.palette.' + type) }}
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
    colors: ["primary", "secondary", "success", "warning", "danger", "info"],
  },
  {
    type: "background",
    colors: [
      "backgroundPrimary",
      "backgroundSecondary",
      "backgroundElement",
      "backgroundBorder",
    ],
  },
  {
    type: "text",
    colors: ["textPrimary", "textInverted"],
  },
  {
    type: "utility",
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
