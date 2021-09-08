<template>
  <va-button
    class="star-button"
    target="blank"
    :href="url"
    :rounded="false"
    color="dark"
    size="small"
  >
    <va-icon name="star_empty" class="mr-1" size="small" /> {{ stars }}
  </va-button>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'

export default defineComponent({
  name: 'LandingStarsButton',
  props: {
    /** @example epicmaxco/vuestic-ui */
    repo: { type: String, required: true },
  },
  setup (props) {
    const stars = ref('57')
    const apiUrl = `https://api.github.com/repos/${props.repo}`
    const url = `https://github.com/${props.repo}`

    onBeforeMount(async () => {
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
      } catch (error) {
        console.log(error)
      }
    })

    return {
      stars, url,
    }
  },
})
</script>
