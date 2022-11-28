<template>
  <div class="epicmax-news_banner">
    <va-alert
      v-model="isCloseableAlertVisible"
      closeable
      class="epicmax-news_banner-content"
    >
        <div class="epicmax-news_banner-text">
          <img src="https://media.tenor.com/kxzr3-r6XoIAAAAM/lets-get-this-party-started-yeah.gif" alt=""><br />
              <span>
               {{ $t("landing.footer.newsBannerText") }}
              </span><br />
          <a :style="{ color: 'orange' }" href="https://www.producthunt.com/posts/vuestic-ui">
            {{ $t("landing.footer.newsBannerLink") }}
          </a>
        </div>
    </va-alert>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'LandingNewsBanner',
  data () {
    return {
      isCloseableAlertVisible: true,
    }
  },
})

export default class NewsBanner extends Vue {
  get currentMonthName () {
    const date = new Date() // 2009-11-10
    return date.toLocaleString('en', { month: 'long' })
  }

  get developersCount () {
    const currentMonth = new Date().getUTCMonth()
    return currentMonth % 3 + 1
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/main";

.epicmax-news_banner {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  left: auto;
  width: 16rem;

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

  ::v-deep .va-alert__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>
