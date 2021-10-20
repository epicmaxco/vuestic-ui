// prompts.js

// pass `package.json` of project to function argument
module.exports = pkg => {
  const prompts = [
    {
      type: 'confirm',
      name: 'treeshaking',
      message: 'Use treeshaking?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useGrid',
      message: 'Use VuesticUI grid classes?',
      default: true,
      when: (answers) => answers.treeshaking
    },
    {
      type: 'confirm',
      name: 'useNormalize',
      message: 'Use VuesticUI normalize?',
      default: true,
      when: (answers) => answers.treeshaking
    },
  ]

  return prompts
}
