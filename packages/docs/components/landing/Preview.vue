<template>
  <div class="preview">
    <div class="preview__wrapper">
      <div class="preview__inner">
        <div class="preview__title">Vue.js UI Library</div>
        <div class="preview__buttons">
          <va-button class="preview__buttons--button"
            :round="false"
            color="#2550C0"
          >
            Get started
          </va-button>
          <va-button class="preview__buttons--button"
            :round="false"
            color="#2550C0"
            flat icon="github"
          >
            View on GitHub
          </va-button>
        </div>
        <div class="preview__image">
          <div class="components-slideshow">
            <div class="mover"></div>
          </div>
        </div>
        <div class="preview__features">

          <!-- items -->
          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/nuxt-support.svg" alt="nuxt-support">
            </div>
            <h2 class="item__title">Nuxt support</h2>
            <a href="#" class="item__link">Nuxt integration guides</a>
          </div>

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/components.svg" alt="responsive-components">
            </div>
            <h2 class="item__title">52 Responsive Components</h2>
            <a href="#" class="item__link">Available components docs</a>
          </div>

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/keyboard-navigation.svg" alt="keyboard-navigation">
            </div>
            <h2 class="item__title">Keyboard Navigation</h2>
            <a href="#" class="item__link">Accessibility guides</a>
          </div>

          <div class="item">
            <div class="item__frame">
              <img src="@/assets/landing/images/features/modern-browsers.svg" alt="modern-browsers">
            </div>
            <h2 class="item__title">Modern Browsers Support</h2>
            <a href="#" class="item__link">Supported browsers list</a>
          </div>
          <!-- /items -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Preview extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.preview {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  background: transparent;

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
    font-weight: 900;
    font-size: 4.5rem;

    // sm
    @include sm(padding-top, 2rem);
  }

  &__buttons {
    @include row-flex();
    @include col();
    @include size(6);
    @include shift-left(3);

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
      // md
      @include size-md(12);
      @include md(margin-bottom, 1rem);
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
    padding-top: 30rem;
    padding-bottom: 8rem;

    @include row-flex();
    @include col();
    @include size(12);

    justify-content: center;

    // sm
    @include sm(padding-top, 26rem);
    @include sm(padding-bottom, 4rem);
  }
}

.item {
  @include col();
  @include size(3);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  // large
  @include size-lg(6);
  @include lg(padding-bottom, 3rem);
  // small
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
    line-height: 1.8rem;
  }

  &__link {
    @include link-font();

    text-align: center;
    line-height: 1.6rem;
    color: $active-blue;
  }
}

.components-slideshow {
  height: 342px;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.components-slideshow .mover {
  width: 3153px;
  background: url(../../assets/landing/images/components.png);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  animation: moveSlideshow 20s linear infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes moveSlideshow {
  100% {
    transform: translateX(-33.33333%);
    // transform: translateX(-1051px);
  }
}
</style>
