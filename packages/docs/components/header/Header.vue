<template lang="html">
  <div class="header row">
    <div class="header__logo flex row xs3">
      <img class="header__logo__image" src="../../assets/svg/vuestic-docs.svg" height="30" width="150" @click="toggleSidebar"/>
    </div>
    <div class="header__links flex xs3">
      <div v-for="link in links" class="header__link__wrapper flex">
        <a href="" class="header__link link flex-center">
          {{link.text}}
        </a>
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
import VaSelect from '../../../ui/src/components/vuestic-components/va-select/VaSelect.vue'
export default Vue.extend({
  components: {
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
          text: 'Overview'
        },
        {
          text: 'Documentation'
        },
        {
          text: 'GitHub'
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
    position: absolute;
    width: 100%;
    height: 64px;
    box-shadow: 0px 2px 8px rgba(122, 139, 173, 0.2);
    &, &__links, &__prefences, &__logo {
      
      @include va-flex-center();
      display: flex;
      justify-content: space-between;

      &__link {
        text-decoration: none;
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        height: 100%;
      }
    }
    &__logo {
      align-content: flex-start;

      &__image {
        max-width: 200px;
      }

    }
  }
</style>