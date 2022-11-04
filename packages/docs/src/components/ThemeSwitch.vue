<template>
  <va-switch class="theme-switch-button" v-model="isDark" color="#5e548e" off-color="#222" size="small" style="height: 1.8rem;">
    <template #checker>
      <va-icon
        size="18px"
        :name="isDark ? 'dark_mode' : 'light_mode'"
        :color="isDark? '#fff' : 'warning'"
      />
    </template>
    <template #innerLabel>
      <span style="width: 46px; display: inline-block; text-align: center;">
        {{ isDark ? 'Dark' : 'Light' }}
      </span>
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
  --va-switch-sm-inner-height: 1.8rem;
}
</style>
