<template>
  <VbDemo>
    <VbCard
      width="500px"
      title="default"
    >
      <va-slider v-model="value" />
    </VbCard>
    <VbCard
      width="500px"
      title="Sliders without track"
    >
      <va-slider
        range
        :show-track="false"
        v-model="value2"
      />
      <va-slider
        :show-track="false"
        v-model="value"
      />
    </VbCard>

    <VbCard
      width="500px"
      height="350px"
      title="Vertical sliders"
    >
      <div style="height: 300px;">
        <va-slider
          vertical
          v-model="value"
        />
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="track label visible"
    >
      <va-slider
        v-model="value"
        track-label-visible
      />
      <br>
      <va-slider
        v-model="value2"
        range
        track-label-visible
      />
      <br>
      <va-slider
        v-model="value2"
        range
        track-label-visible
        :track-label="processTrackLabel"
      />
      <br>
      <va-slider class="mt-3"
        v-model="value2"
        range
        color="danger"
        track-color="warning"
        track-label-visible
      >
        <template #trackLabel="{ value, order }">
          <va-chip
            size="small"
            :color="order === 0 ? 'success' : 'danger'"
          >{{ value }}</va-chip>
        </template>
      </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      title="Step, min, max"
    >
      <va-slider
        track-label-visible
        v-model="value3"
        :step="5"
        :min="min"
        :max="max"
      />
      <input type="number" v-model.number="min">
      <input type="number" v-model.number="max">
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Label"
    >
      <va-slider
        label="Label"
        v-model="value"
      />
      <div style="height: 100px;">
        <va-slider v-model="value"
          label="Label"
          vertical
        />
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="Invert Label"
    >
      <va-slider
        label="Label"
        invert-label
        v-model="value"
      />
      <div>Without label text:</div>
      <va-slider
        invert-label
        v-model="value"
      />
      <div>... and without invert-label prop:</div>
      <va-slider
        v-model="value"
      />
      <div>Vertical:</div>
      <div style="height: 100px;">
        <va-slider v-model="value"
          label="Label"
          invert-label
          vertical
        />
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Slot Label"
    >
      <va-slider
        label="Label"
        v-model="value"
      >
        <template #label>
          <span>
            SLOT
          </span>
        </template>
      </va-slider>
      <div style="height: 100px;">
        <va-slider v-model="value"
          label="Label"
          vertical
        >
          <template #label>
            <span>
              SLOT
            </span>
          </template>
        </va-slider>
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Inverted Slot Label"
    >
      <va-slider
        label="Label"
        invert-label
        v-model="value"
      >
        <template #label>
          <span>
            INVERTED SLOT
          </span>
        </template>
      </va-slider>
      <div style="height: 100px;">
        <va-slider v-model="value"
          invert-label
          vertical
        >
          <template #label>
            <div>
              INVERTED SLOT
            </div>
          </template>
        </va-slider>
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Prepend Icon"
    >
      <va-slider
        icon-prepend="volume_off"
        v-model="value"
      />
      <div style="height: 100px;">
        <va-slider
          v-model="value"
          icon-prepend="volume_off"
          vertical
        />
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Append Icon"
    >
      <va-slider
        icon-append="volume_up"
        v-model="value"
      />
      <div style="height: 100px;">
        <va-slider
          v-model="value"
          icon-append="volume_up"
          vertical
        />
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Both Icons"
    >
      <va-slider
        icon-prepend="volume_off"
        icon-append="volume_up"
        v-model="value"
      />
      <div style="height: 100px;">
        <va-slider
          v-model="value"
          icon-prepend="volume_off"
          icon-append="volume_up"
          vertical
        />
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="Disabled Slider"
    >
      <va-slider
        disabled
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Readonly Slider"
    >
      <va-slider
        readonly
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Pins"
    >
      <va-slider
        pins
        :step="10"
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Colored sliders"
    >
      <va-slider
        color="#f333f2"
        v-model="value"
      />
      Slider and Track colors:
      <va-slider
        color="info"
        track-color="warning"
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Colored label"
    >
      <va-slider
        label-color="primary"
        label="Primary Label"
        v-model="value"
      />
      <br>
      <va-slider
        label-color="warning"
        label="Warning invert label"
        invert-label
        v-model="value"
      />
      <br>
      <va-slider
        label-color="danger"
        v-model="value"
      >
        <template #label>
          Danger slot label
        </template>
      </va-slider>
      <va-slider
        label-color="danger"
        invert-label
        v-model="value"
      >
        <template #label>
          Danger invert slot label
        </template>
      </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      title="Range"
    >
      <va-slider
        range
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Visible Value"
    >
      <va-slider
        range
        track-label-visible
        v-model="value2"
      />
      {{ '[' + value2[0] + ',' + value2[1] + ']' }}
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Label"
    >
      <va-slider
        range
        label="Label"
        v-model="value2"
      />
      <br>
      <va-slider
        label="Invert label"
        invert-label
        range
        v-model="value2"
      />
      <br>
      <va-slider
        range
        v-model="value2"
      >
        <template #label>
          Slot label
        </template>
      </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Left Icon"
    >
      <va-slider
        range
        icon-prepend="volume_off"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Right Icon"
    >
      <va-slider
        range
        icon-append="volume_up"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Both Icons"
    >
      <va-slider
        range
        icon-prepend="volume_off"
        icon-append="volume_up"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Disabled Range"
    >
      <va-slider
        range
        disabled
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Pins"
    >
      <va-slider
        range
        pins
        :step="10"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Colorful Range"
    >
      <va-slider
        range
        color="info"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Input"
    >
     <va-slider v-model="value">
       <template #prepend>
        <va-input
          v-model="value"
        />
       </template>
     </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Inputs"
    >
     <va-slider v-model="value2" range>
       <template #prepend>
        <va-input v-model="value2[0]" />
       </template>
       <template #append>
        <va-input v-model="value2[1]" />
       </template>
     </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      title="With append and prepend slot"
    >
      <va-slider v-model="value">
        <template #prepend>
           prepend
        </template>
      </va-slider>
      <va-slider v-model="value">
        <template #append>
           append
        </template>
      </va-slider>
      <va-slider v-model="value">
        <template #prepend>
           prepend
        </template>
        <template #append>
           append
        </template>
      </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      height="350px"
      title="Vertical slider with append and prepend slot"
    >
    <div style="display: flex;">
      <div style="height: 300px; margin-right: 1rem;">
        <va-slider v-model="value" vertical>
          <template #prepend>
            prepend
          </template>
        </va-slider>
      </div>
      <div style="height: 300px; margin-right: 1rem;">
        <va-slider v-model="value" vertical>
          <template #append>
            append
          </template>
        </va-slider>
      </div>
      <div style="height: 300px;">
        <va-slider v-model="value" vertical>
          <template #prepend>
            prepend
          </template>
          <template #append>
            append
          </template>
        </va-slider>
      </div>
    </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSlider from './VaSlider.vue'
import VaInput from '../va-input/VaInput'
import VaChip from '../va-chip/VaChip.vue'

export default {
  components: {
    VaInput,
    VaSlider,
    VaChip,
  },
  data () {
    return {
      value: 90,
      value2: [20, 60],
      value3: 1500,
      value4: [1100, 1320],
      min: 1000,
      max: 2000,
    }
  },
  methods: {
    processTrackLabel (value, order) {
      return order === 0
        ? `min ${value}$`
        : `max ${value}$`
    },
  },
}
</script>
<style scoped lang="scss">
  .VbCard {
    min-width: 200px;
  }
</style>
