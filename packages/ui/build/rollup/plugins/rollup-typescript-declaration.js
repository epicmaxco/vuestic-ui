import { exec } from 'child_process'

/** This plugin allows to create ts definition and specific them to specific folder. */
export default function ({ outDir = undefined }) {
  return {
    name: 'rollup-typescript-declarations',
    buildEnd: (err) => {
      if (err) { return }

      const command = [
        'tsc',
        '--declaration',
        '--emitDeclarationOnly',
        outDir ? `--outDir ${outDir}` : '',
      ].join(' ')

      exec(command)
    },
  }
}
