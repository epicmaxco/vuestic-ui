import { build } from '../builder'
import { args } from './args'

build({
  cwd: process.cwd(),
  ...args,
})