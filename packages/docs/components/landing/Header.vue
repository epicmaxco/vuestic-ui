<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__inner">
        <div class="header__logo">
          <img src="../../assets/landing/images/logo.png" alt="Vuestic UI">
        </div>
        <div class="header__links">
          <a href="#" class="header__links--link">
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
          <button>&#10029; Star  780</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.header {
  z-index: 2000;
  position: fixed;
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

    &--link {
      padding-right: 1.5rem;
      color: $active-blue;
      font-weight: 600;
      line-height: 1.5rem;
    }
  }
}
</style>
