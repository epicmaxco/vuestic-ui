import { defineVitePlugin } from './../types/define-vite-plugin'

/**
 * When vue compiles file, it encode generic into file name
 *
 * @example
 * VaDataTable.vue_vue_type_script_generic_Item%20extends%20Record%3Cstring%2C%20any%3E_setup_true_lang
 *
 * This might be helpful for compiler, but it makes file names unreadable and some bundlers may not allow encoded characters in file names.
 * This plugin replaces encoded characters in file names and source maps with underscores.
 */
const GENERIC_NAME_REGEX = /.vue_vue_type_script_generic_.*_setup_true_lang/gm
const URL_ENCODED_REGEX = /%([0-9]|[A-F]){2}/gm

const replaceEncodedCharacters = (match: string) => match
  .replace(URL_ENCODED_REGEX, '_') // Replace any encoded character with underscore
  .replace(/_{2,}/g, '_') // Replace multiple underscores with single underscore

export const fixVueGenericComponentFileNames = defineVitePlugin({
  name: 'vuestic:fix-vue-generic-component-file-names',

  generateBundle (options, bundle) {
    Object.keys(bundle).forEach(fileName => {
      const file = bundle[fileName]

      // Replace encoded characters in generic names in source maps
      if (file.type === 'asset' && file.fileName.endsWith('.map')) {
        if (typeof file.source === 'string') {
          file.source = file.source
            .replace(GENERIC_NAME_REGEX, replaceEncodedCharacters)
        }
      }

      // Replace encoded characters in generic names in code
      if (file.type === 'chunk') {
        file.code = file.code
          .replace(GENERIC_NAME_REGEX, replaceEncodedCharacters)
      }

      // Update file name if it has encoded characters
      if (GENERIC_NAME_REGEX.test(fileName)) {
        const newFileName = replaceEncodedCharacters(fileName)

        bundle[newFileName] = {
          ...bundle[fileName],
          fileName: newFileName,
        }

        delete bundle[fileName]
      }
    })
  },
})
