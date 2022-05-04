<template>
  <section class="admin">
    <div class="admin__wrapper">
      <div class="admin__inner">
        <h2 class="admin__title">{{ $t('landing.admin.title') }}</h2>
        <div class="admin__subtitle">{{ $t('landing.admin.text') }}</div>
        <div class="admin__buttons">
          <va-button class="admin__buttons--button"
                     href="https://github.com/epicmaxco/vuestic-admin"
                     target="blank"
                     :rounded="false"
                     color="primary"
          >
            <va-icon class="fa fa-github" style="margin-right: 0.5rem;" />
            {{ $t('landing.admin.buttons.github') }}
          </va-button>
          <va-button class="admin__buttons--button"
                     href="https://vuestic.epicmax.co/admin/dashboard"
                     target="blank"
                     :rounded="false"
                     color="primary"
                     flat
          >
            {{ $t('landing.admin.buttons.demo') }}
          </va-button>
          <div class="admin__buttons--button">
            <stars-button repo="epicmaxco/vuestic-admin" />
          </div>
        </div>
        <div class="admin__content">
          <div class="admin__content__item admin__content__item--first">
            <img src="../../assets/landing/images/admin.png" alt="vuestic-admin">
          </div>
          <div class="admin__content__item admin__content__item--second">
            <!-- items -->
            <div class="items">
              <div class="item item--first">
                <div class="item__frame">
                  <img src="@/assets/landing/images/admin/open-source.svg" alt="open-source">
                </div>
                <h2 class="item__title">{{ $t('landing.admin.features.opensource') }}</h2>
              </div>

              <div class="item">
                <div class="item__frame">
                  <img src="@/assets/landing/images/admin/themes.svg" alt="themes">
                </div>
                <h2 class="item__title">{{ $t('landing.admin.features.themes') }}</h2>
              </div>

              <div class="item">
                <div class="item__frame">
                  <img src="@/assets/landing/images/admin/responsive.svg" alt="responsive">
                </div>
                <h2 class="item__title">{{ $t('landing.admin.features.responsive') }}</h2>
              </div>

              <div class="item">
                <div class="item__frame">
                  <img src="@/assets/landing/images/admin/i18n.svg" alt="i18n">
                </div>
                <h2 class="item__title">{{ $t('landing.admin.features.i18n') }}</h2>
              </div>
            </div>
            <!-- /items -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import StarsButton from './StarsButton.vue'

@Options({
  name: 'LandingAdmin',
  components: { StarsButton },
})
export default class Admin extends Vue {}
</script>

<style lang="scss" scoped>
@import 'src/assets/main';

.admin {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  padding-bottom: 8.5rem;
  background-color: $bg-light-sky;

  // sm
  @include sm(padding-top, 3rem);
  @include sm(padding-bottom, 5rem);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__title {
    @include col();
    @include size(12);
    @include title-font();

    padding-top: 3.5rem;
    text-align: center;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    padding-top: 1rem;
    line-height: 1.5;
    text-align: center;
  }

  &__buttons {
    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.5rem;

    // lg
    @include size-lg(10);
    @include shift-lg-left(1);
    // md
    @include size-md(6);
    @include shift-md-left(3);
    // xs
    @include size-xs(10);
    @include shift-xs-left(1);

    &--button {
      @include col();
      @include size(4);
      @include button-font();

      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;

      // md
      @include size-md(12);
      @include md(margin-bottom, 1rem);
      @include md(justify-content, center);
    }
  }

  &__content {
    @include row-flex();
    @include col();
    @include size(12);

    padding-top: 4rem;
    justify-content: center;

    &__item {
      &--first {
        @include col();
        @include size(8);
        @include shift-right(1);

        // md
        @include size-md(12);
        @include shift-md-right(0);

        img {
          object-fit: contain;
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

        // md
        @include size-md(12);
      }
    }
  }
}

.items {
  @include row-flex();

  .item {
    @include col();
    @include size(12);

    display: flex;
    align-items: center;
    padding-top: 2.2rem;

    // md
    @include size-md(6);
    // xs
    @include size-xs(12);

    &--first {
      padding-top: 0;

      // md
      @include md(padding-top, 2.2rem);
    }

    &__frame {
      display: inline-block;
      padding: 0.75rem;
      border: 1px dashed $gray;
      border-radius: 1rem;
    }

    &__title {
      @include text-font();

      padding-left: 1rem;
      line-height: 1.5;
    }
  }
}

.star-button {
  @include code-font();

  padding: 0 !important;
  color: #ffffff !important;
  height: 1.75rem;
}

</style>
