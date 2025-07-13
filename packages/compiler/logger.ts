import { createLogger } from "vite";

export const logger = createLogger('info', {
  prefix: '[vuestic:compiler]'
})
