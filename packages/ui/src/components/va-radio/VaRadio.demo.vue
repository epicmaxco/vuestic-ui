<template>
  <VbDemo>
    <VbCard title="Default">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
      />
      <div>
        Selected: {{ selectedOptionString }}
      </div>
      <br>
      <va-radio
        v-model="selectedOptionObject"
        :options="options"
      />
      <div>
        {{ selectedOptionObject }}
      </div>
    </VbCard>
    <VbCard title="Custom label">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        :labels="options.map((o) => `((${o}))`)"
      />
      <br>
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        :labels="options.map((o) => `Slotted label: ${o}`)"
      >
      </va-radio>
    </VbCard>
    <VbCard title="Disabled">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        :disabled="isDisabled"
      />
      <va-checkbox class="mt-2" v-model="isDisabled" label="is Disabled" />
    </VbCard>
    <VbCard title="Readonly">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        :readonly="isReadonly"
      />
      <va-checkbox class="mt-2" v-model="isReadonly" label="is Readonly" />
    </VbCard>
    <VbCard title="Left label">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        left-label
      />
    </VbCard>
    <VbCard title="Colored">
      <va-radio
        v-model="selectedOptionString"
        :options="[options[0]]"
        :labels="['warning']"
        color="warning"
      />
      <va-radio
        v-model="selectedOptionString"
        :options="[options[1]]"
        :labels="['danger']"
        color="danger"
      />
      <va-radio
        v-model="selectedOptionString"
        :options="[options[2]]"
        color="info"
        :labels="['info']"
      />
    </VbCard>
    <VaRadioValidation />
  </VbDemo>
</template>

<script>
import { VaRadio } from './index'
import { VaCheckbox } from '../va-checkbox'
import VaRadioValidation from './VaRadio-validation'

export default {
  components: { VaRadio, VaCheckbox, VaRadioValidation },
  data () {
    const objectOptions = [
      { key: 1, name: 'one' },
      { key: 2, name: 'two' },
      { key: 3, name: 'three' },
    ]

    return {
      options: [
        'one',
        'two',
        'three',
      ],
      selectedOptionString: 'one',

      objectOptions,
      selectedOptionObject: objectOptions[0],
      isDisabled: true,
      isReadonly: true,
    }
  },
}
</script>
