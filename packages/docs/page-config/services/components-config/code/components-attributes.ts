createVuestic({
  config: {
    components: {
      VaAlert: {
        style: 'outline: 2px solid var(--va-primary)',
        class: 'my-custom-alert',
        icon: 'info',
        dense: true,
      }
    }
  }
})
