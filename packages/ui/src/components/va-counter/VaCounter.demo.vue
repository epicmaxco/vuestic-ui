<template>
  <VbDemo class="va-counter-css-classes-demo">
    <VbCard title="default">
      <va-counter v-model="value" />
      <va-counter
        v-model="value"
        messages="with hint massage"
      />
      <va-counter
        v-model="value"
        manual-input
        messages="prop 'manual-input'"
      />
    </VbCard>

    <VbCard title="attributes">
      <va-counter
        v-model="emptyValue"
        tabindex="0"
        placeholder="Name"
        :messages="['attr `placeholder`', 'attr `tabindex`']"
      />
      <va-counter
        v-model="emptyValue"
        name="Name"
        id="Id"
        :messages="['attr `name`', 'attr `id`']"
      />
    </VbCard>

    <VbCard title="styles (icons)">
      <va-counter v-model="value" />
      <va-counter v-model="value" outline />
      <va-counter v-model="value" bordered />
    </VbCard>

    <VbCard title="styles (buttons)">
      <va-counter v-model="value" buttons />
      <va-counter v-model="value" buttons rounded />
      <va-counter v-model="value" buttons :flat="false" />
      <va-counter v-model="value" buttons :flat="false" rounded />
      <va-counter v-model="value" buttons :flat="false" margins="0" />
      <va-counter v-model="value" buttons :flat="false" margins="0" rounded />
    </VbCard>

    <VbCard title="styles (buttons, outline)">
      <va-counter v-model="value" buttons outline />
      <va-counter v-model="value" outline buttons rounded />
      <va-counter v-model="value" buttons outline :flat="false" />
      <va-counter v-model="value" buttons outline :flat="false" rounded />
      <va-counter v-model="value" buttons outline margins="0" />
      <va-counter v-model="value" buttons outline margins="0" rounded />
    </VbCard>

    <VbCard title="styles (buttons, bordered)">
      <va-counter v-model="value" bordered buttons />
      <va-counter v-model="value" bordered buttons rounded />
      <va-counter v-model="value" buttons bordered :flat="false" />
      <va-counter v-model="value" buttons bordered :flat="false" rounded />
      <va-counter v-model="value" buttons bordered :flat="false" margins="0" />
      <va-counter v-model="value" buttons bordered :flat="false" margins="0" rounded />
    </VbCard>

    <VbCard title="width & margins (buttons)">
      <va-counter
        v-model="value"
        width="300px"
        :messages="['width = 300px']"
      />
      <va-counter
        v-model="value"
        width="300px"
        outline
        buttons
        :messages="['width = 300px']"
      />
      <va-counter
        v-model="value"
        buttons
        margins="18px"
        width="75%"
        outline
        :messages="['width = 75%', 'margins = 18px']"
      />
    </VbCard>

    <VbCard title="label">
      <va-counter v-model="value" label="outer (default)" />
      <va-counter v-model="value" label="inner" inner-label />
    </VbCard>

    <VbCard title="state">
      <va-counter v-model="value" readonly label="readonly" />
      <va-counter v-model="value" disabled label="disabled" />
      <va-counter v-model="value" buttons readonly label="readonly"
        messages="prop 'buttons'"
      />
      <va-counter v-model="value" buttons disabled label="disabled"
        messages="prop 'buttons'"
      />
    </VbCard>

    <VbCard title="custom icons">
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        @click="logger('--click--')"
        @click-prepend="logger('--click-prepend--')"
        @click-append="logger('--click-append--')"
        @click-prepend-inner="logger('--click-prepend-inner--')"
        @click-append-inner="logger('--click-append-inner--')"
      />
      <va-counter
        v-model="value"
        buttons
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        messages="prop 'buttons'"
        @click="logger('--click--')"
        @click-prepend="logger('--click-prepend--')"
        @click-append="logger('--click-append--')"
        @click-prepend-inner="logger('--click-prepend-inner--')"
        @click-append-inner="logger('--click-append-inner--')"

      />
    </VbCard>

    <VbCard title="custom colors">
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        color="warning"
      />
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        buttons
        color="warning"
      />
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        buttons
        :flat="false"
        color="warning"
      />
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        buttons
        :flat="false"
        rounded
        margins="0"
        color="warning"
        textColor="danger"
      />
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        buttons
        outline
        color="warning"
      />
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        buttons
        outline
        :flat="false"
        color="warning"
      />
      <va-counter
        v-model="value"
        increaseIcon="zoom_in"
        decreaseIcon="zoom_out"
        buttons
        outline
        :flat="false"
        rounded
        margins="0"
        color="warning"
        textColor="danger"
      />
    </VbCard>

    <VbCard title="Focus and Blur">
      <va-counter v-model="value" ref="counter" />
      <va-button @click="focusCounter()">Focus (blur after 2 sec)</va-button>

      <va-counter
        ref="contentCounter"
        v-model="value"
        messages="content slot"
      >
        <template #content="{ value }">
          {{ value }} times
        </template>
      </va-counter>
      <va-button @click="focusContentCounter()">Focus (blur after 2 sec)</va-button>
    </VbCard>

    <VbCard title="Min, max, step">
      <va-counter
        v-model="minMaxValue"
        :min="5" :max="50" :step="6"
        messages="min=5, max=50, step=6"
      />
      <va-counter
        v-model="minMaxValue"
        manual-input
        :min="5" :max="50" :step="6"
        messages="prop 'manual-input'"
      />
      <va-counter
        v-model="minMaxValue2"
        manual-input
        :min="-100" :max="100" :step="10"
        messages="min=-100, max=100, step=10"
      />
    </VbCard>

    <VbCard title="Content slot">
      <va-counter
        v-model="value"
        width="100%"
      >
        <template #content="{ value }">
          <VaChip icon="done">{{ value }} times</VaChip>
        </template>
      </va-counter>
      <va-counter
        v-model="value"
        buttons
        width="100%"
      >
        <template #content="{ value }">
          <VaChip icon="done">{{ value }} times</VaChip>
        </template>
      </va-counter>
    </VbCard>

    <VbCard title="Action slots">
      <va-counter
        v-model="value"
        width="100%"
      >
        <template #decreaseAction="{ decreaseCount }">
          <VaButton size="small" class="ma-2" flat @click="decreaseCount">decrease</VaButton>
        </template>
        <template #increaseAction="{ increaseCount }">
          <VaButton size="small" class="ma-2" flat @click="increaseCount">increase</VaButton>
        </template>
      </va-counter>

      <va-counter
        v-model="value"
        buttons
        messages="prop 'buttons'"
      >
        <template #decreaseAction="{ decreaseCount }">
          <VaIcon @click="decreaseCount" color="warning" name="zoom_out" />
        </template>
        <template #increaseAction="{ increaseCount }">
          <VaIcon @click="increaseCount" color="danger" name="zoom_in" />
        </template>
      </va-counter>
    </VbCard>

    <VbCard title="class & style attr">
      <va-counter
        v-model="value"
        class="static-example-class"
        :class="{ dynamicExampleClass: true }"
        style="padding: 4px;"
        :style="{ backgroundColor: 'pink', width: '200px' }"
      />
    </VbCard>

    <VbCard title="Steps">
      <va-counter v-model="stepsValue" buttons width="340px">
        <template #decreaseAction>
          <va-button-group>
            <VaButton
              v-for="step in steps"
              :key="step"
              class="px-0"
              @click="stepsValue -= step"
            >
              -{{ step }}
            </VaButton>
          </va-button-group>
        </template>
        <template #increaseAction>
          <va-button-group>
            <VaButton
              v-for="step in steps"
              :key="step"
              class="px-0"
              @click="stepsValue += step"
            >
              +{{ step }}
            </VaButton>
          </va-button-group>
        </template>
      </va-counter>
    </VbCard>
  </VbDemo>
</template>

<script>
import { ref } from 'vue'
import { VaCounter } from './index'
import { VaButton } from '../va-button'
import { VaChip } from '../va-chip'
import { VaIcon } from '../va-icon'
import { VaButtonGroup } from '../va-button-group'

export default {
  components: {
    VaCounter,
    VaButton,
    VaButtonGroup,
    VaChip,
    VaIcon,
  },
  setup () {
    const value = ref(10)
    const stepsValue = ref(0)
    const minMaxValue = ref(15)
    const minMaxValue2 = ref(15)
    const emptyValue = ref()

    const counter = ref()
    const contentCounter = ref()

    const blurCounter = () => { counter.value?.blur() }

    const focusCounter = () => {
      counter.value?.focus()
      setTimeout(blurCounter, 2000)
    }

    const blurContentCounter = () => { contentCounter.value?.blur() }

    const focusContentCounter = () => {
      contentCounter.value?.focus()
      setTimeout(blurContentCounter, 2000)
    }

    const logger = (msg) => { console.log(msg) }

    return {
      value,
      emptyValue,
      minMaxValue,
      minMaxValue2,

      counter,
      contentCounter,
      focusCounter,
      focusContentCounter,

      stepsValue,
      steps: [1, 10, 100],

      logger,
    }
  },
}
</script>

<style lang="scss">
.va-counter-css-classes-demo {
  .VbCard {
    min-width: 240px;

    & > .va-button {
      margin-bottom: 2.5rem;
    }
  }

  .va-counter {
    margin: 1rem 0.5rem;
  }
}
</style>
