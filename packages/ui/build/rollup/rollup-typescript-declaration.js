import { exec } from 'child_process'

/** This plugin allows to create ts definition and specific them to specific folder. */
export default function (options = { outDir: undefined }) {
  return {
    name: 'rollup-typescript-declarations',
    buildEnd: (err) => {
      if (err) { return }

      const command = [
        'tsc',
        '--emitDeclarationOnly',
        options.outDir ? `--outDir ${options.outDir}` : '',
      ].join(' ')

      exec(command)
    },
  }
}
