<script setup lang="ts">
  import { computed, PropType, ref } from 'vue'
  import { VaScrollContainer, VaInput, VaCheckbox, VaSelect, VaAlert, VaCounter, VaDivider, VaButtonToggle, VaTabs, VaTab } from 'vuestic-ui'
  import { useComponent, ComponentProp } from '../../composables/useComponent/useComponent'
  import Color from './options/Color.vue'
  import MultiText from './options/MultiText.vue'
  import Checkbox from './options/Checkbox.vue'
  import { getPropConfig } from './components-config'
  import NumberInput from './options/Number.vue'
  import NotAvaliable from './options/NotAvaliable.vue'

  const { props, meta } = useComponent()

  const getTypeFromProp = (proptype: PropType<any> | undefined) => {
    if (proptype === undefined) {
      return 'text'
    }

    if (proptype === String) {
      return 'text'
    }

    if (proptype === Number) {
      return 'number'
    }

    if (proptype === Boolean) {
      return 'checkbox'
    }

    if (Array.isArray(proptype)) {
      if (proptype.length === 2) {
        if (proptype.includes(String) && proptype.includes(Number)) {
          return 'text'
        }
      }
    }

    return 'unknown'
  }

  const propsFilter = ref('')

  const propsConfigs = computed(() => {
    return Object
      .entries(props.value)
      .filter(([propName, propValue]) => 'meta' in propValue && propName.toLowerCase().includes(propsFilter.value.toLowerCase()))
      .map(([propName, p]) => {
        const prop = p as ComponentProp

        const customConfig = getPropConfig(meta.value.name ?? '', propName)

        const type = customConfig?.type ?? getTypeFromProp(prop.meta.type)

        if (type === 'unknown') {
          console.error(`Unknown type for prop ${propName}`, prop.meta.type)
        }

        return {
          ...customConfig,
          name: propName,
          prop: prop as ComponentProp,
          type: type,
          get value() {
            return prop.codeValue
          },
          set value(value) {
            prop.codeValue = value
          }
        }
      })
  })

  const tab = ref(0)
</script>

<template>
  <VaScrollContainer vertical>
    <div class="component-settings">
      <template v-if="propsConfigs.length > 0">
        <div>
          <VaTabs v-model="tab">
            <template #tabs>
              <VaTab>Props</VaTab>
              <!-- <VaTab disabled>Events</VaTab>
              <VaTab disabled>Layout</VaTab> -->
            </template>
          </VaTabs>
        </div>

        <VaInput v-model="propsFilter" class="component-settings__search-field" placeholder="Filter props" icon="search" />

        <VaDivider />

        <template v-for="prop in propsConfigs">
          <Color v-if="prop.type === 'color'" :label="prop.name" v-model="prop.value" :prop="prop.prop" />
          <VaInput v-else-if="prop.type === 'text'" :label="prop.name" v-model="prop.value" />
          <Checkbox v-else-if="prop.type === 'checkbox'" :label="prop.name" v-model="prop.value" :prop="prop.prop" />
          <VaSelect v-else-if="prop.type === 'select'" :label="prop.name" v-model="prop.value" :options="'options' in prop ? prop.options : []" />
          <NumberInput v-else-if="prop.type === 'number'" :label="prop.name" v-model="prop.value" :prop="prop.prop" />
          <MultiText v-else-if="prop.type === 'multi-text'" :label="prop.name" v-model="prop.value" />
          <NotAvaliable v-else-if="prop.type === 'disabled'" :label="prop.name" />
          <div v-else>
            <div class="va-label">{{ prop.name }}</div>
            <VaAlert color="warning">There are not controls yet for this kind of prop. Please, open an issue on Github</VaAlert>
          </div>
        </template>
      </template>
    </div>
  </VaScrollContainer>
</template>

<style lang="scss">
.component-settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
}

.va-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.625rem;
  letter-spacing: 0.6px;
  line-height: 1.2;
  font-weight: 700;
  text-transform: uppercase;
  min-height: 1rem;
  display: block;
  color: var(--va-primary);
}
</style>