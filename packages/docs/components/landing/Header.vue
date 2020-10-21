<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__inner">
        <div class="header__logo">
          <img src="../../assets/landing/images/logo.png" alt="Vuestic UI">
        </div>
        <div class="header__links">
          <!-- vuestic buttons -->
          <va-button class="header__links--link" flat color="#2550C0">Overview</va-button>
          <va-button class="header__links--link" flat color="#2550C0">Docs</va-button>
          <va-button class="header__links--link" flat color="#2550C0">Discord</va-button>
          <va-dropdown v-model="value" :offset="[0, 25]" fixed>
            <va-button class="header__links--link" :iconRight="value ? 'expand_less' : 'expand_more'" flat slot="anchor" color="#2550C0">
              English
            </va-button>
          <va-list>
            languages
          </va-list>
          </va-dropdown>
          <!-- vuestic buttons -->
          <!-- <a href="#" class="header__links--link">
            Overview
          </a>
          <a href="#" class="header__links--link">
            Docs
          </a>
          <a href="#" class="header__links--link">
            Discord
          </a>
          <a href="#" class="header__links--link">
            English &#8659;
          </a>
          <button>&#10029; Star  780</button> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Header extends Vue {
  value = false
}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.header {
  z-index: 2000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
    height: 4.5rem;
  }

  &__logo {
    @include col();
    @include size(4);
  }

  &__links {
    @include col();
    @include size(8);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    // small
    @include sm(display, none);

    &--link {
      @include link-font();

      line-height: 1.5rem;
    }
  }
}
</style>
