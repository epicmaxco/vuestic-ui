<template>
  <div class="docs-nav">
    <va-button
      flat
      size="small"
      class="docs-nav__button"
      color="gray"
      @click="copy"
    >
      <i class="docs-nav__button__icon fa fa-files-o" />
      <span class="docs-nav__button__text">Copy code</span>
    </va-button>

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
  props: {
    code: {
      type: String,
      default: '',
    },
    gitUrl: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      links: [
        {
          text: 'Open in CodePen',
          icon: 'fa fa-codepen',
          url: '#',
        },
        {
          text: 'Open in GitHub',
          icon: 'fa fa-github',
          url: `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/examples/${this.gitUrl}.vue`,
        },
      ],
    }
  },
  methods: {
    copy () {
      this.$clipboard(this.code)
    },
  },
}
</script>

<style lang="scss">
@import "../ui/src/components/vuestic-sass/resources/resources";

.docs-nav {
  background: $prism-background;
  margin-bottom: 0.2rem;
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
