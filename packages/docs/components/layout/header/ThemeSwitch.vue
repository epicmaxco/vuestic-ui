<template>
  <div class="mr-4">
    <va-switch
      v-model="isDark"
      color="#5123a1"
      off-color="#ffd300"
      style="--va-switch-checker-background-color: #252723;"
      class="theme-switch-button"
      name="Switch theme"
      :aria-label="`Switch theme to ${isDark ? 'light' : 'dark'}`"
    >
      <template #innerLabel>
        <div class="va-text-center">
          <va-icon
            size="24px"
            :name="isDark ? 'dark_mode' : 'light_mode'"
          />
        </div>
      </template>
    </va-switch>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'

const { currentPresetName } = useColors()

const { setTheme } = useTheme()

const isDark = computed({
  get: () => currentPresetName.value === 'dark',
  set: (value) => setTheme(value ? 'dark' : 'light'),
})
</script>

<style lang="scss">

.theme-switch-button {
  --va-switch-checker-wrapper-width: 4rem;
  --va-switch-inner-height: 2.25rem;
  --va-switch-inner-width: 100%;
  --va-switch-track-border-radius: 9999px;

  max-width: var(--va-switch-checker-wrapper-width);
}
</style>
