<template>
  <VbDemo>
    <VbCard
      title="Basic usage"
      style="width: 400px;"
    >
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        :options="defaultSingleSelect.options"
      />
      <p>Value: {{ defaultSingleSelect.value }}</p>
    </VbCard>
    <VbCard
      title="Style"
      style="width: 400px;"
    >
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Default (solid)"
        :options="defaultSingleSelect.options"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Outline"
        :options="defaultSingleSelect.options"
        outline
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Bordered"
        :options="defaultSingleSelect.options"
        bordered
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Default (solid) (Purple color)"
        color="#990099"
        :options="defaultSingleSelect.options"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Outline (Purple color)"
        :options="defaultSingleSelect.options"
        color="#990099"
        outline
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Bordered (Purple color)"
        :options="defaultSingleSelect.options"
        color="#990099"
        bordered
      />
    </VbCard>
    <VbCard
      title="Single select"
      style="width: 400px;"
    >
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Default"
        :options="defaultSingleSelect.options"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Default, hide selected"
        :options="defaultSingleSelect.options"
        hide-selected
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="No options"
        :options="[]"
      />
    </VbCard>
    <VbCard title="html select for example">
      <select>
        <option value="one">one</option>
        <option value="two">two</option>
        <option value="three">three</option>
      </select>
    </VbCard>
    <VbCard
      title="Multi select"
      style="width: 400px;"
    >
      <va-select
        v-model="defaultMultiSelect.value"
        class="mb-4"
        label="Default"
        :options="defaultMultiSelect.options"
        multiple
      />
      <va-select
        v-model="defaultMultiSelect.value"
        class="mb-4"
        label="Default, hide selected"
        :options="defaultMultiSelect.options"
        multiple
        hide-selected
      />
      <va-select
        v-model="defaultMultiSelect.value"
        class="mb-4"
        label="Max selections (3)"
        :options="defaultMultiSelect.options"
        multiple
        :max-selections="3"
      />
      <va-select
        v-model="defaultMultiSelect.value"
        class="mb-4"
        label="Tags"
        :options="defaultMultiSelect.options"
        multiple
        tags
      />
      <va-select
        v-model="defaultMultiSelect.value"
        class="mb-4"
        label="Deletable tags"
        :options="defaultMultiSelect.options"
        multiple
        tags
        deletable-tags
      />
    </VbCard>
    <VbCard
      title="Object options"
      style="width: 400px;"
    >
      <va-select
        v-model="objectSingleSelectWithIcons.value"
        class="mb-4"
        label="Options with icon"
        :options="objectSingleSelectWithIcons.options"
        text-by="text"
        key-by="icon"
      />
      <p>Value: {{ objectSingleSelectWithIcons.value }}</p>
      <va-select
        v-model="objectSingleSelect.value"
        class="mb-4"
        label="Single select text by text (default)"
        :options="objectSingleSelect.options"
        text-by="text"
      />
      <va-select
        v-model="objectSingleSelect.value"
        class="mb-4"
        label="Text by value"
        :options="objectSingleSelect.options"
        text-by="value"
      />
      <va-select
        v-model="objectSingleSelect.value"
        class="mb-4"
        label="Track by text property"
        :options="objectSingleSelect.options"
        track-by="text"
      />
      <va-select
        v-model="objectSingleSelect.value"
        class="mb-4"
        label="Track by text property (function)"
        :options="objectSingleSelect.options"
        track-by="text"
      />
      <p>Value: {{ objectSingleSelect.value }}</p>
      <va-select
        v-model="objectMultiSelect.value"
        class="mb-4"
        label="Multi select Text by value"
        :options="objectMultiSelect.options"
        text-by="value"
        multiple
      />
      <va-select
        v-model="objectMultiSelect.value"
        class="mb-4"
        label="Searchable multiselect text-by value"
        :options="objectMultiSelect.options"
        text-by="value"
        multiple
        searchable
      />
      <p>Value: {{ objectMultiSelect.value }}</p>
      <va-select
        v-model="objectMultiSelectByValue.value"
        class="mb-4"
        label="Multi select value by value"
        :options="objectMultiSelectByValue.options"
        text-by="value"
        value-by="value"
        multiple
      />
      <p>Value: {{ objectMultiSelectByValue.value }}</p>
    </VbCard>
    <VbCard
      title="Grouped"
      style="width: 400px;"
    >
      <va-select
        v-model="objectGrouped.value"
        class="mb-4"
        :options="objectGrouped.options"
      />

    </VbCard>
    <VbCard
      title="Decorators"
      style="width: 400px;"
    >
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="With label"
        :options="defaultSingleSelect.options"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        placeholder="Long label"
        :options="defaultSingleSelect.options"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        placeholder="With placeholder"
        :options="defaultSingleSelect.options"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Long placeholder"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        :options="defaultSingleSelect.options"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="No options"
        :options="[]"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="No options with custom text"
        :options="[]"
        no-options-text="Sorry, nothing to show :("
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Clearable"
        :options="defaultSingleSelect.options"
        clearable
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Clearable and custom clear icon"
        :options="defaultSingleSelect.options"
        clearable
        clearable-icon="cancel"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Hint messages"
        :options="defaultSingleSelect.options"
        :messages="['Hint message 1', 'Hint message 2']"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Prepend slot"
        :options="defaultSingleSelect.options"
      >
        <template #prepend>
          <va-icon name="share" />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Prepend inner slot"
        :options="defaultSingleSelect.options"
      >
        <template #prependInner>
          <va-icon name="share" />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Append inner slot"
        :options="defaultSingleSelect.options"
      >
        <template #appendInner>
          <va-icon name="share" />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Append slot"
        :options="defaultSingleSelect.options"
      >
        <template #append>
          <va-icon name="share" />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="All slots"
        :options="defaultSingleSelect.options"
        clearable
        :messages="['Hint message 1', 'Hint message 2']"
      >
        <template #prepend>
          <va-icon name="share" />
        </template>
        <template #prependInner>
          <va-icon name="share" />
        </template>
        <template #appendInner>
          <va-icon name="share" />
        </template>
        <template #append>
          <va-icon name="share" />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Content slot"
        :options="defaultSingleSelect.options"
      >
        <template #content="{ value }">
          <va-chip>{{ value || 'no value :(' }}</va-chip>
          <span class="ml-4">
            Click on share ;)
            <va-icon
              name="share"
              @click="alert('Thank you for click!')"
            />
          </span>
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Custom list position (top)"
        :options="defaultSingleSelect.options"
        position="top"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Custom list position (bottom)"
        :options="defaultSingleSelect.options"
        position="bottom"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Custom list height (320px)"
        :options="defaultSingleSelect.options"
        max-height="320px"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Custom select width (50%)"
        :options="defaultSingleSelect.options"
        width="50%"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Required Mark"
        :options="defaultSingleSelect.options"
        required-mark
      />
    </VbCard>
    <VbCard
      title="State"
      style="width: 400px;"
    >
      <va-checkbox
        class="my-3"
        label="Clearable"
        v-model="isClearable"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Readonly"
        placeholder="Try to type in ..."
        :options="defaultSingleSelect.options"
        readonly
        :clearable="isClearable"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Disabled"
        placeholder="Try to focus ..."
        :options="defaultSingleSelect.options"
        disabled
        :clearable="isClearable"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Loading"
        :options="defaultSingleSelect.options"
        loading
        :clearable="isClearable"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Error state"
        :options="defaultSingleSelect.options"
        error
        :clearable="isClearable"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Error state with messages"
        :options="defaultSingleSelect.options"
        error
        :error-messages="['Error message']"
        :clearable="isClearable"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Success state"
        :options="defaultSingleSelect.options"
        success
        :clearable="isClearable"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Success state with messages"
        :options="defaultSingleSelect.options"
        success
        :messages="['Success message']"
        :clearable="isClearable"
      />
    </VbCard>
    <VbCard
      title="Searchable"
      style="width: 400px;"
    >
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Searchable single select"
        :options="defaultSingleSelect.options"
        searchable
      />
      <va-select
        v-model="defaultMultiSelect.value"
        class="mb-4"
        label="Searchable multi select"
        :options="defaultMultiSelect.options"
        multiple
        searchable
      />
    </VbCard>
    <VbCard
      title="Allow create new"
      style="width: 400px;"
    >
      <va-select
        v-model="allowCreateSelect.value"
        class="mb-4"
        label="'true' mode and single select"
        :options="allowCreateSelect.options"
        @create-new="addNewOption"
        track-by="id"
        allow-create
      />
      <va-select
        v-model="allowCreateSelect.allowUniqueValue"
        class="mb-4"
        label="'unique' mode and single select"
        :options="allowCreateSelect.options"
        @create-new="addNewOption"
        track-by="id"
        allow-create="unique"
      />
      <va-select
        v-model="allowCreateSelect.valueMultiple"
        class="mb-4"
        label="'true' mode and multi select"
        :options="allowCreateSelect.options"
        @create-new="addNewOption"
        track-by="id"
        allow-create
        multiple
      />
      <va-select
        v-model="allowCreateSelect.allowUniqueValueMultiple"
        label="'unique' mode and multi select"
        class="mb-4"
        :options="allowCreateSelect.options"
        @create-new="addNewOption"
        track-by="id"
        allow-create="unique"
        multiple
      />
      <va-select
        v-model="allowCreateSelect.valueMultipleMax"
        class="mb-4"
        label="'true' mode and multi select, Max 3 selections"
        :options="allowCreateSelect.options"
        @create-new="addNewOption"
        track-by="id"
        allow-create
        multiple
        :max-selections="3"
      />
    </VbCard>
    <VbCard
      title="With ajax"
      style="width: 400px;"
    >
      <va-select
        v-model="defaultSingleSelect.value"
        searchable
        :options="CountriesList"
        :loading="isLoading"
        @updateSearch="updateSearch"
      />
    </VbCard>
    <VbCard
      title="scroll-bottom event"
      style="width: 400px;"
    >
      <va-select
        v-model="preloadable.value"
        :options="preloadable.options"
        @scrollBottom="onLoadMore()"
      />
    </VbCard>
    <VbCard
      title="Validation rules (on blur)"
      style="width: 400px;"
    >
      <va-select
        v-model="validationSelect.value"
        class="mb-4"
        label="At least 1 option should be selected"
        :options="validationSelect.options"
        :rules="validationSelect.rules.required"
        multiple
      />
      <va-select
        v-model="validationSelect.multipleValue"
        class="mb-4"
        label="Exactly 2 options should be selected"
        :options="validationSelect.options"
        :rules="validationSelect.rules.twoOptions"
        multiple
      />
    </VbCard>
    <VbCard :style="{ 'width': '100%' }">
      <p>{{ defaultSingleSelect.value }}</p>
      <p>{{ objectSingleSelect.value }}</p>
      <p>{{ multipleValue }}</p>
      <p>{{ longSelect.value }}</p>
      <p>{{ validationSelect.value }}</p>
    </VbCard>
  </VbDemo>
</template>

<script>
import CountriesList from '../../data/CountriesList'
import VaIcon from '../va-icon'
import VaCheckbox from '../va-checkbox'
import VaChip from '../va-chip'
import VaSelect from './index'

import { objectOptionsList, iconOptionsList } from './getDemoData'

const positions = ['top', 'bottom']

const random = () => Math.ceil(Math.random() * 10000) + ''

export default {
  components: { VaSelect, VaIcon, VaCheckbox, VaChip },
  data () {
    return {
      allowCreateValue: '',
      allowCreateValueMultiple: '',
      disabledValue: 'Selected option',
      defaultSingleSelect: {
        options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        value: '',
      },
      defaultMultiSelect: {
        options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        value: [],
      },
      preloadable: {
        options: [random(), random(), random(), random(), random()],
        value: '',
      },
      allowCreateSelect: {
        options: [
          { id: '0', text: 'one', value: 'one' },
          { id: '1', text: 'two', value: 'two' },
          { id: '2', text: 'three', value: 'three' },
          { id: '3', text: 'four', value: 'four' },
          { id: '4', text: 'five', value: 'five' },
        ],
        value: '',
        allowUniqueValue: '',
        valueMultiple: [],
        allowUniqueValueMultiple: [],
        valueMultipleMax: [],
      },
      objectSingleSelect: {
        value: '',
        options: objectOptionsList,
      },
      objectGrouped: {
        options: [
          { id: '0', text: 'one', value: 'one', group: 'foo' },
          { id: '1', text: 'two', value: 'two', group: '' },
          { id: '2', text: 'three', value: 'three', group: 'bar' },
          { id: '3', text: 'four', value: 'four', group: 'bar' },
          { id: '4', text: 'five', value: 'five', group: 'foo' },
        ],
        value: '',
      },
      objectMultiSelect: {
        value: [],
        options: objectOptionsList,
      },
      objectMultiSelectByValue: {
        value: [],
        options: objectOptionsList,
      },
      objectSingleSelectWithIcons: {
        value: '',
        options: iconOptionsList,
      },
      objectMultiSelectWithIcons: {
        value: [],
        options: iconOptionsList,
      },
      longSelect: {
        value: '1st long long long long option sit amet, consectetur adipiscing elit,',
        options: [
          '1st long long long long option sit amet, consectetur adipiscing elit,',
          '2nd long  sit amet, consectetur adipiscing elit, long long long long long option',
        ],
      },
      validationSelect: {
        options: ['one', 'two', 'three', 'four'],
        value: '',
        multipleValue: [],
        rules: {
          required: [v => Array.isArray(v) ? v.length >= 1 : !!v || 'at least 1 option should be selected'],
          twoOptions: [v => (Array.isArray(v) && v.length === 2) || '2 options should be selected'],
        },
      },
      multipleValue: [],
      CountriesList,
      positions,
      isLoading: false,
      isClearable: true,
    }
  },
  methods: {
    onLoadMore () {
      this.preloadable.options.push(random(), random(), random())
    },
    updateSearch (val) {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    alert (str) {
      window.alert(str)
    },
    addNewOption (newOption) {
      const option = { id: String(this.allowCreateSelect.options.length), text: newOption, value: newOption }
      this.allowCreateSelect.options = [...this.allowCreateSelect.options, option]
      this.allowCreateSelect.value = option
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/grid/_grid-global-styles";
</style>
