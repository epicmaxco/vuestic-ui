<template>
  <div class="customize">
    <div class="customize__wrapper">
      <div class="customize__inner">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Customize extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";

.customize {
  width: 100%;
  position: relative;
  padding-top: 4.5rem;
  background: linear-gradient(180.81deg, #182879 0.7%, #5b3c9b 99.3%);
  background-repeat: no-repeat;
  background-position: top;
  min-height: 900px;

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }
}
</style>
