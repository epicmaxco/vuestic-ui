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
          <div class="seamless__content-image">
            <va-aspect-ratio :ratio="829/434">
              <img
                src="/landing/seamless-integration.svg"
                alt=""
              >
            </va-aspect-ratio>
          </div>

          <!-- First block -->
          <!-- <div class="seamless__content--first">
            <h3 class="block__label block__label--vuestic">
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
                  label="Country"
                />
              </div>

              <div class="component">
                <va-slider v-model="value2" />
              </div>

              <div class="component">
                <va-checkbox
                  v-model="value"
                  label="选中的复选框"
                />
              </div>
            </div>
            <img
              src="/landing/plus.svg"
              alt=""
              height="72"
              width="72"
              class="block__icon"
            >
          </div> -->

          <!-- Second block -->
          <!-- <div class="seamless__content--second">
            <h3 class="block__label">
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
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'

// import SeamlessIntegrationAnotherButton from './SeamlessIntegration/SeamlessIntegrationAnotherButton.vue'
// import SeamlessIntegrationAnotherSelect from './SeamlessIntegration/SeamlessIntegrationAnotherSelect.vue'
// import SeamlessIntegrationAnotherRangeSlider from './SeamlessIntegration/SeamlessIntegrationAnotherRangeSlider.vue'
// import SeamlessIntegrationAnotherCheckbox from './SeamlessIntegration/SeamlessIntegrationAnotherCheckbox.vue'

// const value = ref(true)
// const value2 = ref(75)
// const value3 = ref('Spain')
// const options = ref(['Spain', 'Germany', 'France', 'Italy', 'China', 'Japan', 'Poland', 'Ukraine', 'USA'])
</script>

<style lang="scss" scoped>
@import "@/assets";

.seamless {
  $section-padding: 7.5rem 0;
  $section-xs-padding: 3.5rem 0;

  width: 100%;
  position: relative;
  padding: $section-padding;
  background: var(--bg-seamless);
  color: var(--va-text);

  @include xs(padding, $section-xs-padding);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    flex-direction: column;
    align-items: center;
  }

  &__title {
    @include col();
    @include size(12);
    @include subtitle-font();

    text-align: center;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    margin-top: 1rem;
    text-align: center;
  }

  &__content {
    @include col();
    @include size(12);
    @include row-flex();
    @include text-font();

    margin-top: 2rem;
    max-width: 60rem;
    // background: var(--va-background-secondary);
    // color: var(--va-on-background-secondary);
    // box-shadow: 0 47px 72px -39px var(--va-background-landing-border);
    // border-radius: 1rem;

    &-image {
      width: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &--first {
      position: relative;
      width: 100%;
      padding: 2rem 3rem 3.5rem 3rem;
      border-bottom: 1px solid var(--va-background-border);

      @include sm(padding, 1rem 2rem 2.5rem 2rem);
    }

    &--second {
      padding: 3.5rem 3rem 3rem 3rem;
      width: 100%;

      @include sm(padding, 2.5rem 2rem 2rem 2rem);
    }
  }
}

.block {
  &__label {
    font-size: 0.8em;
    text-align: center;
    color: var(--va-text);
    letter-spacing: 0.4px;
    font-weight: 700;
    text-transform: uppercase;

    &--vuestic {
      color: var(--va-primary);
    }
  }

  &__components {
    @include row-flex();

    margin-top: 2rem;

    @include sm(margin-top, 0);

    .component {
      @include col();
      @include size(3);

      margin: auto;

      @include size-sm(6);
      @include sm(margin-top, 2rem);

      @include size-xs(12);
    }
  }

  &__icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
  }
}
</style>
