<template>
  <div class="customize__bg">
  <div class="customize">
    <div class="customize__wrapper">
      <div class="customize__inner">
        <div class="customize__title">Customize Everything</div>
        <div class="customize__subtitle">Make Vuestic UI components match your designs with powerful dynamic configs.</div>
        <div class="customize__content">

          <!-- First block -->
          <div class="customize__content--first">
            <div class="block__components">
              <va-button color="#6F80E7">
                Default Button
              </va-button>
              <div style="width: 200px;">
                <va-select
                  v-model="value3"
                  :options="options"
                  color="#6F80E7"
                  label="Country"
                />
              </div>
              <va-slider
                style="width: 200px;"
                color="#6F80E7"
                v-model="value2"
              />

              <va-checkbox
                v-model="value"
                label="Checkbox"
                color="#6F80E7"
              />
            </div>
          </div>
          <!-- /First block -->

          <!-- Second block -->
          <div class="customize__content--second">
            <div class="code-wrapper">
              <div class="code-subwrapper">
              <prism  class="code" language="javascript">{{ code }}</prism>
              </div>
            </div>
            <div class="clipboard">Copied to clipboard</div>
          </div>
          <!-- /Second block -->

          <a class="customize__content__link" href="#">See our configuration guides</a>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'prismjs'
// @ts-ignore
import Prism from 'vue-prism-component'

@Component({
  components: { Prism },
})
export default class Seamless extends Vue {
  code =`<va-button color="#6F80E7">
  Default Button
</va-button>
<div style="width: 200px;">
  <va-select
    v-model="value3"
    :options="options"
    color="#6F80E7"
    label="Country"
  />
</div>
<va-slider
  style="width: 200px"
  color="#6F80E7"
  v-model="value2"
/>

<va-checkbox
  v-model="value"
  label="Checkbox"
  color="#6F80E7"
/>`
  value = true
  value2 = 45
  value3 = 'Spain'
  options = ['Spain', 'Germany', 'France', 'Italy', 'China', 'Japan', 'Poland', 'Belarus', 'USA']
}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.customize {
  width: 100%;
  position: relative;
  padding-top: 8.5rem;
  padding-bottom: 12rem;
  background-image: url("../../assets/landing/images/vector-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  &__bg {
    background: linear-gradient(180.81deg, #182879 0.7%, #5b3c9b 99.3%);
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
    @include size(12);

    color: #ffffff;
    text-align: center;
    font-weight: 900;
    font-size: 4.5rem;
  }

  &__subtitle {
    @include col();
    @include size(12);

    color: #ffffff;
    padding-top: 3rem;
    text-align: center;
    font-weight: normal;
    font-size: 1.1rem;
  }

  &__content {
    margin-top: 3rem;

    @include row-flex();
    @include col();
    @include size(8);
    @include shift-left(2);

    justify-content: center;

    &--first {
      background: #ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 3rem;
      width: 100%;
      border-radius: 1rem;
    }

    &--second {
      background: #ffffff1a;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 1rem;
      padding-bottom: 1rem;
      width: 80%;
      border-radius: 0 0 0.7rem 0.7rem;
    }

    &__link {
      color: #ffffff;
      font-weight: 600;
      padding-top: 1rem;
      line-height: 1.5rem;
    }
  }
}

.block {
  &__components {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.clipboard {
  width: fit-content;
  background-color: #b0e2a7;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 0.1rem;
  opacity: 1;
  border-radius: 0.2rem;
}

.code-wrapper {
  width: 100%;
  height: 12rem;
  padding: 0 4rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #1a287a;
    opacity: 0.3;
    border-radius: 2px;
  }

  -ms-overflow-style: none; // hide for IE & Edge
  scrollbar-width: none; // hide for Firefox
}

.code {
  color: #ffffff;
  line-height: 1.4;
}
</style>
