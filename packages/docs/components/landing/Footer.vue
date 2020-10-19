<template>
  <div class="footer">
    <div class="footer__wrapper">
      <div class="footer__inner">
        <div class="footer__image">
          <img src="../../assets/landing/images/logo.png" alt="">
        </div>
        <div class="footer__buttons">
          <va-button class="footer__buttons__button"
            :round="false"
            color="#2550C0"
            flat
            icon="github"
          >
            About Epicmax
          </va-button>
          <va-button class="footer__buttons__button"
            :round="false"
            color="#2550C0"
            icon="star_empty"
            flat
          >
            Vuestic Admin
          </va-button>
          <va-button class="footer__buttons__button"
            :round="false"
            color="#2550C0"
            flat
            icon="star_empty"
          >
            Epic Spinners
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
        <div class="footer__subtitle">Open source, free to use. Development inquiries: <a href="mailto:hello@epicmax.co">hello@epicmax.co</a></div>
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

    padding: 3rem 0 4rem;
    text-align: center;
    font-weight: normal;
    font-size: 1.1rem;
  }

  &__buttons {
    @include col();
    @include size(12);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;

    &__button {
      font-weight: 600;
      font-size: 1rem;
    }
  }

  &__social {
    @include col();
    @include size(12);

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;

    &__item {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>
