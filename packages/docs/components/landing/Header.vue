<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__inner">
        <div class="header__logo">
          <img src="../../assets/landing/images/logo.svg" alt="Vuestic UI">
          <div class="menu" @click="onClick(!isHidden)">
            <img src="../../assets/landing/images/hamburger.svg" alt="menu">
          </div>
        </div>
        <div class="header__links" ref="links">
          <!-- vuestic buttons -->
          <va-button class="header__links--link" flat color="#2550C0">Overview</va-button>
          <va-button class="header__links--link" flat color="#2550C0">Docs</va-button>
          <va-button class="header__links--link" flat color="#2550C0">Discord</va-button>
          <va-dropdown class="header__links--dropdown" v-model="value" :offset="[0, 25]" fixed>
            <va-button class="header__links--link" :iconRight="value ? 'expand_less' : 'expand_more'" flat slot="anchor" color="#2550C0">
              English
            </va-button>
          <va-list>
            <va-list-item style="display: flex; flex-direction: column; padding: 1rem;">
              <va-list-item-section>
                <span>English</span>
              </va-list-item-section>
            </va-list-item>
            <va-list-item style="display: flex; flex-direction: column; padding: 1rem;">
              <va-list-item-section>
                <span>中文</span>
              </va-list-item-section>
            </va-list-item>
            <va-list-item style="display: flex; flex-direction: column; padding: 1rem;">
              <va-list-item-section>
                <span>Add translation…</span>
              </va-list-item-section>
            </va-list-item>
          </va-list>
          </va-dropdown>
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
  isHidden = false
  width = 0

  onClick (value: boolean) {
    (this as any).$refs.links.style.display = value ? 'none' : 'flex'
    this.isHidden = value
  }

  onResize () {
    this.width = window.innerWidth
    if (this.width > 780) {
      this.onClick(false)
    } else if (this.width !== window.innerWidth) {
      this.onClick(true)
    }
  }

  mounted () {
    window.addEventListener('resize', this.onResize)
    this.width = window.innerWidth
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
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

    position: relative;
    align-items: center;
    height: 4.5rem;
    // @include sm(height, auto);
  }

  &__logo {
    @include col();
    @include size(4);
    @include size-sm(12);
    // @include sm(margin-top, 0.7rem);
    display: flex;
    justify-content: space-between;
  }

  &__links {
    @include col();
    @include size(8);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    // small
    @include sm(display, none);
    @include size-sm(12);
    @include sm(flex-direction, column);
    @include sm(background-color, #fff);
    @include sm(box-shadow, 0 0 29px 0 rgba(111,128,231,1));
    @include sm(padding, 0.5rem);
    @include sm(border-radius, 1.1rem);
    @include sm(position, absolute);
    @include sm(top, 4.5rem);
    @include sm(left, 0);

    &--link {
      @include link-font();

      line-height: 1.5rem;

      @include sm(width, 100%);
    }

    &--dropdown {
      @include sm(width, 100%);
    }
  }
}

.menu {
  display: none;

  @include sm(display, block);

  img {
    display: block;
  }
}
</style>
