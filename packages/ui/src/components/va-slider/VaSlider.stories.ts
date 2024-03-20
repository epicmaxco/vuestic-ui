import { defineComponent } from 'vue'
import { VaSlider } from '../va-slider'
import { VaButton } from '../va-button'
import VaSliderDemo from './VaSlider.demo.vue'

export default {
  title: 'VaSlider',
  component: VaSlider,
}

export const Old = defineComponent({
  components: { VaSliderDemo },
  // template: '<va-alert description="Message" />',
  template: 'banana',
  // template: '<va-slider-demo/>',
})

export const FlipValues = () =>
  defineComponent({
    components: { VaSlider, VaButton },
    data: () => ({
      value: [70, 30],
    }),
    template: `
    <va-slider
    v-model="value[0]"
    class="mb-6"
    track-label-visible
  />

  <va-slider
    v-model="value[1]"
    class="mb-6"
    track-label-visible
  >
    <template #trackLabel="{ value }">
      <va-chip
        color="warning"
        size="small"
      >
        {{ value }}
      </va-chip>
    </template>
  </va-slider>

  <va-slider
    v-model="value"
    class="mb-6"
    range
    track-label-visible
    :track-label="processTrackLabel"
  />

  <va-slider
    v-model="value"
    range
    track-label-visible
  >
    <template #trackLabel="{ value, order }">
      <va-chip
        size="small"
        :color="order === 0 ? 'success' : 'danger'"
      >
        {{ value }}
      </va-chip>
    </template>
  </va-slider>
  <div>{{value}}</div>
  `,
  })
