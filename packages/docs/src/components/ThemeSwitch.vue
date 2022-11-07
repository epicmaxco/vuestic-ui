<template>
  <va-switch class="theme-switch-button" v-model="isDark" color="#5123a1" off-color="#ffd300" style="--va-switch-checker-background-color: #252723;">
    <template #innerLabel>
      <div class="va-text-center">
        <va-icon
          size="24px"
          :name="isDark ? 'dark_mode' : 'light_mode'"
          class="mx-1"
        />
      </div>
    </template>
  </va-switch>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColors } from 'vuestic-ui/src/main'

const { currentPresetName, applyPreset } = useColors()

const isDark = computed({
  get: () => currentPresetName.value === 'dark',
  set: (value) => applyPreset(value ? 'dark' : 'light'),
})
</script>

<style lang="scss">
.theme-switch-button {
  --va-switch-inner-height: 2.25rem;
  --va-switch-inner-width: 100%;
  --va-switch-track-border-radius: 9999px;
}
</style>
