<template>
  <div class="theme-switch-container">
    <va-badge text="new">
      <va-switch
        v-model="isDark"
        color="#5123a1"
        off-color="#ffd300"
        style="--va-switch-checker-background-color: #252723;"
        class="theme-switch-button"
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
    </va-badge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColors } from 'vuestic-ui/src/main'

const { currentPresetName, presets, applyPreset } = useColors()

const setTheme = (theme: string) => {
  applyPreset(theme)
  localStorage.setItem('vuestic-docs-theme', theme)
  document.documentElement.style.colorScheme = theme
}

const isDark = computed({
  get: () => currentPresetName.value === 'dark',
  set: (value) => setTheme(value ? 'dark' : 'light'),
})

setTheme(localStorage.getItem('vuestic-docs-theme') || 'light')
</script>

<style lang="scss">
.theme-switch-container {
  margin-right: 3.5rem;
  position: relative;

  .va-badge__text-wrapper {
    top: 50%;
    left: unset;
    right: -0.25rem;
    transform: translate(100%, -50%);
  }
}

.theme-switch-button {
  --va-switch-checker-wrapper-width: 4rem;
  --va-switch-inner-height: 2.25rem;
  --va-switch-inner-width: 100%;
  --va-switch-track-border-radius: 9999px;

  max-width: var(--va-switch-checker-wrapper-width);
}
</style>
