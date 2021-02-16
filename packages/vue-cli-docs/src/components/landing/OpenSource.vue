<template>
  <section class="opensource">
    <div class="opensource__wrapper">
      <div class="opensource__inner">
        <div class="opensource__info">
          <div class="opensource__icon">
            <img src="../../assets/landing/images/icon-open-source.svg" alt="">
          </div>
          <h2 class="opensource__title">{{$t('landing.opensource.title')}}</h2>
          <div class="opensource__text">
            {{$t('landing.opensource.text[0]')}}
            <a href="https://github.com/epicmaxco/vuestic-ui/issues" target="_blank">{{$t('landing.opensource.text[1]')}}</a>,
            <router-link :to="`/${$root.$i18n.locale}/contribution/documentation-page`">
              {{$t('landing.opensource.text[2]')}}
            </router-link>
            {{$t('landing.opensource.text[3]')}}
            <a href="https://discord.gg/jTKTjj2weV" target="_blank">{{$t('landing.opensource.text[4]')}}</a>
            {{$t('landing.opensource.text[5]')}}</div>
        </div>
        <div class="opensource__actions">
          <img src="../../assets/landing/images/image-open-source.png" alt="open-source">
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({})
export default class OpenSource extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/main.scss";

.opensource {
  width: 100%;
  position: relative;
  padding-top: 10rem;
  padding-bottom: 10rem;
  background-image: url("../../assets/landing/images/pattern-2.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;

  // sm
  @include sm(padding-top, 5rem);
  @include sm(padding-bottom, 5rem);

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
    // sm
    @include sm(justify-content, center);
  }

  &__text {
    @include text-font();

    line-height: 1.5rem;

    // sm
    @include sm(text-align, center);

    a {
      color: $active-blue;
    }
  }

  &__actions {
    @include col();
    @include size(6);

    // sm
    @include size-sm(8);
    @include shift-sm-left(2);
    @include sm(padding-top, 1rem);
    // xs
    @include size-xs(12);
    @include shift-xs-left(0);

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
