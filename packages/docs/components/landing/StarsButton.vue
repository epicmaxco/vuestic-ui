<template>
  <VaButton
    :href="url"
    target="blank"
    color="textInverted"
    text-color="textPrimary"
    border-color="backgroundBorder"
    class="stars-button"
    :style="`--border-radius: ${borderRadius};`"
    v-bind="$attrs"
  >
    <template #prepend>
      <VaIcon
        class="fa-solid fa-star"
        size="small"
        color="#EAC54F"
      />
    </template>
    {{ stars }}
  </VaButton>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'LandingStarsButton',
  inheritAttrs: false,
  props: {
    /** @example epicmaxco/vuestic-ui */
    repo: { type: String, required: true },
    borderRadius: {
      type: String,
      default: '0.25rem',
    },
  },
  setup (props) {
    const stars = ref('Star')
    const apiUrl = `https://api.github.com/repos/${props.repo}`
    const url = `https://github.com/${props.repo}`

    const getStarsStorageKey = (repo: string) => `stars_${repo}`

    onMounted(async () => {
      const storedStars = window.sessionStorage.getItem(getStarsStorageKey(props.repo))

      if (storedStars) {
        stars.value = storedStars
        return
      }

      try {
        const rawResponse = await fetch(apiUrl)
        const response = await rawResponse.json()

        if (response.message && response.message.includes('API rate limit exceeded')) {
          const rateRawResponse = await fetch('https://api.github.com/rate_limit')
          const rateResponse = await rateRawResponse.json()
          const rate = rateResponse.resources.core

          console.error(`Github. API rate limit exceeded for your IP address.\nYour limit is ${rate.limit} and used ${rate.used}. Reset after ${new Date(rate.reset).getMinutes()} min.`)

          stars.value = 'Star'
          return
        }

        stars.value = response.stargazers_count
        window.sessionStorage.setItem(getStarsStorageKey(props.repo), response.stargazers_count)
      } catch (error) {
        console.log(error)
      }
    })

    return { url, stars }
  },
})
</script>

<style lang="scss" scoped>
.stars-button {
  --border-radius: 0.25rem;

  border-radius: var(--border-radius);

  &::after,
  &::before {
    border-radius: calc(var(--border-radius) - var(--va-button-bordered-border));
  }

  &:hover {
    filter: unset;
  }

  &.va-button--normal {
    :deep(.va-button__content) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .va-icon {
    margin-right: 0.5rem;
  }
}
</style>
