import {
  useGlobalConfig as useGlobalConfigLocal,
  getGlobalConfig as getGlobalConfigLocal,
  setGlobalConfig as setGlobalConfigLocal,
  mergeGlobalConfig as mergeGlobalConfigLocal,
  useColors as useColorsLocal,
  getColor as getColorLocal,
  getColors as getColorsLocal,
  setColors as setColorsLocal,
  GlobalConfig,
  GlobalConfigUpdater,
  ColorConfig
} from 'vuestic-ui'

export const useGlobalConfig = () => {
  return useGlobalConfigLocal()
}

export const getGlobalConfig = () => {
  return getGlobalConfigLocal()
}

export const setGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater) => {
  return setGlobalConfigLocal(updater)
}

export const mergeGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater) => {
  return mergeGlobalConfigLocal(updater)
}

export const useColors = () => {
  return useColorsLocal()
}

export const getColor = () => {
  return getColorLocal()
}

export const getColors = () => {
  return getColorsLocal()
}

export const setColors = (colors: ColorConfig) => {
  return setColorsLocal(colors)
}
