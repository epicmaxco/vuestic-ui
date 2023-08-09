import { build } from '../builder'
import { BuildTarget, BUILD_TYPES } from '../types/targets'
import { args } from './args'

const buildTargets: BuildTarget[] = []

BUILD_TYPES.forEach((type) => {
  if (args[type]) {
    buildTargets.push(type)
  }
})

build({
  cwd: process.cwd(),
  ...args,
  targets: buildTargets,
})
