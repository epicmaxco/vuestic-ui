<template>
  <section class="admin">
    <div class="admin__wrapper">
      <div class="admin__inner">
        <h2 class="admin__title">
          Vuestic Admin
        </h2>

        <div class="admin__subtitle">
          Check out Vuestic UI Framework in action.
        </div>

        <div class="admin__buttons">
          <VaButton
            class="admin__buttons--button"
            href="https://github.com/epicmaxco/vuestic-admin"
            target="blank"
          >
            <template #prepend>
              <VaIcon
                class="fa-brands fa-github"
                style="margin-right: 0.5rem;"
              />
            </template>
            View on GitHub
          </VaButton>

          <VaButton
            class="admin__buttons--button"
            href="https://admin-demo.vuestic.dev/"
            target="blank"
            :preset="breakpoint.xs ? `primary` : `secondary`"
          >
            Live Demo
          </VaButton>

          <div class="admin__buttons--button stars-button">
            <LandingStarsButton
              repo="epicmaxco/vuestic-admin"
              border-radius="0.5rem"
            />
          </div>
        </div>

        <div class="admin__content">
          <div class="admin__content__item admin__content__item--first">
            <img
              src="/landing/admin/admin.png"
              alt="Vuestic Admin"
              height="555"
              width="875"
            >
          </div>

          <div class="admin__content__item admin__content__item--second">
            <ul class="items va-unordered">
              <li
                v-for="{ description } in items"
                :key="description"
                class="item my-2"
              >
                <h3 class="item__title">
                  {{ description }}
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import LandingStarsButton from './StarsButton.vue'

const breakpoint = useBreakpoint()

const items = [
  { description: 'Vue 3, Vite, Pinia, and Tailwind CSS' },
  { description: 'Responsive Design' },
  { description: 'Dark theme' },
  { description: 'Global Configuration' },
  { description: 'Professional Support' },
]
</script>

<style lang="scss" scoped>
@import '@/assets';

.admin {
  $section-padding: 7.5rem 0 10rem;
  $section-xs-padding: 3.5rem 0 4rem;

  width: 100%;
  position: relative;
  padding: $section-padding;
  color: var(--va-text);
  background-color: var(--bg-admin);

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
    @include row-flex();

    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;

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

      &.stars-button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__content {
    @include col();
    @include size(12);
    @include row-flex();

    margin-top: 4rem;
    justify-content: center;

    @include xs(margin-top, 2.5rem);

    &__item {
      &--first {
        @include col();
        @include size(8);

        display: flex;
        justify-content: center;

        @include size-sm(12);

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      &--second {
        @include col();
        @include size(3);

        display: flex;
        flex-direction: column;
        justify-content: center;

        @include size-sm(12);
      }
    }
  }
}

.items {
  @include row-flex();

  .item {
    $color: #6c7898;
    $icon-size: 4rem;
    $icon-size-xs: 3.5rem;

    @include col();
    @include size(12);

    display: flex;
    align-items: center;
    margin-top: 2rem;

    @include size-sm(6);
    @include size-xs(12);

    &:first-child {
      margin-top: 0;

      @include sm(margin-top, 2rem);
    }

    &__frame {
      width: $icon-size;
      height: $icon-size;
      display: inline-flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      border: 1px dashed $color;
      border-radius: 0.75rem;

      @include xs(width, $icon-size-xs);
      @include xs(height, $icon-size-xs);
    }

    &__title {
      @include text-font();

      // padding-left: 1rem;
    }

    &::before {
      margin-top: 0.6rem;
    }
  }
}
</style>
