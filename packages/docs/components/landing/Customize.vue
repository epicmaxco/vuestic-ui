<template>
  <section class="customize">
    <div class="customize__wrapper">
      <div class="customize__inner">
        <h2 class="customize__title">
          {{ $t('landing.customize.title') }}
        </h2>

        <div class="customize__subtitle">
          {{ $t('landing.customize.text') }}
        </div>

        <div class="customize__buttons">
          <va-button
            class="customize__buttons-item"
            color="textInverted"
            text-color="primary"
            :to="`/${locale}/getting-started/installation`"
          >
            {{ $t('landing.preview.buttons.start') }}
          </va-button>
        </div>

        <div class="customize__image">
          <va-aspect-ratio :ratio="1337/192">
            <img
              src="/landing/customize-everything.png"
              :alt="$t('landing.customize.image')"
            >
          </va-aspect-ratio>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { locale } = useI18n()
</script>

<style lang="scss" scoped>
@import "@/assets";

.customize {
  $section-padding: 7.5rem 0 0;
  $section-xs-padding: 3.5rem 0 0;

  width: 100%;
  position: relative;
  padding: $section-padding;
  background: linear-gradient(180deg, var(--bg-customize-1), var(--bg-customize-2));
  color: var(--va-text-inverted);

  @include xs(padding, $section-xs-padding);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    flex-direction: column;
    align-items: center;
  }

  &__title {
    @include col();
    @include size(12);
    @include subtitle-font();

    text-align: center;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    margin-top: 1rem;
    text-align: center;
  }

  &__buttons {
    @include col();
    @include size(12);

    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  &__buttons-item {
    --va-button-content-px: 1.5rem;

    @include button-font();

    height: 3rem;

    :deep(.va-button__content) {
      font-size: inherit;
    }
  }

  &__image {
    @include col();
    @include size(12);

    padding-top: 3.5rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
