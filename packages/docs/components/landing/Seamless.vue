<template>
  <div class="admin">
    <div class="admin__wrapper">
      <div class="admin__inner">
        <div class="admin__title">Seamless Integration</div>
        <div class="admin__subtitle">Use Vuestic UI with other component libraries without any conflicts.</div>
        <div class="admin__content">
          <img src="../../assets/landing/images/seamless-example.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Seamless extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.admin {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  padding-bottom: 4.5rem;
  background-image: url("../../assets/landing/images/pattern-3.png");
  background-size: contain;
  background-color: $bg-light-sky;
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

    text-align: center;
    font-weight: 900;
    font-size: 4.5rem;
  }

  &__subtitle {
    @include col();
    @include size(12);

    padding-top: 3rem;
    text-align: center;
    font-weight: normal;
    font-size: 1.1rem;
  }

  &__content {
    padding-top: 3rem;

    @include row-flex();
    @include col();
    @include size(12);

    justify-content: center;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
