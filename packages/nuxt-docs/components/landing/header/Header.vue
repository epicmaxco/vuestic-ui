<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__inner">
        <div class="header__logo">
          <!--        TODO: add root link-->
          <a href="/">
            <vuestic-logo
              height="30"
              width="150"
            />
          </a>
          <div
            class="menu"
            @click="isHidden = !isHidden"
            :style="{ position: !isHidden ? 'fixed' : 'absolute' }"
          >
            <img
              v-if="!isHidden"
              src="../../../assets/landing/images/hamburger.svg"
              alt="menu"
            >
            <img
              v-else
              src="../../../assets/landing/images/cross.svg"
              alt="menu"
            >
          </div>
        </div>
        <nav class="header__links">
          <!-- vuestic buttons -->
          <va-button
            :to="`/${locale}/introduction/overview`"
            class="header__links--link"
            flat
            color="primary"
          >{{ t('landing.header.buttons.overview') }}</va-button>
          <va-button
            :to="`/${locale}/introduction/roadmap`"
            class="header__links--link"
            flat
            color="primary"
          >{{ t('landing.header.buttons.docs') }}</va-button>
          <va-button
            href="https://discord.gg/u7fQdqQt8c"
            target="blank"
            class="header__links--link"
            flat
            color="primary"
          >{{ t('landing.header.buttons.discord') }}</va-button>
          <common-language-dropdown />
          <common-stars-button
            class="ml-2"
            repo="epicmaxco/vuestic-ui"
          />
        </nav>
        <!-- mobile -->
        <nav
          class="mobile-menu"
          :class="computedClass"
        >
          <va-list>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <router-link :to="`/${locale}/introduction/overview`">{{ t('landing.header.buttons.overview') }}</router-link>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <router-link :to="`/${locale}/introduction/roadmap`">{{ t('landing.header.buttons.docs') }}</router-link>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <a
                  href="https://discord.gg/u7fQdqQt8c"
                  target="_blank"
                >{{ t('landing.header.buttons.discord') }}</a>
              </va-list-item-section>
            </va-list-item>
            <va-list-label
              color="#757B83"
              class="mobile-menu__label"
            >
              {{ t('landing.header.buttons.language') }}
            </va-list-label>
            <div class="mobile-menu__languages">
              <va-list-item
                v-for="(language, id) in languages"
                :key="id"
                class="mobile-menu__language"
                :class="{ active: language.code === locale }"
                @click="locale = language.code"
              >
                <va-list-item-section class="mobile-menu__link">
                  <span class="language">{{ language.name }}</span>
                </va-list-item-section>
              </va-list-item>
              <va-list-item>
                <va-list-item-section class="mobile-menu__link">
                  <router-link
                    class="mobile-menu__language"
                    :to="`/${locale}/contribution/translation`"
                  >
                    {{ t('landing.header.buttons.translation') }}
                  </router-link>
                </va-list-item-section>
              </va-list-item>
            </div>

            <div class="star-button-wrapper">
              <common-stars-button repo="epicmaxco/vuestic-admin" />
            </div>
          </va-list>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { languages } from '../../../locales'
import CommonStarsButton from '../../common/CommonStarsButton.vue'
import CommonLanguageDropdown from '../../common/CommonLanguageDropdown.vue'
import VuesticLogo from './VuesticLogo.vue'

const { t, locale } = useI18n()

const isHidden = ref(true)

const computedClass = computed(() => ({
  'mobile-menu--open': !isHidden.value,
}))
</script>

<style lang="scss" scoped>
@import "../../../assets/main.scss";

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
    font-size: 10px;
    padding-top: 3rem;
    padding-bottom: 0.5rem;
  }

  &__link {
    @include link-font();

    text-align: center;

    span,
    a {
      color: #2550c0;
      padding: 0.5rem 0;

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
