<template>
  <footer
    class="footer"
    :style="{ color: textColor }"
  >
    <div class="footer__wrapper">
      <div class="footer__inner">
        <LandingEpicmaxBanner style="margin-bottom: 2rem;" />
        <div class="footer__buttons">
          <va-button
            class="footer__buttons__button"
            href="https://epicmax.co/about"
            target="blank"
            preset="plain"
            size="large"
          >
            <template #prepend>
              <va-icon
                class="button-icon"
                :component="IconEpicmaxRaw"
              />
            </template>
            {{ $t("landing.footer.buttons.epicmax") }}
          </va-button>
          <va-button
            class="footer__buttons__button"
            href="https://github.com/epicmaxco/vuestic-admin"
            target="blank"
            preset="plain"
            size="large"
          >
            <template #prepend>
              <va-icon
                class="button-icon"
                :component="IconAdminRaw"
              />
            </template>
            {{ $t("landing.footer.buttons.admin") }}
          </va-button>
          <va-button
            class="footer__buttons__button"
            href="https://github.com/epicmaxco/epic-spinners"
            target="blank"
            preset="plain"
            size="large"
          >
            <template #prepend>
              <va-icon
                class="button-icon"
                :component="IconSpinnersRaw"
              />
            </template>
            {{ $t("landing.footer.buttons.spinners") }}
          </va-button>
        </div>
        <div class="footer__social">
          <va-button
            class="footer__social__item"
            href="https://github.com/epicmaxco/vuestic-ui/"
            aria-label="go to the vuestic ui github page"
            target="blank"
            preset="plain"
          >
            <va-icon class="fa fa-github" />
          </va-button>
          <va-button
            class="footer__social__item"
            href="https://discord.gg/u7fQdqQt8c"
            aria-label="go to the vuestic ui discord channel"
            target="blank"
            preset="plain"
          >
            <va-icon class="fa fa-discord" />
          </va-button>
          <va-button
            class="footer__social__item"
            href="https://www.facebook.com/epicmaxco/"
            aria-label="go to the vuestic ui facebook page"
            target="blank"
            preset="plain"
          >
            <va-icon class="fa fa-facebook" />
          </va-button>
          <va-button
            class="footer__social__item"
            href="https://twitter.com/epicmaxco"
            aria-label="go to the vuestic ui twitter page"
            target="blank"
            preset="plain"
          >
            <va-icon class="fa fa-twitter" />
          </va-button>
        </div>
        <div class="footer__subtitle">
          © {{ currentYear }} {{ $t("landing.footer.text") }}
          <a
            :style="{ color: primaryColor }"
            href="mailto:hello@epicmax.co"
          >
            hello@epicmax.co
          </a>
        </div>
      </div>
      <!--      <LandingNewsBanner />-->
    </div>
  </footer>
</template>

<script lang="ts" setup>
import {markRaw} from 'vue'

import { useColors, useElementTextColor } from 'vuestic-ui'

import IconEpicmax from './icons/IconEpicmax.vue'
import IconAdmin from './icons/IconAdmin.vue'
import IconSpinners from './icons/IconSpinners.vue'
import LandingEpicmaxBanner from './EpicmaxBanner.vue'
// import LandingNewsBanner from './NewsBanner.vue'

const { getComputedColor } = useColors()

const textColor = useElementTextColor('background-primary')
const primaryColor = getComputedColor('primary')
const currentYear = new Date().getFullYear()

const IconEpicmaxRaw = markRaw(IconEpicmax)
const IconAdminRaw = markRaw(IconAdmin)
const IconSpinnersRaw = markRaw(IconSpinners)

useHead({
  link: [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
  ]
})
</script>

<style lang="scss" scoped>
@import "@/assets";

.footer {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  background: var(--va-background-secondary);

  // sm
  @include sm(padding-top, 1rem);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__image {
    @include col();
    @include size(12);

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 3.5rem;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    line-height: 1.5;
    padding: 3rem 0 4rem;
    text-align: center;

    // sm
    @include sm(padding-top, 2rem);
    @include sm(padding-bottom, 3rem);
  }

  &__buttons {
    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    justify-content: center;
    align-items: center;
    margin: 0 auto;

    &__button {
      --va-button-font-size: 1.2rem;

      @include col();
      @include size(4);
      @include button-font();

      // md
      @include md(margin-bottom, 1rem);

      width: auto;

      .va-icon {
        margin-right: 0.75rem;
      }
    }

    &__button + &__button {
      margin-left: 3rem;

      @include md(margin-left, 1rem);
      @include sm(margin-left, 1rem);
    }
  }

  &__social {
    @include col();
    @include size(12);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;

    // sm
    @include sm(padding-top, 1.5rem);

    &__item {
      font-weight: 600;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-size: 1rem;
    }
  }

  &__banner {
    width: 100%;
    display: flex;
    justify-content: center;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 4rem);
      background: linear-gradient(180.81deg, #182879 0.7%, #5b3c9b 99.3%);
      max-width: 53rem;
      margin: 0 2rem 2rem 2rem;
      padding: 1.7rem;
      color: #ffffff;
      border-radius: 0.5rem;

      @include sm(flex-direction, column);
      @include sm(align-items, start);
    }

    &-text {
      line-height: 1.5;
    }

    &-logo {
      margin-left: 3rem;

      @include sm(margin-top, 1rem);
      @include sm(align-self, end);
    }
  }
}
</style>
