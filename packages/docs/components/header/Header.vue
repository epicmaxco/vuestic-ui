<template lang="html">
  <div class="header row">
    <div class="header__logo flex row xs3">
      <header-selector :minimized="isSidebarVisible"></header-selector>
      <img class="header__logo__image" src="../../assets/svg/vuestic-docs.svg" height="30" width="150" @click="toggleSidebar"/>
    </div>
    <div class="header__links flex xs3">
      <div v-for="link in links" class="header__link__wrapper flex">
        <va-button
          flat
          class="header__links__button"
          color="primary"
          href="https://github.com/epicmaxco/vuestic-admin"
          target="_blank"
        >
         <i class="button__icon" :class="link.icon"/>
          {{link.text}}
        </va-button>
      </div>
    </div>
    <div class="header__prefences flex xs3">
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
      />
      <va-select
        :options="defaultSelect.options"
        v-model="defaultSelect.value"
        noClear
        width="95%"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import VaButtonDropdown from '../../../ui/src/components/vuestic-components/va-button-dropdown/VaButtonDropdown.vue'
import VaButton from '../../../ui/src/components/vuestic-components/va-button/VaButton.vue'
import VaSelect from '../../../ui/src/components/vuestic-components/va-select/VaSelect.vue'
import HeaderSelector from './app-navbar/components/HeaderSelector.vue'

export default Vue.extend({
  components: {
    VaButtonDropdown,
    VaButton,
    HeaderSelector,
    VaSelect
  },
  props: {
    isSidebarVisible: {
      type: Boolean as Prop<boolean>,
      
    }
  },
  data() {
    return {
      defaultSelect: {
        options: ['one', 'two', 'three'],
        value: 'one',
      },
      links: [
        {
          text: 'Overview',
          icon: 'vuestic-iconset-dashboard'
        },
        {
          text: 'Documentation',
          icon: 'fa fa-cube'
        },
        {
          text: 'GitHub',
          icon: 'fa fa-github'
        },
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('update:isSidebarVisible', !this.isSidebarVisible)
    }
  }  
})
</script>

<style lang="scss" scoped>
  @import '../../../ui/src/components/vuestic-sass/resources/resources';
  @import '../../../ui/src/components/vuestic-sass/grid/grid-global-styles';
  @import '../../../ui/src/components/vuestic-sass/global/typography';

  .header {
    position: fixed;
    width: 100%;
    height: 64px;
    box-shadow: 0px 2px 8px rgba(122, 139, 173, 0.2);
    &__links__button {
      font-weight: bold;
      .button__icon {
        margin-right: .5em
      }
    }

    &, &__links, &__prefences, &__logo {
      
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
  }
</style>