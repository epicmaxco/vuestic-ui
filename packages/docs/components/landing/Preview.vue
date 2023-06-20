<template>
  <section class="preview">
    <div class="preview__wrapper">
      <div class="preview__inner">
        <h1 class="preview__title">
          Vue 3 UI Framework
        </h1>

        <div class="preview__buttons">
          <va-button
            class="preview__buttons--button"
            color="textInverted"
            text-color="primary"
            to="/getting-started/installation"
          >
            Get Started
          </va-button>

          <va-button
            class="preview__buttons--button"
            :preset="breakpoint.xs ? `primary` : `secondary`"
            text-color="textInverted"
            href="https://github.com/epicmaxco/vuestic-ui"
            target="_blank"
          >
            <template #prepend>
              <va-icon
                class="fa-brands fa-github"
                style="margin-right: 0.5rem;"
              />
            </template>
            View on GitHub
          </va-button>
        </div>

        <div class="preview__features">
          <va-aspect-ratio :ratio="1024/316">
            <img
              src="/landing/preview-features.svg"
              alt="Component examples"
            >
          </va-aspect-ratio>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBreakpoint } from 'vuestic-ui'

const breakpoint = useBreakpoint()
</script>

<style lang="scss" scoped>
@import "@/assets";

.preview {
  $section-padding: 3.5rem 0 0;
  $section-xs-padding: 2rem 0 0;

  width: 100%;
  position: relative;
  padding: $section-padding;
  background: linear-gradient(180deg, var(--bg-preview-1), var(--bg-preview-2));
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
    @include title-font();

    text-align: center;
  }

  &__buttons {
    @include col();
    @include size(12);
    @include row-flex();

    margin-top: 1rem;
    justify-content: center;
    align-items: center;

    &--button {
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
  }

  &__features {
    @include col();
    @include size(12);

    padding-top: 6rem;

    @include xs(padding-top, 4rem);

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
