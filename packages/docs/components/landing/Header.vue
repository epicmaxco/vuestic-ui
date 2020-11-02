<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__inner">
        <div class="header__logo">
          <img src="../../assets/landing/images/logo.svg" alt="Vuestic UI">
          <div class="menu" @click="onClick(!isHidden)" :style="{position: !isHidden ? 'fixed' : 'absolute'}">
            <img v-if="!isHidden" src="../../assets/landing/images/hamburger.svg" alt="menu">
            <img v-else src="../../assets/landing/images/cross.svg" alt="menu">
          </div>
        </div>
        <div class="header__links">
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
        <!-- mobile -->
        <div class="mobile-menu" :class="computedClass">
          <va-list>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <a href="">{{$t('landing.header.buttons.overview')}}</a>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <a href="">{{$t('landing.header.buttons.docs')}}</a>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <a href="">{{$t('landing.header.buttons.discord')}}</a>
              </va-list-item-section>
            </va-list-item>
            <va-list-label color="#757B83" class="mobile-menu__label">
              Language
            </va-list-label>
            <div style="overflow: auto; height: 40vh;">
            <va-list-item
              v-for="(option, id) in options"
              :key="id"
              class="mobile-menu__language"
              :class="{ active: option.code === currentLanguage }"
              @click="setLanguage(option.code)"
            >
              <va-list-item-section class="mobile-menu__link">
                <span class="language">{{ option.name }}</span>
              </va-list-item-section>
            </va-list-item>
            </div>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <a href="">Add translation...</a>
              </va-list-item-section>
            </va-list-item>
          </va-list>
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
          name: 'English',
        },
        {
          code: 'es',
          name: 'Español',
        },
        {
          code: 'ru',
          name: 'Русский',
        },
        {
          code: 'by',
          name: 'Беларуская',
        },
        {
          code: 'ru',
          name: 'Русский',
        },
        {
          code: 'ru',
          name: 'Русский',
        },
        {
          code: 'ru',
          name: 'Русский',
        },
        {
          code: 'cn',
          name: '简体中文',
        },
      ],
    },
  },
})
export default class Header extends Vue {
  value = false
  isHidden = true

  onClick (value: boolean) {
    this.isHidden = value
  }

  get computedClass () {
    return {
      'mobile-menu--open': !this.isHidden,
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

    @include sm(display, none);

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
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  z-index: 1000;
  display: none;

  @include sm(display, block);

  img {
    display: block;
  }
}

.language-dropdown {
  cursor: pointer;

  @include sm(width, 100%);

  &__content {
    background-color: #f6f8f9;
    border-radius: 0.5rem;
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

.mobile-menu {
  display: none;

  @include col();
  @include size-sm(12);
  @include sm(margin, 0);
  @include sm(width, 100%);
  @include sm(height, 100vh);
  @include sm(flex-direction, column);
  @include sm(justify-content, center);
  @include sm(background-color, #fff);
  @include sm(padding, 0.5rem);
  @include sm(position, fixed);
  @include sm(top, 0);
  @include sm(left, 0);

  &--open {
    @include sm(display, flex);
  }

  &__language {
    &.active {
      .language {
        color: #1b1a1f;
      }
    }
  }

  &__label {
    font-size: 12px;
    padding-top: 5rem;
    padding-bottom: 1rem;
  }

  &__link {
    @include link-font();

    text-align: center;

    span,
    a {
      color: #2550c0;
      padding: 1rem 0;

      &:hover {
        color: #1b1a1f;
      }
    }
  }
}
</style>
