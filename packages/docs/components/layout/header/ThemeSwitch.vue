<template>
  <div>
    <VaMenu stick-to-edges>
      <template #anchor>
        <VaButton
          :icon="currentTheme?.icon"
          preset="secondary"
        />
      </template>
      <VaMenuItem
        v-for="(theme) in themes"
        :key="theme.name"
        :icon="theme.icon"
        :child:left-icon="{
          color: theme.color
        }"
        class="h-[40px]"
        @selected="applyPreset(theme.key)"
      >
        {{ theme.name }}

        <template #right-icon>
          <VaColorIndicator :color="presets[theme.key].backgroundPrimary" />
          <VaColorIndicator class="-ml-2" :color="presets[theme.key].secondary" />
          <VaColorIndicator class="-ml-2" :color="presets[theme.key].primary" />
        </template>
      </VaMenuItem>
    </VaMenu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { currentPresetName, applyPreset, presets } = useColors()

const themes = [
  { name: 'Light', icon: 'light_mode', key: 'light', color: '#ffd300' },
  { name: 'Dark', icon: 'dark_mode', key: 'dark', color: '#5123a1' },
  // { name: 'Spooky', icon: 'fas-ghost', key: 'halloween', color: '#e36414' },
]

const currentTheme = computed(() => themes.find((theme) => theme.key === currentPresetName.value))
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
