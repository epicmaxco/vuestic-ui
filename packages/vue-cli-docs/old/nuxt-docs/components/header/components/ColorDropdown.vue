<template>
  <va-dropdown class="color-dropdown" :offset="[0, 13]">
    <va-button-dropdown
      slot="anchor"
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
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="primary" text="primary"/>
        <va-color-picker v-model="themes.primary" class="my-1" />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="secondary" text="secondary" />
        <va-color-picker v-model="themes.secondary" class="my-1" />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="success" text="Success"/>

        <va-color-picker v-model="themes.success" class="my-1" />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="info" text="Info"/>

        <va-color-picker v-model="themes.info" class="my-1" />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="danger" text="Danger"/>

        <va-color-picker v-model="themes.danger" class="my-1" />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="warning" text="Warning"/>

        <va-color-picker v-model="themes.warning" class="my-1" />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="gray" text="Gray"/>

        <va-color-picker v-model="themes.gray" class="my-1" />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge slot="anchor" class="color-picker-dropdown__badge" color="dark" text="Dark"/>

        <va-color-picker v-model="themes.dark" class="my-1" />
      </va-dropdown>
    </div>
    </va-button-dropdown>
  </va-dropdown>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ThemeName } from '../../../theme-config'
import { capitalize } from 'lodash'

@Component({})
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

  @Watch('selectedTheme')
  onThemeChanged (themeName) {
    this.$root.$emit('changeTheme', themeName.toUpperCase())
  }

  get themes () {
    return this.$themes || {}
  }
}
</script>

<style lang="scss">
@import "vuestic-ui/src/components/vuestic-sass/resources/resources";

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
