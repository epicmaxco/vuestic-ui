// prompts.js

// pass `package.json` of project to function argument
module.exports = pkg => {
  const prompts = [
    {
      type: 'confirm',
      name: 'treeshaking',
      message: 'Use treeshaking? You will need to register all components manually.',
      default: false
    },
    {
      type: 'checkbox',
      name: 'treeshakingOptions',
      message: 'Select CSS features that you want to use',
      default: [
        'grid', 'normalize', 'typography'
      ],
      when: (answers) => answers.treeshaking,
      choices: [
        {
          name: 'CSS Grid',
          value: 'grid',
          short: 'CSS Grid'
        },
        {
          name: 'Vuestic Normalize CSS module',
          value: 'normalize',
          short: 'Normalize CSS'
        },
        {
          name: 'Vuestic Typography module',
          value: 'typography',
          short: 'Typography'
        }
      ]
    },
    {
      type: 'confirm',
      name: 'agGrid',
      message: 'Use ag-grid?',
      default: false
    },
  ]

  return prompts
}
