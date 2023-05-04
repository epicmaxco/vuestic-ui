import { TempMap } from '../../composables/useElementBackground/TempMap'

export type AppCache = {
  colorContrast: Record<string, number>,
  bgTempCache: TempMap<HTMLElement, string>,
}
