<template>
  <div class="epicmax-news_banner">
    <va-alert
      v-model="isCloseableAlertVisible"
      closeable
      class="epicmax-news_banner-content"
    >
      <div class="epicmax-news_banner-text">
        <img
          src="https://media.tenor.com/kxzr3-r6XoIAAAAM/lets-get-this-party-started-yeah.gif"
          alt="Party gif"
        ><br>
        <span>
          {{ $t("landing.footer.newsBannerText") }}
        </span><br>
        <a
          :style="{ color: 'orange' }"
          href="https://www.producthunt.com/posts/vuestic-ui"
        >
          {{ $t("landing.footer.newsBannerLink") }}
        </a>
      </div>
    </va-alert>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isCloseableAlertVisible = ref(true)
</script>

<style lang="scss" scoped>
@import "@/assets";

.epicmax-news_banner {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  left: auto;
  width: 16rem;
  z-index: 10000;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: linear-gradient(180.81deg, #182879 0.7%, #5b3c9b 99.3%);
    padding: 1.7rem;
    color: #ffffff;
    border-radius: 0.5rem;

    @include sm(flex-direction, column);
    @include sm(align-items, start);
  }

  &-text {
    line-height: 1.5;
  }

  &-logo {
    margin-left: 3rem;

    @include sm(margin-top, 1rem);
    @include sm(align-self, end);
  }

  :deep(.va-alert__close) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>
