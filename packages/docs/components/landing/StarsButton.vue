<template>
  <va-button
    :href="url"
    size="small"
    target="blank"
    color="textPrimary"
    class="stars-button"
  >
    <template #prepend>
      <va-icon
        name="star_empty"
        size="small"
      />
    </template>
    {{ stars }}
  </va-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LandingStarsButton',
  props: {
    /** @example epicmaxco/vuestic-ui */
    repo: { type: String, required: true },
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
@import "@/assets/smart-grid.scss";

.stars-button {
  .va-icon {
    padding-right: 0.25rem;
  }
}
</style>
