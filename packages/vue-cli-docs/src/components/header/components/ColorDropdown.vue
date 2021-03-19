<template>
  <div class="color-dropdown">
    <va-button-dropdown
      class="color-dropdown__icon"
      color="primary"
      flat
      :label="themeLabel"
    >
      <div class="color-dropdown__content px-1">
        <va-button-toggle
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
          <!-- <va-color-picker v-model="themes.primary" class="my-1" /> -->
        </va-dropdown>

        <va-dropdown class="color-picker-dropdown mt-1 mb-1">
          <template #anchor>
            <va-badge class="color-picker-dropdown__badge" color="secondary" text="secondary" />
          </template>
          <!-- <va-color-picker v-model="themes.secondary" class="my-1" /> -->
        </va-dropdown>

        <va-dropdown class="color-picker-dropdown mt-1 mb-1">
          <template #anchor>
            <va-badge class="color-picker-dropdown__badge" color="success" text="Success" />
          </template>

          <!-- <va-color-picker v-model="themes.success" class="my-1" /> -->
        </va-dropdown>

        <va-dropdown class="color-picker-dropdown mt-1 mb-1">
          <template #anchor>
            <va-badge class="color-picker-dropdown__badge" color="info" text="Info" />
          </template>

          <!-- <va-color-picker v-model="themes.info" class="my-1" /> -->
        </va-dropdown>

        <va-dropdown class="color-picker-dropdown mt-1 mb-1">
          <template #anchor>
            <va-badge class="color-picker-dropdown__badge" color="danger" text="Danger" />
          </template>

          <!-- <va-color-picker v-model="themes.danger" class="my-1" /> -->
        </va-dropdown>

        <va-dropdown class="color-picker-dropdown mt-1 mb-1">
          <template #anchor>
            <va-badge class="color-picker-dropdown__badge" color="warning" text="Warning" />
          </template>

          <!-- <va-color-picker v-model="themes.warning" class="my-1" /> -->
        </va-dropdown>

        <va-dropdown class="color-picker-dropdown mt-1 mb-1">
          <template #anchor>
            <va-badge class="color-picker-dropdown__badge" color="gray" text="Gray" />
          </template>

          <!-- <va-color-picker v-model="themes.gray" class="my-1" /> -->
        </va-dropdown>

        <va-dropdown class="color-picker-dropdown mt-1 mb-1">
          <template #anchor>
            <va-badge class="color-picker-dropdown__badge" color="dark" text="Dark" />
          </template>

          <!-- <va-color-picker v-model="themes.dark" class="my-1" /> -->
        </va-dropdown>
      </div>
    </va-button-dropdown>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { watch } from 'vue'
import { Options, Vue, setup } from 'vue-class-component'
import { ThemeName } from '../../../theme-config'
import { capitalize } from 'lodash'
import { useTheme } from 'vuestic-ui'

@Options({})
export default class ColorDropdown extends Vue {
  data () {
    return {
      selectedTheme: ThemeName.DEFAULT,
      themeOptions: Object.keys(ThemeName).map(name => ({
        label: capitalize(name),
        value: name,
      })),
    }
  }

  get themeLabel () {
    return capitalize(this.selectedTheme)
  }

  created () {
    watch(() => this.selectedTheme, this.onThemeChanged)
  }

  onThemeChanged (themeName) {
    this.$root.eventBus.$emit('changeTheme', themeName.toUpperCase())
  }

  get themes () {
    return this.getColors()
  }

  getTheme = setup(() => {
    const { getTheme } = useTheme()
    return getTheme
  })
}
</script>

<style lang="scss">
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources";

.color-dropdown {
  .va-button-dropdown__content {
    background-color: white;
  }

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

    .color-picker-dropdown {
      display: flex;
      justify-content: center;

      &__badge {
        /* Badges have 0.5rem to the right by default */
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
