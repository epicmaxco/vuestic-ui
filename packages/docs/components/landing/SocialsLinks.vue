<template>
  <div
    class="socials"
    :style="styleComputed"
  >
    <va-button
      v-for="{ href, label, icon } in socials"
      :key="label"
      class="socials__item"
      :href="href"
      :aria-label="$t(label)"
      plain
      target="blank"
      :color="color"
    >
      <va-icon
        :size="size"
        :sizes-config="sizesConfig"
        :class="icon"
      />
    </va-button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'medium',
  },
})

const sizesConfig = {
  defaultSize: 20,
  sizes: {
    small: 20,
    medium: 24,
    large: 30,
  },
}

const styleComputed = computed(() => {
  return props.size === 'large'
    ? '--socials-margin: 1.5rem;'
    : ''
})

const socials = [
  { href: 'https://github.com/epicmaxco/vuestic-ui/', label: 'landing.socials.github', icon: 'fa-brands fa-github' },
  { href: 'https://discord.gg/u7fQdqQt8c', label: 'landing.socials.discord', icon: 'fa-brands fa-discord' },
  // { href: 'https://www.facebook.com/epicmaxco/', label: 'landing.socials.facebook', icon: 'fab fa-facebook' },
  { href: 'https://twitter.com/epicmaxco', label: 'landing.socials.twitter', icon: 'fa-brands fa-twitter' },
]
</script>

<style lang="scss" scoped>
.socials {
  --socials-margin: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &__item {
    margin-left: var(--socials-margin);

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
