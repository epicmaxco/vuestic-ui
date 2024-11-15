<template>
  <transition name="banner">
    <div
      v-if="!isHidden"
      class="header-banner"
      :class="{
        'header-banner--wrapped': wrapped,
      }"
    >
      <div class="header__wrapper flex sm:flex-row flex-col">
        <div class="header-banner__left">
          <!-- Replace back to vuestic later -->
          <!-- <a :href="`https://github.com/epicmaxco/vuestic-ui/releases/tag/v${uiVersion}`">We just released&nbsp;<strong>Vuestic {{ uiVersion }} 🤗</strong></a> -->
          <!-- <a href="https://admin.vuestic.dev/">We just released <strong>Vuestic Admin 3.0</strong> 🤗</a> -->
          <span>Epicmax - We are the core team behind Vuestic UI and Vuestic Admin and frontend development company specializing in Vue.js since our founding in 2017.</span>

          <!--          <div class="header-banner__left-links">-->
          <!-- <a
              href="https://vuejs.org/partners/epicmax.html"
              title="Epicmax creates high performance Vue.js interfaces"
              target="_blank"
              class="header-banner__link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="-39.26295 -56.672 340.2789 340.032"
                aria-hidden="true"
              ><path
                fill="#41b883"
                d="M161.101 0l-30.224 52.35L100.652 0H0l130.877 226.688L261.753 0z"
              /><path
                fill="#34495e"
                d="M161.101 0l-30.224 52.35L100.652 0H52.351l78.526 136.01L209.403 0z"
              /></svg>
              <strong>Vue.js</strong>
            </a> -->

          <!-- <strong>and</strong> -->

          <!--            <a-->
          <!--              href="https://nuxtjs.org/partners/epicmax"-->
          <!--              title="Epicmax creates high performance Vue.js interfaces"-->
          <!--              target="_blank"-->
          <!--              class="header-banner__link"-->
          <!--            >-->
          <!--              <svg-->
          <!--                xmlns="http://www.w3.org/2000/svg"-->
          <!--                width="24"-->
          <!--                height="24"-->
          <!--                viewBox="0 0 400 420"-->
          <!--                aria-hidden="true"-->
          <!--              >-->
          <!--                <g-->
          <!--                  fill="none"-->
          <!--                  fill-rule="evenodd"-->
          <!--                >-->
          <!--                  <path-->
          <!--                    d="M123 292l-1-1c-2-4-2-8-2-12H25L167 27l59 107 19-14-59-107c-1-2-8-13-20-13-5 0-13 2-19 13L4 268c-1 2-7 14-1 24 2 5 8 10 21 10h120c-13 0-19-5-21-10z"-->
          <!--                    fill="#00C58E"-->
          <!--                  />-->
          <!--                  <path-->
          <!--                    d="M395 269L280 62c-2-2-8-13-20-13-5 0-12 2-19 13l-15 24v48l34-59 114 204h-43a20 20 0 0 1-2 12v1c-6 10-19 10-21 10h68c2 0 15 0 21-10 2-5 4-13-2-23z"-->
          <!--                    fill="#108775"-->
          <!--                  />-->
          <!--                  <path-->
          <!--                    d="M332 292v-1l1-2c1-3 2-7 1-10l-4-11-90-158-13-24h-1l-13 24-91 158-3 11a21 21 0 0 0 2 13c3 5 9 10 21 10h168c3 0 16 0 22-10zM226 134l83 145H144l82-145z"-->
          <!--                    fill="#2F495E"-->
          <!--                    fill-rule="nonzero"-->
          <!--                  />-->
          <!--                </g>-->
          <!--              </svg>-->
          <!--              <strong>Nuxt</strong>-->
          <!--            </a>-->
          <!--          </div>-->
        </div>

        <div class="header-banner__buttons">
          <VaButton
            href="https://epicmax.co/?ref=vuestic-header"
            target="blank"
          >
            <span class="text-nowrap">🔥🔥🔥 Hire us</span>
          </VaButton>
          <VaButton
            v-if="closeable"
            icon="close"
            preset="secondary"
            round
            :text-color="textColor"
            class="header-banner__buttons--close"
            aria-label="close banner"
            @click="hide"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useElementTextColor } from 'vuestic-ui'

const officialPartnerCookie = useCookie('banner')

const props = defineProps({
  closeable: {
    type: Boolean,
    default: false,
  },
  wrapped: {
    type: Boolean,
    default: false,
  },
})

// @ts-ignore
import packageUi from 'vuestic-ui/package.json'

const uiVersion = packageUi.version

const textColor = useElementTextColor('primary')

const closeable = ref(props.closeable)
const isHidden = ref(closeable.value && officialPartnerCookie.value === 'official-partner')

const hide = () => {
  if (closeable.value) {
    officialPartnerCookie.value = 'official-partner'
    isHidden.value = true
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets";

.banner-enter-active,
.banner-leave-active {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.banner-enter-from,
.banner-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.header-banner {
  $text-color: white;

  min-height: 40px;
  padding: 0.5rem 0;
  background-color: color-mix(in srgb, var(--va-primary) 80%, black 50%);
  font-size: 0.9rem;
  color: $text-color;
  flex-shrink: 0;

  &:not(.header-banner--wrapped) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &--wrapped {
    .header__wrapper {
      @include wrapper();
    }
  }

  &__buttons {
    display: flex;
    align-items: center;

    @include xs(margin-top, 0.5rem);

    &--close {
      margin-left: 1rem;
    }
  }

  .header__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @include xs(flex-direction, column);
  }

  a {
    color: $text-color !important;
  }

  &__left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__left-links {
    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
      margin-left: 0.75rem;
    }
  }

  &__link {
    display: flex;
    align-items: center;

    strong {
      margin-left: 0.25em;
    }
  }
}
</style>
