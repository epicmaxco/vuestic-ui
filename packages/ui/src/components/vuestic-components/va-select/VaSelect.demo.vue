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
        label="Brodered"
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
        label="Brodered (Purple color)"
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
        :track-by="(option) => option.text"
      />
      <p>Value: {{ objectSingleSelect.value }}</p>
      <va-select
        v-model="objectMultiSelect.value"
        label="Multi select Text by value"
        :options="objectMultiSelect.options"
        text-by="value"
        multiple
      />
      <p>Value: {{ objectMultiSelect.value }}</p>
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
          <va-icon
            name="share"
          />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Prepend inner slot"
        :options="defaultSingleSelect.options"
      >
        <template #prependInner>
          <va-icon
            name="share"
          />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Append inner slot"
        :options="defaultSingleSelect.options"
      >
        <template #appendInner>
          <va-icon
            name="share"
          />
        </template>
      </va-select>
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Append slot"
        :options="defaultSingleSelect.options"
      >
        <template #append>
          <va-icon
            name="share"
          />
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
            <va-icon name="share" @click="alert('Thank you for click!')"  />
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
    </VbCard>
    <VbCard
      title="State"
      style="width: 400px;"
    >
      <va-select
        v-model="disabledValue"
        class="mb-4"
        label="Disabled"
        :options="defaultSingleSelect.options"
        disabled
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Loading"
        :options="defaultSingleSelect.options"
        loading
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Error state"
        :options="defaultSingleSelect.options"
        error
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Error state with messages"
        :options="defaultSingleSelect.options"
        error
        :error-messages="['Error message']"
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Success state"
        :options="defaultSingleSelect.options"
        success
      />
      <va-select
        v-model="defaultSingleSelect.value"
        class="mb-4"
        label="Success state with messages"
        :options="defaultSingleSelect.options"
        success
        :messages="['Success message']"
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
        v-model="allowCreateValue"
        class="mb-4"
        label="Default mode and single select"
        :options="defaultSingleSelect.options"
        allow-create
      />
      <va-select
        v-model="allowCreateValue"
        class="mb-4"
        label="Unique mode and single select"
        :options="defaultSingleSelect.options"
        allow-create="unique"
      />
      <va-select
        v-model="allowCreateValueMultiple"
        class="mb-4"
        label="Default mode and multi select"
        :options="defaultMultiSelect.options"
        allow-create
        multiple
      />
      <va-select
        v-model="allowCreateValueMultiple"
        label="Unique mode and multi select"
        class="mb-4"
        :options="defaultMultiSelect.options"
        allow-create="unique"
        multiple
      />
      <va-select
        v-model="allowCreateValueMultiple"
        class="mb-4"
        label="Default mode and multi select, Max 3 selections"
        :options="defaultMultiSelect.options"
        :max-selections=3
        allow-create
        multiple
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
      title="Validation rules (on blur)"
      style="width: 400px;"
    >
      <va-select
        v-model="validationSelect.value"
        class="mb-4"
        label="At least 1 option should be selected"
        :options="validationSelect.options"
        :rules="validationSelect.rules.required"
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
import CountriesList from '../../../data/CountriesList'
import VaIcon from '../va-icon'

import { objectOptionsList, iconOptionsList } from './getDemoData'
import VaSelect from './index'

const positions = ['top', 'bottom']

export default {
  components: { VaSelect, VaIcon },
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
      objectSingleSelect: {
        value: '',
        options: objectOptionsList,
      },
      objectMultiSelect: {
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
          required: [v => Array.isArray(v) ? v.length : !!v || 'at least 1 option should be selected'],
          twoOptions: [v => (Array.isArray(v) && v.length === 2) || '2 options should be selected'],
        },
      },
      multipleValue: [],
      CountriesList,
      positions,
      isLoading: false,
    }
  },
  methods: {
    updateSearch (val) {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        // eslint-disable-next-line no-console
        console.log(val)
      }, 2000)
    },
    alert (str) {
      window.alert(str)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../vuestic-sass/grid/_grid-global-styles";
</style>
