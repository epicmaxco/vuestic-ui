<template>
  <section class="preview" :style="{ color: textColor }">
    <div class="preview__wrapper">
      <div class="preview__inner">
        <h1 class="preview__title">{{$t('landing.preview.title')}}</h1>
        <div class="preview__buttons">
          <va-button class="preview__buttons--button"
            :to="`/${$root.$i18n.locale}/getting-started/installation`"
          >
            {{$t('landing.preview.buttons.start')}}
          </va-button>
          <va-button class="preview__buttons--button" href="https://github.com/epicmaxco/vuestic-ui"
                       target="_blank"
                       preset="plain"
            >
              <va-icon class="fa fa-github" style="margin-right: 0.5rem;" />
              {{$t('landing.preview.buttons.github')}}
            </va-button>
        </div>
<!--        <div class="preview__image">-->
<!--          <div class="components-slideshow">-->
<!--            <div class="mover"></div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="preview__features">

          <!-- items -->
<!--          <div class="item">-->
<!--            <div class="item__frame">-->
<!--              <img src="@/assets/landing/images/features/nuxt-support.svg" alt="nuxt-support">-->
<!--            </div>-->
<!--            <h2 class="item__title">{{$t('landing.preview.features.nuxt.title')}}</h2>-->
<!--            <router-link class="item__link" :to="`/${$root.$i18n.locale}/getting-started/nuxt-integration`">-->
<!--              {{$t('landing.preview.features.nuxt.text')}}-->
<!--            </router-link>-->
<!--          </div>-->

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/components.svg" alt="responsive-components">
            </div>
            <h2 class="item__title">{{$t('landing.preview.features.components.title')}}</h2>
            <router-link class="item__link text--primary" :to="`/${$root.$i18n.locale}/ui-elements/alert`">
              {{$t('landing.preview.features.components.text')}}
            </router-link>
          </div>

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/keyboard-navigation.svg" alt="accessibility">
            </div>
            <h2 class="item__title">{{$t('landing.preview.features.accessibility.title')}}</h2>
            <router-link class="item__link text--primary" :to="`/${$root.$i18n.locale}/introduction/accessibility-guide`">
              {{$t('landing.preview.features.accessibility.text')}}
            </router-link>
          </div>

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/modern-browsers.svg" alt="modern-browsers">
            </div>
            <h2 class="item__title">{{$t('landing.preview.features.browsers.title')}}</h2>
            <router-link class="item__link text--primary" :to="`/${$root.$i18n.locale}/introduction/browser-support`">
              {{$t('landing.preview.features.browsers.text')}}
            </router-link>
          </div>
          <!-- /items -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useElementTextColor } from 'vuestic-ui/src/main'

export default {
  name: 'LandingPreview',

  setup () {
    return {
      textColor: useElementTextColor('background-primary'),
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "src/assets/main";

  .preview {
    width: 100%;
    position: relative;
    padding-top: 4.5rem;
    background: transparent;

    ::selection {
      -webkit-text-fill-color: white;
    }

    &__wrapper {
      @include wrapper();
    }

    &__inner {
      @include row-flex();

      align-items: center;
    }

    &__title {
      @include col();
      @include title-font();

      padding-top: 4.5rem;
      font-size: 5rem;
      width: 100%;
      text-align: center;
      background: -webkit-linear-gradient(315deg, #3be88e 12%, #0c33f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      // lg
      @include lg(padding-top, 5rem);
      @include lg(font-size, 4rem);

      // md
      @include md(font-size, 3.5rem);

      // sm
      @include sm(padding-top, 4rem);

      // xs
      @include xs(font-size, 3rem);
    }

    &__buttons {
      @include row-flex();
      @include col();

      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding-top: 1.5rem;

      &--button {
        @include button-font();

        margin-top: 1rem;
        height: 3rem;

        @include xs(width, 100%);
      }

      &--button:nth-child(1) {
        margin-right: 1rem;

        @include xs(margin-right, 0);
      }
    }

    &__image {
      position: absolute;
      // background-image: url("../../assets/landing/images/image-components.png");
      background-size: contain;
      background-repeat: repeat-x;
      background-position: top;
      height: 342px;
      top: 20rem;
      left: 0;
      width: 100%;
      z-index: 1;
    }

    &__features {
      @include row-flex();
      @include col();
      @include size(12);

      padding-top: 4rem;
      padding-bottom: 8rem;
      justify-content: center;

      @include sm(padding-bottom, 4rem);
    }
  }

  .va-button__content {
    height: 100%;
  }

  .item {
    @include col();
    @include size(3);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    // lg
    @include size-lg(6);
    @include lg(padding-bottom, 3rem);
    // sm
    @include size-sm(12);

    &__frame {
      display: inline-block;
      padding: 0.75rem;
      border: 1px dashed $gray;
      border-radius: 1rem;
    }

    &__title {
      @include subtitle-font();

      text-align: center;
      padding: 0.75rem 0 0.5rem;
      line-height: 1.5;
    }

    &__link {
      @include link-font();

      text-align: center;
      line-height: 1.6rem;
      color: var(--va-primary);
    }
  }

  ::v-deep(.va-dropdown__anchor) {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  ::v-deep(.va-dropdown__anchor a) {
    width: 100%;
  }

  .components-slideshow {
    height: 342px;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
  }

  //.components-slideshow .mover {
  //  width: 3153px;
  //  background: url(../../assets/landing/images/components.png);
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  height: 100%;
  //  animation: moveSlideshow 120s linear infinite;
  //  transform: translate3d(0, 0, 0);
  //}
  //
  //@keyframes moveSlideshow {
  //  100% {
  //    transform: translateX(-33.33333%);
  //  }
  //}
</style>
