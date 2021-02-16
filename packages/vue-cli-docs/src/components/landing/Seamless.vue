<template>
  <section class="seamless">
    <div class="seamless__wrapper">
      <div class="seamless__inner">
        <h2 class="seamless__title">{{$t('landing.seamless.title')}}</h2>
        <div class="seamless__subtitle">{{$t('landing.seamless.text')}}</div>
        <div class="seamless__content">

          <!-- First block -->
          <div class="seamless__content--first">
            <h3 class="block__label block__label--vuestic">{{$t('landing.seamless.compare.vuestic')}}</h3>
            <div class="block__components">

              <div class="component">
                <va-button color="#6F80E7">Пампуй</va-button>
              </div>

              <div class="component">
                <va-select
                  v-model="value3"
                  :options="options"
                  color="#6F80E7"
                  label="Country"
                />
              </div>

              <div class="component">
                <va-slider color="#6F80E7" v-model="value2" />
              </div>

              <div class="component">
                <va-checkbox
                  v-model="value"
                  label="选中的复选框"
                  color="#6F80E7"
                />
              </div>
            </div>
            <img src="../../assets/landing/images/plus.svg" alt="">
          </div>
          <!-- /First block -->

          <!-- Second block -->
          <div class="seamless__content--second">
            <h3 class="block__label block__label">{{$t('landing.seamless.compare.other')}}</h3>

            <div class="block__components">

              <div class="component">
                <div class="example-button">Télécharger</div>
              </div>

              <div class="component">
                <div class="example-select">
                  <div>
                    <div class="example-select__label">Another select</div>
                    <div>Polar bear</div>
                  </div>
                  <div class="example-select__icon">&#10132;</div>
                </div>
              </div>

              <div class="component">
                <div class="example-slider">
                  <div class="example-slider__fill-part">
                    <div class="example-slider__fill-part__mover"></div>
                  </div>
                  <div class="example-slider__empty-part"></div>
                </div>
              </div>

              <div class="component">
                <div class="example-checkbox">
                  <div class="example-checkbox__checker">
                    &#10003;
                  </div>
                  <span>Agree to terms</span>
                </div>
              </div>
            </div>
          </div>
          <!-- /Second block -->

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({})
export default class Seamless extends Vue {
  value = true
  value2 = 45
  value3 = 'Spain'
  options = ['Spain', 'Germany', 'France', 'Italy', 'China', 'Japan', 'Poland', 'Belarus', 'USA']
}
</script>

<style lang="scss" scoped>
@import "~@/assets/main.scss";

.seamless {
  width: 100%;
  position: relative;
  padding-top: 8.5rem;
  padding-bottom: 12rem;
  background-image: url("../../assets/landing/images/pattern-3.svg");
  background-size: cover;
  background-color: $bg-light-sky;
  background-repeat: no-repeat;
  background-position: top;

  // sm
  @include sm(padding-top, 5rem);
  @include sm(padding-bottom, 6rem);

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

    text-align: center;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    padding-top: 3rem;
    text-align: center;

    // sm
    @include sm(padding-top, 2rem);
  }

  &__content {
    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    margin-top: 3rem;
    background: #ffffff;
    box-shadow: 0 47px 72px -39px rgba(155, 179, 206, 0.8);
    border-radius: 1rem;
    user-select: none;
    pointer-events: none;
    justify-content: center;

    // sm
    @include size-sm(12);
    @include shift-sm-left(0);
    @include sm(margin-top, 2rem);

    &--first {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 2rem 3rem 3rem 3rem;
      border-bottom: 1px solid #d9e8e6;
      width: 100%;

      // xs
      @include xs(padding, 1rem 2rem 2rem 2rem);

      img {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);

        // sm
        @include sm(height,25%);
        @include sm(width, 25%);
      }
    }

    &--second {
      padding: 3rem;
      width: 100%;

      // xs
      @include xs(padding, 2rem);
    }
  }
}

.block {
  &__label {
    font-size: 0.8rem;
    text-align: center;
    color: $dark;
    padding-bottom: 2rem;
    letter-spacing: 0.4px;
    font-weight: 700;
    text-transform: uppercase;

    &--vuestic {
      color: $lavender;
    }
  }

  &__components {
    @include row-flex();

    .component {
      @include col();
      @include size(3);

      margin: auto;

      // lg
      @include size-lg(6);
      @include lg(padding-bottom, 1rem);
      // sm
      @include size-sm(12);
    }

    .example-button {
      display: inline-block;
      background: #f8cb2d;
      border-radius: 2px;
      padding: 0.5rem 1rem;
      color: #ffffff;
      font-weight: 600;
    }

    .example-select {
      padding: 0.25rem 0.7rem;
      display: flex;
      justify-content: space-between;
      border: 1px solid #ced4da;
      border-radius: 0.3rem;

      &__icon {
        transform: rotate(90deg);
        color: #b4b6b9;
      }

      &__label {
        color: #42d1a6;
        font-size: 0.75rem;
      }
    }

    .example-slider {
      display: flex;
      width: 100%;

      &__fill-part {
        width: 45%;
        height: 5px;
        border-radius: 2rem 0 0 2rem;
        background-color: #000000;
        position: relative;

        &__mover {
          position: absolute;
          border-radius: 50%;
          height: 10px;
          width: 10px;
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
          background-color: #000000;
        }
      }

      &__empty-part {
        width: 55%;
        height: 5px;
        border-radius: 0 2rem 2rem 0;
        background-color: #f3f3f3;
      }
    }

    .example-checkbox {
      display: flex;

      &__checker {
        background-color: #419488;
        width: 20px;
        height: 20px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 1.4rem;
        margin-right: 0.3rem;
      }
    }
  }
}
</style>
