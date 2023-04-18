<template>
  <footer
    class="footer"
    :style="{ color: textColor }"
  >
    <div class="footer__wrapper">
      <div class="footer__inner">
        <div class="footer__sitemap">
          <div
            v-for="{ title, items } in sitemap"
            :key="title"
            class="footer__sitemap-item"
          >
            <h4 class="footer__sitemap-item__title">
              {{ $t(title) }}
            </h4>
            <ul class="footer__sitemap-item__list">
              <li
                v-for="item in items"
                :key="item.label"
              >
                <component
                  :is="item.component"
                  :[item.prop]="item.value"
                  :target="item.component === 'a' && !item.value.startsWith('mailto:') ? '_blank' : undefined"
                  class="footer__sitemap-item__list-item"
                >
                  {{ $t(item.label) }}
                </component>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__banner">
          <LandingEpicmaxBanner />
        </div>

        <div class="footer__buttons">
          <va-button
            v-for="{ href, icon, label } in buttons"
            :key="label"
            class="footer__buttons__button"
            :href="href"
            target="blank"
            :preset="breakpoint.xs ? `primary` : `secondary`"
            size="large"
          >
            <template #prepend>
              <va-icon
                class="footer__buttons__icon"
                :component="icon"
              />
            </template>
            {{ $t(label) }}
          </va-button>
        </div>

        <SocialsLinks class="footer__socials" />

        <div class="footer__subtitle">
          © {{ currentYear }} {{ $t("landing.footer.text") }}
          <a
            href="mailto:hello@epicmax.co"
            target="_blank"
          >
            hello@epicmax.co
          </a>
        </div>
      </div>
      <!--<LandingNewsBanner />-->
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { markRaw } from 'vue'

import { useElementTextColor, useBreakpoint } from 'vuestic-ui'

import IconEpicmax from './icons/IconEpicmax.vue'
import IconAdmin from './icons/IconAdmin.vue'
import IconSpinners from './icons/IconSpinners.vue'
import LandingEpicmaxBanner from './EpicmaxBanner.vue'
import SocialsLinks from './SocialsLinks.vue'
// import LandingNewsBanner from './NewsBanner.vue'

const { locale } = useI18n()
const breakpoint = useBreakpoint()
const textColor = useElementTextColor('background-secondary')
const currentYear = new Date().getFullYear()

const IconEpicmaxRaw = markRaw(IconEpicmax)
const IconAdminRaw = markRaw(IconAdmin)
const IconSpinnersRaw = markRaw(IconSpinners)

const buttons = [
  { href: 'https://epicmax.co/about', icon: IconEpicmaxRaw, label: 'landing.footer.buttons.epicmax' },
  { href: 'https://github.com/epicmaxco/vuestic-admin', icon: IconAdminRaw, label: 'landing.footer.buttons.admin' },
  { href: 'https://github.com/epicmaxco/epic-spinners', icon: IconSpinnersRaw, label: 'landing.footer.buttons.spinners' },
]

const sitemap = [
  {
    title: 'landing.footer.sitemap.resources[0]',
    items: [
      { label: 'landing.footer.sitemap.resources[1]', component: 'router-link', prop: 'to', value: `/${locale.value}/getting-started/installation` },
      { label: 'landing.footer.sitemap.resources[2]', component: 'router-link', prop: 'to', value: `/${locale.value}/introduction/roadmap` },
      { label: 'landing.footer.sitemap.resources[3]', component: 'router-link', prop: 'to', value: `/${locale.value}/introduction/accessibility-guide` },
    ]
  },
  {
    title: 'landing.footer.sitemap.support[0]',
    items: [
      { label: 'landing.footer.sitemap.support[1]', component: 'a', prop: 'href', value: 'https://github.com/epicmaxco/vuestic-ui/' },
      { label: 'landing.footer.sitemap.support[2]', component: 'a', prop: 'href', value: 'https://github.com/epicmaxco/vuestic-ui/issues/new/choose' },
      { label: 'landing.footer.sitemap.support[3]', component: 'router-link', prop: 'to', value: `/${locale.value}/contribution/guide` },
    ]
  },
  {
    title: 'landing.footer.sitemap.community[0]',
    items: [
      { label: 'landing.footer.sitemap.community[1]', component: 'a', prop: 'href', value: 'https://github.com/epicmaxco/vuestic-ui/' },
      { label: 'landing.footer.sitemap.community[2]', component: 'a', prop: 'href', value: 'https://discord.com/invite/u7fQdqQt8c' },
      { label: 'landing.footer.sitemap.community[3]', component: 'a', prop: 'href', value: 'https://twitter.com/vuestic_ui' },
    ]
  },
  {
    title: 'landing.footer.sitemap.about[0]',
    items: [
      { label: 'landing.footer.sitemap.about[1]', component: 'router-link', prop: 'to', value: `/${locale.value}/introduction/team` },
      { label: 'landing.footer.sitemap.about[2]', component: 'a', prop: 'href', value: 'mailto:hello@epicmax.co' },
      { label: 'landing.footer.sitemap.about[3]', component: 'a', prop: 'href', value: 'mailto:hello@epicmax.co?subject=VuesticUI Partnership' },
    ]
  },
]
</script>

<style lang="scss" scoped>
@import "@/assets";

.footer {
  $section-padding: 2rem 0 3.5rem;
  $section-xs-padding: 1rem 0 3.5rem;

  width: 100%;
  position: relative;
  padding: $section-padding;
  background: var(--va-background-secondary);

  @include xs(padding, $section-xs-padding);

  &__wrapper {
    @include wrapper(1024px);
  }

  &__inner {
    @include row-flex();

    flex-direction: column;
    align-items: center;
  }

  &__sitemap {
    @include col();
    @include size(12);
    @include row-flex();

    justify-content: center;
  }

  &__sitemap-item {
    @include col();
    @include size(3);

    margin-top: 3rem;

    @include size-sm(6);

    &__title {
      @include text-font();

      font-weight: 600;
    }

    &__list {
      li {
        margin-top: 1rem;
      }
    }

    &__list-item {
      @include text-font();

      color: inherit;
      line-height: 1;

      &:active,
      &:visited,
      &:hover {
        color: unset;
        filter: unset;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__banner {
    @include col();
    @include size(12);

    margin-top: 2.5rem;
  }

  &__buttons {
    @include col();
    @include size(12);
    @include row-flex();

    justify-content: center;
    align-items: center;
    margin-top: 1.25rem;

    &__button {
      --va-button-content-px: 1.5rem;

      @include button-font();

      margin: 1rem 0.5rem 0;
      height: 3rem;

      @include xs(width, 100%);
      @include xs(margin, 1rem 1rem 0);

      :deep(.va-button__content) {
        font-size: inherit;
      }
    }

    &__icon {
      margin-right: 0.5rem;
    }
  }

  &__socials {
    @include col();
    @include size(12);

    margin-top: 2.5rem;

    @include xs(margin-top, 2rem);
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    margin-top: 2.5rem;
    text-align: center;

    @include xs(margin-top, 2rem);
  }
}
</style>
