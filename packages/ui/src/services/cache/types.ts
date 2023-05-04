import { TempMap } from '../../utils/temp-map'

export type AppCache = {
  colorContrast: Record<string, number>,
  bgTempCache: TempMap<HTMLElement, string>,
}
