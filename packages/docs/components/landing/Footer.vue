<template>
  <div class="footer">
    <div class="footer__wrapper">
      <div class="footer__inner">
        <div class="footer__image">
          <img src="../../assets/landing/images/logo.svg" alt="">
        </div>
        <div class="footer__buttons">
          <va-button class="footer__buttons__button"
            :round="false"
            color="#2550C0"
            flat
            icon="github"
          >
            {{$t('landing.footer.buttons.epicmax')}}
          </va-button>
          <va-button class="footer__buttons__button"
            :round="false"
            color="#2550C0"
            icon="star_empty"
            flat
          >
            {{$t('landing.footer.buttons.admin')}}
          </va-button>
          <va-button class="footer__buttons__button"
            :round="false"
            color="#2550C0"
            flat
            icon="star_empty"
          >
            {{$t('landing.footer.buttons.spinners')}}
          </va-button>
        </div>
        <div class="footer__social">
          <va-button class="footer__social__item"
            color="#2550C0"
            flat
            icon="github"
          >
          </va-button>
          <va-button class="footer__social__item"
            color="#2550C0"
            icon="star_empty"
            flat
          >
          </va-button>
          <va-button class="footer__social__item"
            color="#2550C0"
            flat
            icon="home"
          >
          </va-button>
          <va-button class="footer__social__item"
            color="#2550C0"
            flat
            icon="heart"
          >
          </va-button>
        </div>
        <div class="footer__subtitle">{{$t('landing.footer.text')}} <a href="mailto:hello@epicmax.co">hello@epicmax.co</a></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.footer {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  background: transparent;

  // sm
  @include sm(padding-top, 1rem);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__image {
    @include col();
    @include size(12);

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 3.5rem;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    padding: 3rem 0 4rem;
    text-align: center;

    // sm
    @include sm(padding-top, 2rem);
    @include sm(padding-bottom, 3rem);
  }

  &__buttons {
    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;

    // lg
    @include size-lg(10);
    @include shift-lg-left(1);
    // md
    @include size-md(4);
    @include shift-md-left(4);
    // sm
    @include size-md(6);
    @include shift-md-left(3);
    // xs
    @include size-xs(12);
    @include shift-xs-left(0);

    &__button {
      @include col();
      @include size(4);
      @include button-font();

      // md
      @include size-md(12);
      @include md(margin-bottom, 1rem);
    }
  }

  &__social {
    @include col();
    @include size(12);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;

    // sm
    @include sm(padding-top, 1.5rem);

    &__item {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>
