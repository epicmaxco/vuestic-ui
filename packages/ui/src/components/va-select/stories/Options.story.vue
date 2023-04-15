<script setup lang="ts">
import { VaSelect } from '../..'
</script>

<template>
  <Story title="VaSelect/Options">
    <Variant
      title="String value and options"
      :initState="() => ({ value: 'one' })"
      #default="{ state }"
    >
      <va-select v-model="state.value" :options="['one', 'two', 'three']" />
    </Variant>

    <Variant
      title="Numeric value and options"
      :initState="() => ({ value: 1 })"
      #default="{ state }"
    >
      <va-select v-model="state.value" :options="[1, 2, 3, 4, 5]" />
    </Variant>

    <Variant
      title="Object value and options"
      :initState="() => ({ value: { id: 1, text: 'one' } })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        :options="[
          {
            id: 1,
            text: 'one',
            value: 1,
          },
          {
            id: 2,
            text: 'two',
            value: 2,
          },
          {
            id: 3,
            text: 'three',
            value: 3,
          },
        ]"
      /> </Variant
    >P

    <Variant
      title="Numeric value and object options"
      :initState="() => ({ value: 1 })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        :options="[
          { id: 1, text: 'one', value: 1 },
          { id: 2, text: 'two', value: 2 },
          { id: 3, text: 'three', value: 3 },
        ]"
        value-by="value"
      />
    </Variant>

    <Variant
      title="Object value and object options with disabled option"
      :initState="
        () => ({
          value: { value: 1, text: 'One' },
          options: [
            { value: 1, text: 'One' },
            { value: 2, text: 'Two', disabled: true },
            { value: 3, text: 'Three' },
          ],
        })
      "
      #default="{ state }"
    >
      <VaSelect v-model="state.value" :options="state.options" />
    </Variant>

    <Variant
      title="Object value and object options with icons"
      :initState="
        () => ({
          value: { value: 1, text: 'One' },
          options: [
            { value: 1, text: 'One', icon: 'share' },
            { value: 2, text: 'Two', icon: 'face' },
            { value: 3, text: 'Three', icon: 'va-warning' },
          ],
        })
      "
      #default="{ state }"
    >
      <VaSelect v-model="state.value" :options="state.options" />
    </Variant>

    <Variant
      title="Grouped options"
      :initState="
        () => ({
          value: '',
          options: [
            { id: '0', text: 'one', value: 'one', group: 'group 1' },
            { id: '1', text: 'two', value: 'two', group: '' },
            { id: '2', text: 'three', value: 'three', group: 'group 2' },
            { id: '3', text: 'four', value: 'four', group: 'group 2' },
            { id: '4', text: 'five', value: 'five', group: 'group 1' },
          ],
        })
      "
      #default="{ state }"
    >
      <VaSelect v-model="state.value" :options="state.options" />
    </Variant>

    <Variant
      title="Custom slot for options"
      :initState="
        () => ({
          value: 'One',
          options: ['One', 'Two', 'Three'],
        })
      "
      #default="{ state }"
    >
      <VaSelect v-model="state.value" :options="state.options">
        <template #option="{ option, index, selectOption }">
          <div @click="selectOption(option)">
            {{ option }} value with index {{ index }}
          </div>
        </template>
      </VaSelect>
    </Variant>

    <Variant
      title="Virtual scroller"
      :initState="() => ({ value: 'One' })"
      #default="{ state }"
    >
      <VaSelect
        v-model="state.value"
        :options="['One', 'Two', 'Three']"
        :max-visible-options="2"
      />
    </Variant>
    <Variant
      title="Selected options at the top"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-4"
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
        selected-top-shown
        multiple
      />
    </Variant>

    <Variant
      title="Max visible options"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-4"
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
        :max-visible-options="2"
        multiple
      />
    </Variant>

    <Variant
      title="Max visible options with content slot"
      :initState="() => ({ value: [] })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-4"
        :options="[
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' },
          { id: '3', text: 'Option 3' },
          { id: '4', text: 'Option 4' },
        ]"
        :max-visible-options="2"
        multiple
      >
        <template #content="{ value }">
          <va-chip v-for="chip in value" :key="chip" class="mr-1" size="small">
            {{ chip }}
          </va-chip>
        </template>
      </va-select>
    </Variant>
  </Story>
</template>
