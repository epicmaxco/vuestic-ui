// tests/setup.js
import { config } from '@vue/test-utils'
import { createVuestic } from 'vuestic-ui'

config.global.plugins.push(createVuestic())
