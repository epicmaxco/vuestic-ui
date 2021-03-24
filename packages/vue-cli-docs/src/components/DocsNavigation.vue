<template>
  <div class="docs-navigation">
    <va-button
      flat
      size="small"
      class="docs-navigation__button"
      color="gray"
      @click="copy"
    >
      <i class="docs-navigation__button__icon" :class="copyIcon" />
      <span class="docs-navigation__button__text">{{ copyText }}</span>
    </va-button>

    <va-button
      v-for="(link, index) in links" :key="index"
      flat
      size="small"
      class="docs-navigation__button"
      color="gray"
      :href="link.url"
      target="_blank"
    >
      <i class="docs-navigation__button__icon" :class="link.icon" />
      <span class="docs-navigation__button__text">{{ link.text }}</span>
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
          text: 'Open in GitHub',
          icon: 'fa fa-github',
          url: `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/examples/${this.gitUrl}.vue`,
        },
        {
          text: 'Open in CodePen',
          icon: 'fa fa-codepen',
          url: '#',
        },
      ],
      copyIcon: 'fa fa-files-o',
      copyText: 'Copy code',
    }
  },
  methods: {
    copy () {
      this.$clipboard(this.code)
      this.copyIcon = 'fa fa-check'
      this.copyText = 'Copied'
      setTimeout(() => {
        this.copyText = 'Copy code'
        this.copyIcon = 'fa fa-files-o'
      }, 1500)
    },
  },
}
</script>

<style lang="scss">
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources";

.docs-navigation {
  background: $prism-background;
  margin: 0.2rem 0;
  border-radius: 0.25rem;

  &__button {
    padding: 1.5rem 0.5rem;
    margin: 0 0.5rem;
    font-weight: bold;

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
      margin-right: 0.5rem;
    }
  }
}
</style>
