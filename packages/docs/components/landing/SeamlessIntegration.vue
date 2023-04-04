<template>
  <section class="seamless">
    <div class="seamless__wrapper">
      <div class="seamless__inner">
        <h2 class="seamless__title">
          {{ $t('landing.seamless.title') }}
        </h2>
        <div class="seamless__subtitle">
          {{ $t('landing.seamless.text') }}
        </div>
        <div class="seamless__content">
          <!-- First block -->
          <div class="seamless__content--first">
            <h3 class="block__label block__label--vuestic text--primary">
              {{ $t('landing.seamless.compare.vuestic') }}
            </h3>
            <div class="block__components">
              <div class="component">
                <va-button>Пампуй</va-button>
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
                  v-model="value2"
                  color="primary"
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
              src="/landing/plus.svg"
              alt="Plus icon"
              height="96"
              width="96"
              сlass="block__icon"
            >
          </div>
          <!-- /First block -->

          <!-- Second block -->
          <div class="seamless__content--second">
            <h3 class="block__label block__label">
              {{ $t('landing.seamless.compare.other') }}
            </h3>

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

<script lang="ts" setup>
import SeamlessIntegrationAnotherButton from './SeamlessIntegration/SeamlessIntegrationAnotherButton.vue'
import SeamlessIntegrationAnotherSelect from './SeamlessIntegration/SeamlessIntegrationAnotherSelect.vue'
import SeamlessIntegrationAnotherRangeSlider from './SeamlessIntegration/SeamlessIntegrationAnotherRangeSlider.vue'
import SeamlessIntegrationAnotherCheckbox from './SeamlessIntegration/SeamlessIntegrationAnotherCheckbox.vue'

const value = ref(true)
const value2 = ref(45)
const value3 = ref('Spain')
const options = ref(['Spain', 'Germany', 'France', 'Italy', 'China', 'Japan', 'Poland', 'Belarus', 'USA'])
</script>

<style lang="scss" scoped>
@import "@/assets";

.seamless {
  width: 100%;
  position: relative;
  padding-top: 8.5rem;
  padding-bottom: 12rem;
  background-image: url("/landing/pattern-3.svg");
  background-size: cover;
  background-color: var(--va-background-landing);
  color: var(--va-on-background-landing);
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

    padding-top: 1rem;
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
    background: var(--va-background-secondary);
    color: var(--va-on-background-secondary);
    box-shadow: 0 47px 72px -39px var(--va-background-landing-border);
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
      border-bottom: 1px solid var(--va-background-border);
      width: 100%;

      // xs
      @include xs(padding, 1rem 2rem 2rem 2rem);

      img {
        user-select: none;
        pointer-events: none;
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
    color: var(--va-text-dark);
    padding-bottom: 2rem;
    letter-spacing: 0.4px;
    font-weight: 700;
    text-transform: uppercase;

    &--vuestic {
      color: var(--va-primary);
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
