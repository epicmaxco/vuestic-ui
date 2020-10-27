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
        <div class="header__links" :class="computedClass" ref="links">
          <!-- vuestic buttons -->
          <va-button class="header__links--link" flat color="#2550C0">{{$t('landing.header.buttons.overview')}}</va-button>
          <va-button class="header__links--link" flat color="#2550C0">{{$t('landing.header.buttons.docs')}}</va-button>
          <va-button class="header__links--link" flat color="#2550C0">{{$t('landing.header.buttons.discord')}}</va-button>
          <va-dropdown class="language-dropdown"  :offset="[0, 25]" fixed>
            <va-button class="header__links--link" iconRight="expand_more" flat square slot="anchor" color="#2550C0">
              {{ $t(`language.${currentLanguage}`) }}
            </va-button>
            <va-list class="language-dropdown__content">
              <va-list-item
                v-for="(option, id) in options"
                :key="id"
                class="language-dropdown__item"
                :class="{ active: option.code === currentLanguage }"
                @click="setLanguage(option.code)"
              >
                <va-list-item-section :style="{color: '#2550C0'}">
                  <span class="dropdown-item__text">{{ $t(`language.${option.code}`) }}</span>
                </va-list-item-section>
              </va-list-item>
              <va-list-item>
                <va-list-item-section :style="{color: '#2550C0', padding: '0.5rem'}">
                  <va-button outline :round="false" size="small" color="#2550C0">{{$t('landing.header.buttons.translation')}}</va-button>
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

@Component({
  name: 'language-dropdown',
  props: {
    options: {
      type: Array,
      default: () => [
        {
          code: 'en',
          name: 'english',
        },
        {
          code: 'es',
          name: 'spanish',
        },
        {
          code: 'br',
          name: 'brazilian_portuguese',
        },
        {
          code: 'cn',
          name: 'simplified_chinese',
        },
      ],
    },
  },
})
export default class Header extends Vue {
  value = false
  isHidden = true
  width = 0

  onClick (value: boolean) {
    this.isHidden = value
  }

  get computedClass () {
    return {
      'header__links--mobile': window.innerWidth < 780,
      'header__links--mobile--open': window.innerWidth < 780 && !this.isHidden,
    }
  }

  setLanguage (locale: any) {
    localStorage.setItem('currentLanguage', locale)
    ;(this as any).$root.$i18n.setLocale(locale)
  }

  get currentLanguage () {
    return (this as any).$root.$i18n.locale
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
  }

  &__logo {
    @include col();
    @include size(4);
    @include size-sm(12);

    display: flex;
    justify-content: space-between;
  }

  &__links {
    @include col();
    @include size(8);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    &--mobile {
      // sm
      @include size-sm(12);
      @include sm(display, none);
      @include sm(flex-direction, column);
      @include sm(background-color, #fff);
      @include sm(box-shadow, 0 0 29px 0 rgba(111,128,231,0.5));
      @include sm(padding, 0.5rem);
      @include sm(border-radius, 1.1rem);
      @include sm(position, absolute);
      @include sm(top, 4.5rem);
      @include sm(left, 0);

      &--open {
        display: flex;
      }
    }

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

.language-dropdown {
  cursor: pointer;

  &__content {
    background-color: #f6f8f9;
    border-radius: 0.5rem;
    // width: 12rem;
    padding: 0.5rem 0;
  }

  &__item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    flex-wrap: nowrap;

    &:hover,
    &.active {
      .dropdown-item__text {
        color: #1b1a1f;
      }
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
