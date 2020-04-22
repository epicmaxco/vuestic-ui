<template lang="html">
  <div class="header row">
    <div class="header__logo flex row xs3">
      <header-selector :minimized="isSidebarVisible" @toggleSidebar="toggleSidebar"></header-selector>
      <img class="header__logo__image" src="../../assets/svg/vuestic-docs.svg" height="30" width="150"/>
    </div>
    <div class="header__links flex xs3">
      <div v-for="link in links" class="header__link__wrapper flex">
        <va-button
          flat
          class="header__links__button"
          color="primary"
          href="https://github.com/epicmaxco/vuestic-ui"
          target="_blank"
        >
         <i class="button__icon" :class="link.icon"/>
          {{link.text}}
        </va-button>
      </div>
    </div>
    <div class="header__prefences flex xs3">
      <va-button-dropdown
        class="header__prefences__dropdown"
        :buttonProps="{
          flat: true
        }"
        color="primary" 
        :label="defaultSelect.value"
      >
        <div
          v-for="(option, index) in defaultSelect.options"
          class="header__prefences__option"
          @click="selectOption(option)"
        >
          {{option}}
        </div>
      </va-button-dropdown>
      <va-button-dropdown
        class="header__prefences__dropdown"
        :buttonProps="{
          flat: true
        }"
        color="primary" 
        :label="defaultSelect.value"
      >
        <div
          v-for="(option, index) in defaultSelect.options"
          class="header__prefences__option"
          @click="selectOption(option)"
        >
          {{option}}
        </div>
      </va-button-dropdown>
        <language-dropdown/>
        <color-dropdown/>
      <!-- <va-select
        :options="defaultSelect.options"
        v-model="defaultSelect.value"
        noClear
        width="95%"
      />
      <va-select
        :options="defaultSelect.options"
        v-model="defaultSelect.value"
        noClear
        width="95%"
      />
      <va-select
        :options="defaultSelect.options"
        v-model="defaultSelect.value"
        noClear
        width="95%"
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator'
import { Prop } from "vue/types/options";
import VaButtonDropdown from "../../../ui/src/components/vuestic-components/va-button-dropdown/VaButtonDropdown.vue";
import LanguageDropdown from "./components//LanguageDropdown.vue";
import ColorDropdown from "./components//ColorDropdown.vue";
import VaButton from "../../../ui/src/components/vuestic-components/va-button/VaButton.vue";
import VaSelect from "../../../ui/src/components/vuestic-components/va-select/VaSelect.vue";
import HeaderSelector from "./components/HeaderSelector.vue";
@Component({
  props: {
    isSidebarVisible: {
      type: Boolean as Prop<boolean>
    }
  },
  components: {
    VaButtonDropdown,
    VaButton,
    HeaderSelector,
    VaSelect,
    LanguageDropdown,
    ColorDropdown,
  }
  })
export default class Header extends Vue {
  data() {
    return {
      isHovered: [],
      version: {options: ['v1.0'], value:'v1.0'},
      defaultSelect: {
        options: ["one", "two", "three"],
        value: "one"
      },
      links: [
        {
          text: "Overview",
          icon: "vuestic-iconset-dashboard"
        },
        {
          text: "Documentation",
          icon: "fa fa-cube"
        },
        {
          text: "GitHub",
          icon: "fa fa-github"
        }
      ]
    };
  }
    selectOption(option: string) {
      this.defaultSelect.value = option;
    }
    toggleSidebar() {
      this.$emit("update:isSidebarVisible", !this.isSidebarVisible);
    }
  
};
</script>

<style lang="scss" scoped>
@import "../../../ui/src/components/vuestic-sass/resources/resources";
@import "../../../ui/src/components/vuestic-sass/grid/grid-global-styles";
@import "../../../ui/src/components/vuestic-sass/global/typography";

.header {
  position: fixed;
  width: 100%;
  height: 64px;
  box-shadow: 0px 2px 8px rgba(122, 139, 173, 0.2);
  &__links__button {
    font-weight: bold;
    .button__icon {
      margin-right: 0.5em;
    }
  }

  &,
  &__links,
  &__prefences,
  &__logo {
    @include va-flex-center();
    display: flex;
    justify-content: space-between;
  }
  &__logo {
    justify-content: flex-start;

    &__image {
      max-width: 200px;
    }
  }
  &__prefences {
    justify-content: flex-end;
    font-weight: bold;
    &__dropdown {
      max-width:  100px;
    }
    &__option {
      padding: 5px;
    }
  }
}
</style>