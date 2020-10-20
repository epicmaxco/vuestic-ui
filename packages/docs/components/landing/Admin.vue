<template>
  <div class="admin">
    <div class="admin__wrapper">
      <div class="admin__inner">
        <div class="admin__title">Vuestic Admin</div>
        <div class="admin__subtitle">Check out Vuestic UI Library in action.</div>
        <div class="admin__buttons">
          <va-button class="admin__buttons--button"
            :round="false"
            color="#2550C0"
            icon="github"
          >
            View on GitHub
          </va-button>
          <va-button class="admin__buttons--button"
            :round="false"
            color="#2550C0"
            flat
          >
            Live Demo
          </va-button>
          <va-button class="admin__buttons--button"
            :round="false"
            color="#2550C0"
            icon="star_empty"
          >
            Star
          </va-button>
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
                <img src="@/assets/landing/images/admin/open-source.png" alt="open-source">
              </div>
              <h2 class="item__title">Open source MIT license</h2>
            </div>

            <div class="item">
              <div class="item__frame">
                <img src="@/assets/landing/images/admin/themes.png" alt="themes">
              </div>
              <h2 class="item__title">Two built-in color schemes</h2>
            </div>

            <div class="item">
              <div class="item__frame">
                <img src="@/assets/landing/images/admin/responsive.png" alt="responsive">
              </div>
              <h2 class="item__title">Cross-browser & responsive</h2>
            </div>

            <div class="item">
              <div class="item__frame">
                <img src="@/assets/landing/images/admin/i18n.png" alt="i18n">
              </div>
              <h2 class="item__title">i18n-ready</h2>
            </div>
            </div>
            <!-- /items -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Admin extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.admin {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  padding-bottom: 8.5rem;
  background-color: $bg-light-sky;

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

    padding-top: 1.5rem;
    text-align: center;
    font-weight: normal;
    font-size: 1.1rem;
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
    // // md
    @include size-md(6);
    @include shift-md-left(3);
    // // md
    @include size-xs(10);
    @include shift-xs-left(1);

    &--button {
      @include col();
      @include size(4);
      // display: inline-block;

      height: 3rem;
      font-weight: 600;
      font-size: 1rem;

      // md
      @include size-md(12);
      @include md(margin-bottom, 1rem);
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
    }

    &__frame {
      display: inline-block;
      padding: 0.75rem;
      border: 1px dashed $gray;
      border-radius: 1rem;
    }

    &__title {
      padding-left: 1rem;
      font-weight: 400;
      font-size: 1.1rem;
      line-height: 1.8rem;
    }
  }
}

</style>
