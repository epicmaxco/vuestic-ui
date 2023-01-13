<template>
  <VbDemo>
    <VbCard title="Default">
      No value:
      <va-progress-bar />
      <br>
      Default
      <va-progress-bar :modelValue="value" />
      <br>
      Rounded: false
      <va-progress-bar
        :rounded="false"
        :modelValue="value"
      />
      <br>
      Max: {{ maxValue }}
      <va-progress-bar :modelValue="value" :max="maxValue" />
    </VbCard>

    <VbCard title="Color">
      Danger color
      <va-progress-bar
        :modelValue="value"
        color="danger"
      />
      <br>
      Custom color
      <va-progress-bar
        :modelValue="value"
        color="#22ff00"
      />
    </VbCard>

    <VbCard title="Size">
      Size small
      <va-progress-bar
        size="small"
        :modelValue="value"
      />
      <br>
      Size large
      <va-progress-bar
        size="large"
        :modelValue="value"
      />
      <br>
      Size 25px
      <va-progress-bar
        :size="25"
        :modelValue="value"
      />
      <br>
      Size rem
      <va-progress-bar
        size="2rem"
        :modelValue="value"
      />
    </VbCard>

    <VbCard title="Slotted">
      Static slot
      <va-progress-bar :modelValue="value">
        Slot
      </va-progress-bar>
      <br>
      Small preset
      <va-progress-bar
        :modelValue="value"
        size="small"
      >
        Slot
      </va-progress-bar>
      <br>
      Large preset
      <va-progress-bar
        :modelValue="value"
        :rounded="false"
        size="large"
        content-inside
      >
        {{ value + '%' }}
      </va-progress-bar>
      <br>
      Dynamic slot
      <va-progress-bar :modelValue="value">
        {{ value + '%' }}
      </va-progress-bar>
    </VbCard>

    <VbCard title="Indeterminate">
      Indeterminate
      <va-progress-bar indeterminate />
    </VbCard>

    <VbCard title="Reverse">
      <va-progress-bar
        :modelValue="value"
        reverse
      />
      <br>
      Buffer
      <va-progress-bar
        :modelValue="value"
        :buffer="60"
        reverse
      />
      <br>
      Indeterminate
      <va-progress-bar
        indeterminate
        reverse
      />
    </VbCard>

    <VbCard
      title="Buffer"
      width="400px"
    >
      Buffer
      <va-progress-bar
        :modelValue="value"
        :buffer="bufferValue"
      />
    </VbCard>

    <VbCard title="context checks">
      <div>
        value:
        <VaConfig :components="{ VaProgressBar: { modelValue: 50 } }">
          <VaProgressBar />
        </VaConfig>
      </div>
      <div>
        indeterminate:
        <VaConfig :components="{ VaProgressBar: { indeterminate: true } }">
          <VaProgressBar />
        </VaConfig>
      </div>
      <div>
        color:
        <VaConfig :components="{ VaProgressBar: { color: 'danger' } }">
          <VaProgressBar :modelValue="value" />
        </VaConfig>
      </div>
      <div>
        size:
        <VaConfig :components="{ VaProgressBar: { size: 30 } }">
          <VaProgressBar :modelValue="value" />
        </VaConfig>
      </div>
      <div>
        reverse:
        <VaConfig :components="{ VaProgressBar: { reverse: true } }">
          <VaProgressBar :modelValue="value" />
        </VaConfig>
      </div>
      <div>
        rounded (false):
        <VaConfig :components="{ VaProgressBar: { rounded: false } }">
          <VaProgressBar :modelValue="value" />
        </VaConfig>
      </div>
    </VbCard>

    <VbCard title="Controls">
      <template v-for="(field, idx) in fields" :key="idx">
        {{ field.label }}:
        <div>
          <button @click="subtract(field.key, 100)">
            -100
          </button>
          <button @click="subtract(field.key, 10)">
            -10
          </button>
          <input
            style="width: 50px;"
            type="number"
            v-model.number="field.value"
          >
          <button @click="add(field.key, 10)">
            +10
          </button>
          <button @click="add(field.key, 100)">
            +100
          </button>
        </div>
        <br>
      </template>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaProgressBar } from './index'
import { VaConfig } from '../va-config'

const FIELD_NAMES = {
  bufferValue: 'Buffer values',
  value: 'Values',
  maxValue: 'Max values',
}

export default {
  components: {
    VaProgressBar, VaConfig,
  },

  data () {
    return {
      value: 35,
      maxValue: 42,
      bufferValue: 75,
    }
  },

  computed: {
    fields () {
      return ['value', 'maxValue', 'bufferValue'].map(key => ({
        key,
        value: this[key],
        label: FIELD_NAMES[key],
      }))
    },
  },

  methods: {
    subtract (key, value) {
      this[key] -= value
    },
    add (key, value) {
      this[key] += value
    },
  },
}
</script>
