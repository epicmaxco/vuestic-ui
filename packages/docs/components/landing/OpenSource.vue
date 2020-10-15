<template>
  <div class="preview">
    <div class="preview__wrapper">
      <div class="preview__inner">
        <div class="preview__info">
          <div class="preview__icon">
            <img src="../../assets/landing/images/open-source-icon.png" alt="">
          </div>
          <div class="preview__title">Open Source</div>
          <div class="preview__text">
            Vuestic UI is forever free and open to contributions.
            See our <a href="#">issues</a>, <a href="#">contributing guide</a> and <a href="#">discord server</a>
            to help us improve Vuestic UI experience.</div>
        </div>
        <div class="preview__actions">
          <img src="../../assets/landing/images/open-source.png" alt="">
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

.preview {
  width: 100%;
  position: relative;
  padding-top: 6.5rem;
  padding-bottom: 6.5rem;
  background-image: url("../../assets/landing/images/pattern-2.png");
  background-size: unset;
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

  &__info {
    @include col();
    @include size(5);
    @include shift-left(1);
  }

  &__title {
    font-weight: 900;
    font-size: 4.5rem;
    padding: 1.2rem 0;
  }

  &__text {
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.5rem;
  }

  &__actions {
    @include col();
    @include size(5);
    @include shift-right(1);

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
