<template>
  <div class="epicmax__banner">
    <div class="epicmax__banner-content">
      <div class="epicmax__banner-text">
        <span>{{ phrase }}</span>
        <a
          :style="{ color: 'yellow' }"
          href="mailto:hello@epicmax.co"
        >
          Contact us
        </a>
      </div>
      <a
        href="https://epicmax.co"
        class="epicmax__banner-logo"
        aria-label="Visit Epicmax web-site"
      >
        <LandingIconsIconEpicmaxColor color="#FFFF00" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const date = new Date() // YYYY-MM-DD
const currentMonthName = date.toLocaleString('en', { month: 'long' })

const currentMonth = new Date().getUTCMonth()
const developersCount = currentMonth % 3 + 1
const phrase = `🔥 ${developersCount} Vue.js expert${developersCount > 1 ? 's' : ''} available in ${currentMonthName} to build and launch your product.`
</script>

<style lang="scss" scoped>
@import "@/assets";

.epicmax__banner {
  display: flex;
  justify-content: center;
  color: #ffffff;

  &-content {
    width: 100%;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(180deg, #182879, #5b3c9b);
    border-radius: 0.5rem;

    @include sm(flex-direction, column);
    @include sm(align-items, center);
  }

  &-text {
    @include text-font();
  }

  &-logo {
    margin-left: 3rem;

    @include sm(margin-top, 1rem);
    @include sm(align-self, end);
  }
}
</style>
