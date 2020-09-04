<template>
  <div class="docs-nav">
    <va-button
      v-for="(link, index) in links" :key="index"
      flat
      size="small"
      class="docs-nav__button"
      color="gray"
      :href="link.url"
      target="_blank"
    >
      <i class="docs-nav__button__icon" :class="link.icon" />
      <span class="docs-nav__button__text">{{ link.text }}</span>
    </va-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {
          text: 'Copy code',
          icon: 'fa fa-files-o',
          url: '#',
        },
        {
          text: 'Open in CodePen',
          icon: 'fa fa-codepen',
          url: '#',
        },
        {
          text: 'Open in GitHub',
          icon: 'fa fa-github',
          url: 'https://github.com/epicmaxco/vuestic-ui',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import "../ui/src/components/vuestic-sass/resources/resources";

.docs-nav {
  background: $prism-background;
  margin-bottom: 0.1rem;
  border-radius: 0.25rem;

  &__button {
    padding: 1.5rem 0.5rem;
    margin: 0 0.5rem;

    &:hover {
      background: none !important;
      opacity: 0.7;
    }

    &:focus {
      background: none !important;
      opacity: 0.7;
    }

    &__icon {
      font-style: normal !important;
      margin-right: 0.25rem;
    }
  }
}
</style>
