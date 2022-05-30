<template>
  <div class="color-grid">
    <div
      class="color-grid__item-wrapper"
      v-for="[name, value] in colorsComputed"
      :key="name"
    >
      <va-hover
        class="color-grid__item"
        :style="{ backgroundColor: value, color: getColor(getTextColor(value)) }"
        stateful
        #default="{ hover }"
      >
        <p>
          {{ name }}
          <template v-if="hover">
            {{ value }}
          </template>
        </p>
        <p>
          var(--va-{{ name }})
        </p>
      </va-hover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColors } from 'vuestic-ui/src/main'

const { colors, getTextColor, getColor } = useColors()

const colorsComputed = computed(() => Object.entries(colors.value))
</script>

<style lang="scss" scoped>
  $gap: 12px;

  .color-grid {
    display: flex;
    flex-wrap: wrap;
    margin: -$gap;
    padding: $gap 0;

    &__item {
      padding: 16px;
      box-sizing: border-box;
      border: 1px solid rgba(58, 58, 58, 0.307);
      border-radius: 5px;

      &-wrapper {
        padding: $gap;
        width: 25%;
      }
    }
  }
</style>
