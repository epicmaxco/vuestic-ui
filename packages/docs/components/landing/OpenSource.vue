<template>
  <section
    class="opensource"
    :style="{ color: textColor }"
  >
    <div class="opensource__wrapper">
      <div class="opensource__inner">
        <div class="opensource__info">
          <h2 class="opensource__title">
            {{ $t('landing.opensource.title') }}
          </h2>

          <div class="opensource__text">
            {{ $t('landing.opensource.text[0]') }}
            <a
              href="https://github.com/epicmaxco/vuestic-ui/issues"
              target="_blank"
            >
              {{ $t('landing.opensource.text[1]') }}
            </a>,
            <router-link :to="`/${locale}/contribution/documentation-page`">
              {{ $t('landing.opensource.text[2]') }}
            </router-link>
            {{ $t('landing.opensource.text[3]') }}
            <a
              href="https://discord.gg/u7fQdqQt8c"
              target="_blank"
            >
              {{ $t('landing.opensource.text[4]') }}
            </a>
            {{ $t('landing.opensource.text[5]') }}
          </div>
        </div>

        <div class="opensource__actions">
          <img
            src="/landing/image-open-source.png"
            alt="Open source"
            height="446"
            width="632"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useElementTextColor } from 'vuestic-ui'

const { locale } = useI18n()
const textColor = useElementTextColor('background-primary')
</script>

<style lang="scss" scoped>
@import "@/assets";

.opensource {
  $section-padding: 5rem 0 7rem;
  $section-xs-padding: 3.5rem 0 4rem;

  width: 100%;
  position: relative;
  padding: $section-padding;
  background-color: var(--va-background-secondary);

  @include xs(padding, $section-xs-padding);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__info {
    @include col();
    @include size(5);
    @include shift-left(1);

    display: flex;
    flex-direction: column;
    align-items: center;

    @include size-sm(12);
    @include shift-sm-left(0);
  }

  &__title {
    @include subtitle-font();

    width: 100%;

    @include sm(text-align, center);
  }

  &__text {
    @include text-font();

    margin-top: 1.5rem;
    max-width: 35rem;

    @include sm(text-align, center);
  }

  &__actions {
    @include col();
    @include size(6);

    @include sm(display, none);

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
