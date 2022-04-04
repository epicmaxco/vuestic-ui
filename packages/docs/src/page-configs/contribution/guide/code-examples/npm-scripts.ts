export const npmScripts = `
// {{ $t('all.code.npmScripts.runVueBookDevServer')}}
$ yarn serve:book

// {{ $t('all.code.npmScripts.generateFilesForComponent') }}
$ yarn generate:component

// {{ $t('all.code.npmScripts.buildVueBook') }}
$ yarn build:book

// {{ $t('all.code.npmScripts.lint') }}
$ yarn lint

// {{ $t('all.code.npmScripts.runTests') }}
$ yarn test:unit

// {{ $t('all.code.npmScripts.runVuepressDevServer') }}
$ yarn serve:docs

// {{ $t('all.code.npmScripts.buildVuepress') }}
$ yarn build:docs
`
