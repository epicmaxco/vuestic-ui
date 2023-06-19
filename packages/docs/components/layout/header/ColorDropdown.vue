<template>
  <div class="color-dropdown">
    <va-button-dropdown
      v-model="doShowDropdown"
      class="color-dropdown__icon"
      preset="secondary"
      label="Colors"
      :offset="[16, 0]"
      prevent-overflow
      :close-on-content-click="false"
    >
      <div class="color-dropdown__content px-1">
        <div
          v-for="color in colorsArray"
          :key="color.name"
          class="color my-3 d-flex align-center"
        >
          <va-color-indicator
            size="1.25rem"
            :color="color.name"
          /> <span class="color__title">{{ color.title }}</span>
        </div>
      </div>
      <div class="color-dropdown__content px-1 mt-2">
        <va-button
          @click="doShowDropdown = false"
          class="w-full"
          to="/styles/colors"
        >
          Learn about colors
        </va-button>
      </div>
    </va-button-dropdown>
  </div>
</template>

<script lang="ts">
import { presets as colorsPresets } from 'vuestic-ui/src/services/color/presets'
import { computed, defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
        const colorsArray = computed(() => {
            const colorNames = Object.keys(colorsPresets.light);
            return colorNames.map((c) => ({ name: c, title: capitalizeFirstLetter(c) }));
        });

        const doShowDropdown = ref(false)

        return {
            doShowDropdown,
            colorsArray,
        };
    },
})
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/resources";

.color-dropdown {
  cursor: pointer;
  font-family: var(--va-font-family);

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
