<template>
  <VbDemo>
    <VbCard title="Default">
      <div>
        {{ value }}
      </div>
      <va-switch v-model="value" />
    </VbCard>
    <VbCard title="Colors">
      <va-switch v-model="value" />
      <va-switch
        v-model="value"
        color="info"
      />
      <va-switch
        v-model="value"
        color="danger"
      />
      <va-switch
        v-model="value"
        color="warning"
      />
      <va-switch
        v-model="value"
        color="gray"
      />
      <va-switch
        v-model="value"
        color="dark"
      />
    </VbCard>
    <VbCard title="With label">
      <va-switch
        v-model="value"
        label="turn"
      />
      <va-switch v-model="value">
        <div style="background: mediumpurple;">
          Slot label
        </div>
      </va-switch>
    </VbCard>
    <VbCard title="With inner label slot">
      <va-switch
        v-model="value"
      >
        <template #innerLabel>
          Inner
        </template>
      </va-switch>
    </VbCard>
    <VbCard title="Sizes">
      <va-switch
        v-model="value"
        size="small"
        label="small"
      />
      <va-switch
        v-model="value"
        label="default"
      />
      <va-switch
        v-model="value"
        size="large"
        label="large"
      />
    </VbCard>
    <VbCard title="Left label">
      <va-switch
        v-model="value"
        label="left"
        left-label
      />
    </VbCard>
    <VbCard title="Custom labels">
      <div>
        {{value}}
      </div>
      <va-switch
        v-model="value"
        true-label="Yes"
        false-label="No"
      />
    </VbCard>
    <VbCard title="Custom inner labels">
      <va-switch
        v-model="value"
        true-inner-label="Okay"
        false-inner-label="No"
      />
    </VbCard>
    <VbCard title="Custom trueValue, falseValue">
      <div>
        {{customTrueFalse}}
      </div>
      <va-switch
        v-model="customTrueFalse"
        true-value="agree"
        false-value="disagree"
        :label="`${customTrueFalse}`"
      />
    </VbCard>
    <VbCard title="Array as model">
      <div>
        {{ selection }}
      </div>
      <va-switch
        v-model="selection"
        array-value="one"
        label="one"
      />
      <va-switch
        v-model="selection"
        array-value="two"
        label="two"
      />
      <va-switch
        v-model="selection"
        array-value="three"
        label="three"
      />
      <va-switch
        v-model="selection"
        array-value="four"
        label="four"
      />
    </VbCard>
    <VbCard title="Object values">
      <div>
        {{ selectionObjectValues }}
      </div>
      <va-switch
        v-for="objectOption in objectOptions"
        :key="objectOption.id"
        v-model="selectionObjectValues"
        :array-value="objectOption"
        :label="objectOption.name"
      />
    </VbCard>
    <VbCard title="Disabled">
      <va-switch
        v-model="value"
        disabled
      />
    </VbCard>
    <VbCard title="Loading">
      <va-switch
        v-model="value"
        loading
      />
    </VbCard>
    <VbCard title="Validation (required rule)">
      <va-switch
        v-model="value"
        :rules="[(v) => !!v || 'required']"
      />
    </VbCard>
    <VbCard title="Error">
      <va-switch
        v-model="value"
        label="Error"
        error
        error-messages="Error message"
      />
    </VbCard>
    <VbCard title="Stateless switch without v-model">
      <va-switch />
    </VbCard>
    <VbCard title="Stateful">
      <va-switch stateful />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSwitch from './index'

export default {
  components: {
    VaSwitch,
  },
  data () {
    return {
      customValue: [{ id: 1, name: 'one' }],
      value: true,
      valueStateful: true,
      customTrueFalse: 'disagree',
      selection: [],
      selectionObjectValues: [],
      objectOptions: [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' },
      ],
    }
  },
}
</script>
