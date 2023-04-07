<template>
  <section
    class="opensource"
    :style="{ color: textColor }"
  >
    <div class="opensource__wrapper">
      <div class="opensource__inner">
        <div class="opensource__info">
          <div class="opensource__icon">
            <img
              src="/landing/icon-open-source.svg"
              alt="Open source"
              height="100"
              width="100"
            >
          </div>
          <h2 class="opensource__title">
            {{ $t('landing.opensource.title') }}
          </h2>
          <div class="opensource__text">
            {{ $t('landing.opensource.text[0]') }}
            <a
              class="text--primary"
              href="https://github.com/epicmaxco/vuestic-ui/issues"
              target="_blank"
            >{{ $t('landing.opensource.text[1]') }}</a>,
            <router-link :to="`/${locale}/contribution/documentation-page`">
              {{ $t('landing.opensource.text[2]') }}
            </router-link>
            {{ $t('landing.opensource.text[3]') }}
            <a
              class="text--primary"
              href="https://discord.gg/u7fQdqQt8c"
              target="_blank"
            >{{ $t('landing.opensource.text[4]') }}</a>
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

<script lang="ts">
import { useElementTextColor } from 'vuestic-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LandingOpenSource',

  setup () {
    const { locale } = useI18n()

    return {
      locale,
      textColor: useElementTextColor('background-primary'),
    }
  },
})
</script>

<style lang="scss" scoped>
@import "@/assets";

.opensource {
  width: 100%;
  background-color: var(--va-background-secondary);
  position: relative;
  padding-top: 10rem;
  padding-bottom: 10rem;
  background-image: url("/landing/pattern-2.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;

  // sm
  @include sm(padding-top, 5rem);
  @include sm(padding-bottom, 5rem);

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

    // sm
    @include size-sm(12);
    @include shift-sm-left(0);
  }

  &__title {
    @include title-font();

    padding-bottom: 1rem;

    // sm
    @include sm(text-align, center);
  }

  &__icon {
    display: flex;
    user-select: none;
    pointer-events: none;
    // sm
    @include sm(justify-content, center);
  }

  &__text {
    @include text-font();

    line-height: 1.5;

    // sm
    @include sm(text-align, center);

    a {
      color: var(--va-primary);
    }
  }

  &__actions {
    @include col();
    @include size(6);

    // sm
    @include size-sm(8);
    @include shift-sm-left(2);
    @include sm(padding-top, 1rem);
    // xs
    @include size-xs(12);
    @include shift-xs-left(0);

    user-select: none;
    pointer-events: none;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
