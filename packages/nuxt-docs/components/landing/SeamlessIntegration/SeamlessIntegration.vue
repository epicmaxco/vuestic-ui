<template>
  <section class="seamless">
    <div class="seamless__wrapper">
      <div class="seamless__inner">
        <h2 class="seamless__title">{{t('landing.seamless.title')}}</h2>
        <div class="seamless__subtitle">{{t('landing.seamless.text')}}</div>
        <div class="seamless__content">
          <!-- First block -->
          <div class="seamless__content--first">
            <h3 class="block__label block__label--vuestic text--primary">{{t('landing.seamless.compare.vuestic')}}</h3>
            <div class="block__components">

              <div class="component">
                <va-button color="primary">Пампуй</va-button>
              </div>

              <div class="component">
                <va-select
                  v-model="value3"
                  :options="options"
                  color="primary"
                  label="Country"
                />
              </div>

              <div class="component">
                <va-slider
                  color="primary"
                  v-model="value2"
                />
              </div>

              <div class="component">
                <va-checkbox
                  v-model="value"
                  label="选中的复选框"
                  color="primary"
                />
              </div>
            </div>
            <img
              src="../../../assets/landing/images/plus.svg"
              alt=""
            >
          </div>
          <!-- /First block -->

          <!-- Second block -->
          <div class="seamless__content--second">
            <h3 class="block__label block__label">{{t('landing.seamless.compare.other')}}</h3>

            <div class="block__components">

              <div class="component">
                <seamless-integration-another-button />
              </div>

              <div class="component">
                <seamless-integration-another-select :options="options" />
              </div>

              <div class="component">
                <seamless-integration-another-range-slider />
              </div>

              <div class="component">
                <seamless-integration-another-checkbox />
              </div>
            </div>
          </div>
          <!-- /Second block -->

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SeamlessIntegrationAnotherButton from './SeamlessIntegrationAnotherButton.vue'
import SeamlessIntegrationAnotherSelect from './SeamlessIntegrationAnotherSelect.vue'
import SeamlessIntegrationAnotherRangeSlider from './SeamlessIntegrationAnotherRangeSlider.vue'
import SeamlessIntegrationAnotherCheckbox from './SeamlessIntegrationAnotherCheckbox.vue'

const { t } = useI18n()

const value = ref(true)
const value2 = ref(45)
const value3 = ref('Spain')
const options = ref(['Spain', 'Germany', 'France', 'Italy', 'China', 'Japan', 'Poland', 'Belarus', 'USA'])
</script>

<style lang="scss" scoped>
@import "vuestic-ui/styles/resources";
@import "~/assets/colors.scss";
@import "~/assets/smart-grid.scss";
@import "~/assets/fonts.scss";

.seamless {
  width: 100%;
  position: relative;
  padding-top: 8.5rem;
  padding-bottom: 12rem;
  background-image: url("../../../assets/landing/images/pattern-3.svg");
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
        @include sm(height, 25%);
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
  }
}
</style>
