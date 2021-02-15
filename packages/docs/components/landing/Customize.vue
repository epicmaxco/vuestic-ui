<template>
  <section class="customize__bg">
  <div class="customize">
    <div class="customize__wrapper">
      <div class="customize__inner">
        <h2 class="customize__title">{{$t('landing.customize.title')}}</h2>
        <div class="customize__subtitle">{{$t('landing.customize.text')}}</div>
        <div class="customize__content">
          <!-- Tabs -->
          <div  class="tabs-wrapper">
          <va-tabs v-model="tabValue" class="tabs" color="#fff" center grow>
            <va-tab
              class="tabs__tab"
              v-for="tab in [`${$t('landing.customize.tabs[0]')}`, `${$t('landing.customize.tabs[1]')}`, `${$t('landing.customize.tabs[2]')}`]"
              :key="tab"
            >
              {{ tab }}
            </va-tab>
          </va-tabs>
          </div>

          <!-- First block -->
          <div class="customize__content--first">

            <div class="block__components" v-if="tabValue === 0">
              <div class="component">
                <va-button color="#6F80E7">
                  Submit
                </va-button>
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
              <va-slider
                color="#6F80E7"
                v-model="value2"
              />
              </div>

              <div class="component">
                <va-checkbox
                  v-model="value"
                  label="Checkbox"
                  color="#6F80E7"
                />
              </div>
            </div>

            <div v-else-if="tabValue === 1">Work In Progress</div>
            <div v-else>Work In Progress</div>
          </div>
          <!-- /First block -->

          <!-- Second block -->
          <div class="customize__content--second">
            <div class="code-wrapper" @click="copyText()">
              <div class="code-subwrapper">
              <prism  class="code" language="javascript">{{ code }}</prism>
              <input type="hidden" ref="codeInput" :value="code">
              </div>
            </div>
            <div class="clipboard" ref="message">{{$t('landing.customize.copy')}}</div>
          </div>
          <!-- /Second block -->

          <nuxt-link class="customize__content__link" :to="`/${$root.$i18n.locale}/getting-started/configuration-guide`">
            {{$t('landing.customize.configuration')}}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'prismjs'
// @ts-ignore
import Prism from 'vue-prism-component'

@Component({
  components: { Prism },
})
export default class Customize extends Vue {
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
  tabValue = 0

  copyText () {
    const testingCodeToCopy: any = this.$refs.codeInput
    testingCodeToCopy.setAttribute('type', 'text')
    testingCodeToCopy.select()
    try {
      document.execCommand('copy')
      ;(this as any).$refs.message.style.opacity = 1
      setTimeout(() => {
        ;(this as any).$refs.message.style.opacity = 0
      }, 2000)
    } catch (err) {
      alert('Oops, unable to copy')
    }
    testingCodeToCopy.setAttribute('type', 'hidden')
    ;(window as any).getSelection().removeAllRanges()
  }
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

  // sm
  @include sm(padding-top, 5rem);
  @include sm(padding-bottom, 6rem);

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
    @include title-font();

    color: #ffffff;
    text-align: center;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    color: #ffffff;
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
    justify-content: center;

    // sm
    @include size-sm(12);
    @include shift-sm-left(0);
    @include sm(margin-top, 2rem);

    &--first {
      background: #ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 3rem;
      width: 100%;
      border-radius: 1rem;

      // xs
      @include xs(padding, 2rem);
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
      @include link-font();

      color: #ffffff;
      padding-top: 1rem;
      line-height: 1.5rem;
    }
  }
}

.block {
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

.clipboard {
  @include text-font();

  width: fit-content;
  background-color: #b0e2a7;
  color: #11380a;
  padding: 0.5rem 1rem;
  margin: 0.1rem 0;
  opacity: 0;
  transition: opacity 0.5s ease-in;
  border-radius: 0.2rem;
}

.code-wrapper {
  width: 100%;
  height: 12rem;
  padding: 0 4rem;
  overflow: auto;
  overflow-x: hidden;
  cursor: pointer;

  // sm
  @include sm(padding, 0 0.5rem);

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
  @include code-font();

  color: #ffffff;
  line-height: 1.4;
}

.tabs-wrapper {
  width: 100%;
}

.tabs {
  &__tab {
    @include button-font();

    margin-bottom: 1rem;
    margin-left: 0.51rem;
    margin-right: 0.51rem;
    color: #ffffff;
  }

  padding-bottom: 1rem;
}
</style>
