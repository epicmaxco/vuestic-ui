import { getDefaultConfig } from '../../ui/src/components/vuestic-components/va-config/config-default'
import { setGlobalConfig } from '../../ui/src/services/GlobalConfigPlugin'

setGlobalConfig(config => ({
  ...config,
  ...getDefaultConfig(),
}))
