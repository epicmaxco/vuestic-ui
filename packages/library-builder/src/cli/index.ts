import { build } from '../builder'
import { BuildTarget, BUILD_TYPES } from '../types/targets'
import { args } from './args'

const buildTargets: BuildTarget[] = []

BUILD_TYPES.forEach((type) => {
  // If not provided in args it must be enabled by default
  if (args[type] === true || args[type] === 'true' || args[type] === undefined) {
    buildTargets.push(type)
  }
})

build({
  cwd: process.cwd(),
  ...args,
  targets: buildTargets,
})
