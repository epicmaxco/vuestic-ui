<template>
  <div class="color-tab__content px-1">
    <va-button-toggle
      class="pb-2"
      v-model="selectedTheme"
      outline
      small
      color="primary"
      :options="themeOptions"
      style="max-width: 100%;"
    />
    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="primary" text="primary" />
      </template>
      <va-color-picker v-model="themes.primary" class="my-1" />
    </va-dropdown>

    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="secondary" text="secondary" />
      </template>
      <va-color-picker v-model="themes.secondary" class="my-1" />
    </va-dropdown>

    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="success" text="Success" />
      </template>
      <va-color-picker v-model="themes.success" class="my-1" />
    </va-dropdown>

    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="info" text="Info" />
      </template>
      <va-color-picker v-model="themes.info" class="my-1" />
    </va-dropdown>

    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="danger" text="Danger" />
      </template>
      <va-color-picker v-model="themes.danger" class="my-1" />
    </va-dropdown>

    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="warning" text="Warning" />
      </template>
      <va-color-picker v-model="themes.warning" class="my-1" />
    </va-dropdown>

    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="gray" text="Gray" />
      </template>
      <va-color-picker v-model="themes.gray" class="my-1" />
    </va-dropdown>

    <va-dropdown class="color-picker-dropdown mt-1 mb-1">
      <template #anchor>
        <va-badge class="color-picker-dropdown__badge" color="dark" text="Dark" />
      </template>
      <va-color-picker v-model="themes.dark" class="my-1" />
    </va-dropdown>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { watch } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { ThemeName, ThemeNameIterator } from '~~/plugins/vuestic/config'
import { capitalize } from 'lodash'
import { getColors } from 'vuestic-ui'

@Options({
  name: 'LandingColorTab',
})
export default class ColorTab extends Vue {
  selectedTheme: string | ThemeName = ThemeName.DEFAULT

  get themeOptions () {
    return ThemeNameIterator.map(name => ({
      label: capitalize(name),
      value: name,
    }))
  }

  beforeMount () {
    const currentTheme: string | null = localStorage.getItem('currentTheme')
    if (currentTheme) {
      this.selectedTheme = ThemeNameIterator.includes((currentTheme as ThemeName)) && currentTheme ? currentTheme : ThemeName.DEFAULT
    }
  }

  get themeLabel () {
    return capitalize(this.selectedTheme)
  }

  created () {
    watch(() => this.selectedTheme, (themeName) => {
      localStorage.setItem('currentTheme', themeName)
      this.$root.eventBus.$emit('changeTheme', themeName.toUpperCase())
    })
  }

  get themes () {
    return getColors() || {}
  }
}
</script>

<style lang="scss">
@import "../../../../ui/src/styles/resources";

.color-tab {
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .color-picker-dropdown {
      display: flex;
      justify-content: center;

      &__badge {
        /* Badges have 0.5rem to the right by default */
        margin-left: 0.5rem;
        cursor: pointer;
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
