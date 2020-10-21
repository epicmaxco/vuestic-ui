<template>
  <div class="seamless">
    <div class="seamless__wrapper">
      <div class="seamless__inner">
        <div class="seamless__title">Seamless Integration</div>
        <div class="seamless__subtitle">Use Vuestic UI with other component libraries without any conflicts.</div>
        <div class="seamless__content">

          <!-- First block -->
          <div class="seamless__content--first">
            <h3 class="block__label block__label--vuestic">Vuestic UI components</h3>
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
                <va-slider color="#6F80E7" v-model="value2"/>
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
            <h3 class="block__label block__label">Other components</h3>

            <div class="block__components">

              <div class="component">
                <va-button :round="false" color="#F8CB2D">Télécharger</va-button>
              </div>

              <div class="component">
                <va-select
                  v-model="value3"
                  :options="options"
                  color="#42D1A6"
                  label="Another select"
                />
              </div>

              <div class="component">
                <va-slider v-model="value2"/>
              </div>

              <div class="component">
                <va-checkbox
                  v-model="value"
                  label="Agree to terms"
                  color="#419488"
                />
              </div>
            </div>
          </div>
          <!-- /Second block -->

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Seamless extends Vue {
  value = true
  value2 = 45
  value3 = 'Spain'
  options = ['Spain', 'Germany', 'France', 'Italy', 'China', 'Japan', 'Poland', 'Belarus', 'USA']
}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

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

    padding-top: 3rem;
    text-align: center;
    font-weight: normal;
    font-size: 1.1rem;

    // sm
    @include sm(padding-top, 2rem);
  }

  &__content {
    margin-top: 3rem;

    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    background: #ffffff;
    box-shadow: 0 47px 72px -39px rgba(155, 179, 206, 0.8);
    border-radius: 1rem;
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

      // lg
      @include size-lg(6);
      @include lg(padding-bottom, 1rem);
      // sm
      @include size-sm(12);
    }
  }
}
</style>
