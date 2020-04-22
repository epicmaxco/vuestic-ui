<template>
  <va-dropdown class="color-dropdown" :offset="[0, 13]">
    <va-button
      slot="anchor"
      class="color-dropdown__icon"
      flat
      :color="$themes && $themes.primary"
    >
    {{selectedTheme}}
    </va-button>
    <div class="color-dropdown__content pl-4 pr-4 pt-2 pb-2">
      <va-button-toggle
        outline
        small
        v-model="selectedTheme"
        :options="themeOptions"
        style="max-width: 100%;"
      />
      <!-- <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="primary"
          slot="anchor"
        >
          Primary
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.primary"
        />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="secondary"
          slot="anchor"
        >
          Secondary
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.secondary"
        />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="success"
          slot="anchor"
        >
          Success
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.success"
        />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="info"
          slot="anchor"
        >
          Info
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.info"
        />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="danger"
          slot="anchor"
        >
          Danger
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.danger"
        />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="warning"
          slot="anchor"
        >
          Warning
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.warning"
        />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="gray"
          slot="anchor"
        >
          Gray
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.gray"
        />
      </va-dropdown>

      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="dark"
          slot="anchor"
        >
          Dark
        </va-badge>
        <va-advanced-color-picker
          class="my-1"
          v-model="$themes.dark"
        />
      </va-dropdown>-->
    </div>
  </va-dropdown>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue, Watch } from "vue-property-decorator";
import VaDropdown from "vuestic-ui/src/components/vuestic-components/va-dropdown/VaDropdown.vue";
import VaButtonToggle from "vuestic-ui/src/components/vuestic-components/va-button-toggle/VaButtonToggle.vue";
import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton.vue";
import {
  THEME_NAMES,
  COLOR_THEMES
} from "vuestic-ui/src/services/ColorThemePlugin.ts";

@Component({
  components: {
    VaDropdown,
    VaButtonToggle,
    VaButton,
  }
})
export default class ColorDropdown extends Vue {
  data() {
    return {
      selectedTheme: THEME_NAMES.CORPORATE,
      themeOptions: Object.keys(THEME_NAMES).map(name => ({label: name, value: name}))
    };
  }
  @Watch("selectedTheme")
  onThemeChanged(themeName) {
    console.log(themeName)
    this.$root.$emit("change-theme", themeName);
  }
}
</script>

<style lang="scss">
@import "../../../../ui/src/components/vuestic-sass/resources/resources";
.color-dropdown {
  cursor: pointer;

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: 0.5rem;

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
