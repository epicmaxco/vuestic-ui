<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__inner">
        <div class="header__logo">
          <!--        TODO: add root link-->
          <a href="/"><img src="../../assets/landing/images/logo.svg" alt="Vuestic UI"></a>
          <div class="menu" @click="onClick(!isHidden)" :style="{position: !isHidden ? 'fixed' : 'absolute'}">
            <img v-if="!isHidden" src="../../assets/landing/images/hamburger.svg" alt="menu">
            <img v-else src="../../assets/landing/images/cross.svg" alt="menu">
          </div>
        </div>
        <nav class="header__links">
          <!-- vuestic buttons -->
          <va-button :round="false" :to="`/${$root.$i18n.locale}/introduction/overview`" class="header__links--link" flat color="#2550C0">{{$t('landing.header.buttons.overview')}}</va-button>
          <va-button :round="false" :to="`/${$root.$i18n.locale}/introduction/roadmap`" class="header__links--link" flat color="#2550C0">{{$t('landing.header.buttons.docs')}}</va-button>
          <va-button :round="false" href="https://discord.gg/jTKTjj2weV" target="blank" class="header__links--link" flat color="#2550C0">{{$t('landing.header.buttons.discord')}}</va-button>
          <va-dropdown class="language-dropdown"  fixed>
            <va-button class="header__links--link" iconRight="expand_more" flat :round="false" slot="anchor" color="#2550C0">
              {{ currentLanguageName }}
            </va-button>
            <va-list class="language-dropdown__content">
              <va-list-item
                v-for="(option, id) in options"
                :key="id"
                class="language-dropdown__item"
                :class="{ active: option.code === currentLanguage }"
                @click="setLanguage(option.code)"
              >
                <va-list-item-section>
                  <span class="dropdown-item__text">{{ option.name }}</span>
                </va-list-item-section>
              </va-list-item>
              <va-list-item class="language-dropdown__item">
                <va-list-item-section>
                  <nuxt-link
                    class="dropdown-item__text"
                    :to="`/${$root.$i18n.locale}/contribution/translation`"
                  >
                    {{$t('landing.header.buttons.translation')}}
                  </nuxt-link>
                </va-list-item-section>
              </va-list-item>

            </va-list>
          </va-dropdown>
          <va-button
            class="star-button star-button--desktop"
            href="https://github.com/epicmaxco/vuestic-ui"
            target="blank"
            :round="false"
            size="small"
            icon="star_empty"
          >
            {{$t('landing.header.buttons.star')}} {{stars}}
          </va-button>
        </nav>
        <!-- mobile -->
        <nav class="mobile-menu" :class="computedClass">
          <va-list>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <nuxt-link :to="`/${$root.$i18n.locale}/introduction/overview`">{{$t('landing.header.buttons.overview')}}</nuxt-link>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <nuxt-link :to="`/${$root.$i18n.locale}/introduction/roadmap`">{{$t('landing.header.buttons.docs')}}</nuxt-link>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <a href="https://discord.gg/jTKTjj2weV" target="_blank">{{$t('landing.header.buttons.discord')}}</a>
              </va-list-item-section>
            </va-list-item>
            <va-list-label color="#757B83" class="mobile-menu__label">
              {{$t('landing.header.buttons.language')}}
            </va-list-label>
            <div class="mobile-menu__languages">
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
                <nuxt-link
                  class="mobile-menu__language"
                  :to="`/${$root.$i18n.locale}/contribution/translation`"
                >
                  {{$t('landing.header.buttons.translation')}}
                </nuxt-link>
              </va-list-item-section>
            </va-list-item>
            <va-list-item class="star-button-wrapper">
              <va-button
                class="star-button"
                href="https://github.com/epicmaxco/vuestic-ui"
                target="blank"
                :round="false"
                size="small"
                icon="star_empty"
              >
                {{$t('landing.header.buttons.star')}} {{stars}}
              </va-button>
            </va-list-item>
          </va-list>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { languages } from './../languages'

@Component({
  name: 'language-dropdown',
})
export default class Header extends Vue {
  value = false
  isHidden = true
  stars = 0
  options = languages

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

  get currentLanguageName () {
    const result = (this as any).options.find(({ code }: any) => code === this.currentLanguage)
    return result.name
  }

  async beforeMount () {
    const resRepo = await fetch('https://api.github.com/repos/epicmaxco/vuestic-ui')
    const repo = await resRepo.json()
    this.stars = repo.stargazers_count
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
    @include size(3);
    @include size-sm(12);

    display: flex;
    justify-content: space-between;
  }

  &__links {
    @include col();
    @include size(9);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    @include sm(display, none);

    &--link {
      @include link-font();

      line-height: 1.5rem;
      margin-left: 0.5rem;
      letter-spacing: 0;

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
  cursor: pointer;

  @include sm(display, block);

  img {
    display: block;
  }
}

.language-dropdown {
  cursor: pointer;
  // TODO: fix dropdown
  max-height: 36px; // temporary solution

  @include sm(width, 100%);

  &__content {
    background-color: #f6f8f9;
    border-radius: 0.5rem;
    // min-width: 12rem;
    padding: 0.5rem 0;
  }

  &__item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    flex-wrap: nowrap;
    color: green;

    &:hover,
    &.active {
      .dropdown-item__text {
        color: #1b1a1f;
      }
    }
  }

  .dropdown-item__text {
    color: #2550c0;
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
  @include sm(padding, 1rem 0);
  @include sm(position, fixed);
  @include sm(top, 0);
  @include sm(left, 0);

  &--open {
    @include sm(display, flex);
  }

  &__languages {
    overflow: auto;
    height: 35vh;
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
    padding-top: 3rem;
    padding-bottom: 0.8rem;
  }

  &__link {
    @include link-font();

    text-align: center;

    span,
    a {
      color: #2550c0;
      padding: 0.8rem 0;

      &:hover {
        color: #1b1a1f;
      }
    }
  }
}

.star-button-wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
}

.star-button {
  @include code-font();

  min-height: 1.8rem;
  padding: 0 !important;

  &--desktop {
    margin-left: 0.5rem;
  }
}
</style>
