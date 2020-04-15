export default {
  component: 'va-content',
  children: [
    { component: 'h1', text: 'header' },
    {
      component: 'va-card',
      text: 'child1 works',
      componentProps: {
        outlined: true
      },
      children: [
        {
          component: 'va-card-title',
          text: 'title text'
        },
        {
          component: 'va-card-content',
          text: 'Va card content',
          configStyle: 'font-weight: bold'
        }
      ]
    }
  ]
}
