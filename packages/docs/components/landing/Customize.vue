<template>
  <div class="seamless">
    <div class="seamless__wrapper">
      <div class="seamless__inner">
        <div class="seamless__title">Customize Everything</div>
        <div class="seamless__subtitle">Make Vuestic UI components match your designs with powerful dynamic configs.</div>
        <div class="seamless__content">

          <!-- First block -->
          <div class="seamless__content--first">
            <div class="block__components">
              <va-button color="#6F80E7">Пампуй</va-button>
              <div style="width: 200px;">
                <va-select
                  v-model="value3"
                  :options="options"
                  color="#6F80E7"
                  label="Country"
                />
              </div>
              <div style="width: 200px;">
                <va-slider color="#6F80E7" v-model="value2"/>
              </div>

              <va-checkbox
                v-model="value"
                label="选中的复选框"
                color="#6F80E7"
              />
            </div>
          </div>
          <!-- /First block -->

          <!-- Second block -->
          <div class="seamless__content--second">
            <pre>
            <code class="code">
              p { color: red; }
              body { background-color: #eee; }
              body { background-color: #eee; }
              body { background-color: #eee; }
              body { background-color: #eee; }
              body { background-color: #eee; }
            </code>
          </pre>
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
  background: linear-gradient(90.81deg, #182879 0.7%, #5b3c9b 99.3%);
  background-repeat: no-repeat;
  background-position: top;

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
      border-bottom: 1px solid #d9e8e6;
      width: 100%;
      border-radius: 1rem;

      img {
        position: absolute;
        bottom: 0;
        // width: 100px;
        // height: 100px;
        left: 50%;
        transform: translate(-50%, 50%);
      }
    }

    &--second {
      background: #ffffff1a;
      padding: 3rem;
      width: 80%;
      border-radius: 0 0 1rem 1rem;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.code {
  color: #ffffff;
  opacity: 1;
}
</style>
