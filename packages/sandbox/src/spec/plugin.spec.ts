import App from '../app.vue'
import { VaTimePicker } from 'vuestic-ui';
import { VaTimeInput } from 'vuestic-ui';
import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuesticEssential, VaButton, VaInput } from 'vuestic-ui'

test('mounts a component', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [createVuesticEssential({
        components: { VaButton, VaInput, VaTimeInput, VaTimePicker },
      })]
    }
  })

  expect(wrapper.get('.va-button').text()).toContain('Test Am\\Pm toggle and minutes filter.')
})
