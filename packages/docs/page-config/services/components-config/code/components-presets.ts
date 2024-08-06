createVuestic({
  config: {
    components: {
      presets: {
        VaButton: {
          addToCart: { round: true, color: 'success', icon: 'shopping_cart', 'slot:default': 'Add to card' },
        },
      },
    },
  }
})
