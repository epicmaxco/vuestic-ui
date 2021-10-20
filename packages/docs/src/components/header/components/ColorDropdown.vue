<template>
  <div class="color-dropdown">
    <va-button-dropdown
      class="color-dropdown__icon"
      color="primary"
      flat
      label="Colors"
      :offset="[0, 25]"
    >
      <div class="color-dropdown__content px-1">
        <div v-for="color in colorsArray" :key="color.name" class="color mt-1 mb-1">
          <va-color-indicator :color="color.name" /> <span class="color__title">{{ color.title }}</span>
        </div>
      </div>
    </va-button-dropdown>
  </div>
</template>

<script lang="ts">
import { getColors } from 'vuestic-ui/src/main'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'DocsColorDropdown',
  setup () {
    const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

    const colorsArray = computed(() => {
      const colors = getColors()
      const colorNames = Object.keys(colors)

      return colorNames.map((c) => ({ name: c, title: capitalizeFirstLetter(c) }))
    })

    return {
      colorsArray,
    }
  },
})
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";

.color-dropdown {
  cursor: pointer;

  &__icon {
    .va-button__content {
      font-weight: bold;
    }

    position: relative;
    display: flex;
    align-items: center;
  }

  &__content {
    border-radius: 0.5rem;
    padding: 0;
    font-weight: normal;

    .color {
      display: flex;
      align-items: center;

      &__title {
        display: inline-block;
        min-width: 4rem;
        margin-left: 0.5rem;
      }
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}

.button-restore {
  display: flex;
  margin: 0.375rem auto;
}
</style>
