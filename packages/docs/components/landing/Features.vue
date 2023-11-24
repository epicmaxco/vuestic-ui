<template>
  <section
    class="features"
    :style="{ color: textColor }"
  >
    <div class="features__wrapper">
      <div class="features__inner">
        <h2 class="features__title">
          Features
        </h2>

        <div class="features__description">
          Vuestic UI is an OpenSource Vue 3 based UI framework. It is a MIT-licensed UI framework that provides ready-to-use frontend components that are easily configurable and speed up development of responsive and fast-loading web interfaces. It was initially released in May 2021 by
          <a
            href="https://epicmax.co/"
            target="_blank"
            title="Epicmax - Top Vue.js Development Company"
          >
            Epicmax
          </a>
          and that is what Vuestic UI today.
        </div>

        <div class="features__items">
          <div
            v-for="{ icon, description } in features"
            :key="description"
            class="features__item"
          >
            <img
              :src="icon"
              alt=""
              class="features__item-icon"
            >
            <p class="features__item-description">
              {{ description }}
            </p>
          </div>

          <div class="features__item">
            <img
              src="/landing/features/features-support.svg"
              alt=""
              class="features__item-icon"
            >
            <p class="features__item-description">
              Professional support: Fast and reliable assistance from
              <RouterLink to="/introduction/team">
                the core team
              </RouterLink>
              &#160;&#x1fac2;
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useElementTextColor } from 'vuestic-ui'

const textColor = useElementTextColor('background-secondary')

const features = [
  { icon: '/landing/features/features-compatible.svg', description: 'Vue 3 compatible: Seamless Vue.js integration\u00A0\uD83E\uDD18' },
  { icon: '/landing/features/features-accessible.svg', description: 'Accessible: designed for all users\u00A0❗' },
  { icon: '/landing/features/features-responsive.svg', description: 'Responsive: Adapts to various screens and devices' },
  { icon: '/landing/features/features-configure.svg', description: 'Global config: Customize components effortlessly' },
  { icon: '/landing/features/features-theme.svg', description: 'Dark Theme: Stylish built-in dark mode\u00A0\uD83D\uDDA4' },
  { icon: '/landing/features/features-integrates.svg', description: 'i18n integration: Simplifies app localization' },
  { icon: '/landing/features/features-customizable.svg', description: 'Customizable: Adapt components to your design\u00A0\uD83D\uDC85' },
]
</script>

<style lang="scss" scoped>
@import "@/assets";

.features {
  $section-padding: 7.5rem 0;
  $section-xs-padding: 3.5rem 0;
  $icon-size: 2.5rem;

  width: 100%;
  position: relative;
  padding: $section-padding;
  background-color: var(--va-background-secondary);

  @include xs(padding, $section-xs-padding);

  &__wrapper {
    @include wrapper(1080px);
  }

  &__inner {
    @include row-flex();

    flex-direction: column;
  }

  &__title {
    @include col();
    @include size(12);
    @include subtitle-font();
  }

  &__description {
    @include col();
    @include size(12);
    @include text-font();

    max-width: 40rem;
    margin-top: 1rem;

    @include sm(max-width, unset);
  }

  &__items {
    @include col();
    @include size(12);

    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;

    @include xs(margin-top, 1rem);
    @include xs(flex-direction, column);
    @include xs(align-items, center);
  }

  &__item {
    @include size(3);

    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    margin-right: 2rem;
    min-height: 10rem;
    min-width: 8rem;

    @include size-sm(4);
    @include size-xs(12);
    @include xs(margin-right, 0);
    @include xs(min-height, 8rem);
    @include xs(align-items, center);
  }

  &__item-icon {
    width: $icon-size;
    height: $icon-size;
  }

  &__item-description {
    @include text-font();

    margin-top: 0.75rem;

    @include xs(max-width, 20rem);
    @include xs(text-align, center);
  }
}
</style>
