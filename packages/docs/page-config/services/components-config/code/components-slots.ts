import GithubSvgIcon from './GithubSvgIcon.vue'

createVuestic({
  components: {
    presets: {
      VaButton: {
        github: {
          'slot:prepend': markRaw(GithubSvgIcon),
          'slot:default': 'View on GitHub',
          color: '#000000',
          style: 'fill: currentColor',
          class: 'va-button--github',
        }
      }
    }
  }
})
