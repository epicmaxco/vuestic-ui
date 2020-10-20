<template>
  <div class="opensource">
    <div class="opensource__wrapper">
      <div class="opensource__inner">
        <div class="opensource__info">
          <div class="opensource__icon">
            <img src="../../assets/landing/images/icon-open-source.png" alt="">
          </div>
          <div class="opensource__title">Open Source</div>
          <div class="opensource__text">
            Vuestic UI is forever free and open to contributions.
            See our <a href="#">issues</a>, <a href="#">contributing guide</a> and <a href="#">discord server</a>
            to help us improve Vuestic UI experience.</div>
        </div>
        <div class="opensource__actions">
          <img src="../../assets/landing/images/image-open-source.png" alt="open-source">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class OpenSource extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.opensource {
  width: 100%;
  position: relative;
  padding-top: 10rem;
  padding-bottom: 10rem;
  background-image: url("../../assets/landing/images/pattern-2.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__info {
    @include col();
    @include size(5);
    @include shift-left(1);

    // sm
    @include size-sm(12);
    @include shift-sm-left(0);
  }

  &__title {
    @include title-font();

    padding-bottom: 1.7rem;

    // sm
    @include sm(text-align, center);
  }

  &__icon {
    display: flex;

    @include sm(justify-content, center);
  }

  &__text {
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.5rem;

    @include sm(text-align, center);

    a {
      color: $active-blue;
    }
  }

  &__actions {
    @include col();
    @include size(6);

    // sm
    @include size-sm(12);

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
