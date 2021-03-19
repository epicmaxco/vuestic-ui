<template>
  <VbDemo>
    <VbCard
      title="Basic usage"
      style="width: 400px;"
    >
      <va-select
        style="margin: 8px 0;"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      />
      <p>Value: {{defaultSingleSelect.value}}</p>
    </VbCard>
    <VbCard
      title="Single select"
      style="width: 400px;"
    >
      <va-select
        style="margin: 8px 0;"
        label="Default"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      />
      <va-select
        style="margin: 8px 0;"
        label="Default, hide selected"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        hideSelected
      />
    </VbCard>
    <VbCard
      title="Multi select"
      style="width: 400px;"
    >
      <va-select
        style="margin: 8px 0;"
        label="Default"
        :options="defaultMultiSelect.options"
        v-model="defaultMultiSelect.value"
        multiple
      />
      <va-select
        style="margin: 8px 0;"
        label="Default, hide selected"
        :options="defaultMultiSelect.options"
        v-model="defaultMultiSelect.value"
        multiple
        hideSelected
      />
      <va-select
        style="margin: 8px 0;"
        label="Custom tag max (3)"
        :options="defaultMultiSelect.options"
        v-model="defaultMultiSelect.value"
        multiple
        :tagMax="3"
      />
      <va-select
        style="margin: 8px 0;"
        label="Tags"
        :options="defaultMultiSelect.options"
        v-model="defaultMultiSelect.value"
        multiple
        tags
      />
      <va-select
        style="margin: 8px 0;"
        label="Deletable tags"
        :options="defaultMultiSelect.options"
        v-model="defaultMultiSelect.value"
        multiple
        tags
        deletableTags
      />
    </VbCard>
    <VbCard
      title="Object options"
      style="width: 400px;"
    >
      <va-select
        label="Options with icon"
        v-model="objectSingleSelectWithIcons.value"
        :options="objectSingleSelectWithIcons.options"
        textBy="text"
      />
      <va-select
        label="Single select text by text (default)"
        v-model="objectSingleSelect.value"
        :options="objectSingleSelect.options"
        textBy="text"
      />
      <va-select
        label="Text by value"
        v-model="objectSingleSelect.value"
        :options="objectSingleSelect.options"
        textBy="value"
      />
      <p>Value: {{objectSingleSelect.value}}</p>
      <va-select
        label="Multi select Text by value"
        v-model="objectMultiSelect.value"
        :options="objectMultiSelect.options"
        textBy="value"
        multiple
      />
      <p>Value: {{objectMultiSelect.value}}</p>
    </VbCard>
    <VbCard
      title="Decorators"
      style="width: 400px;"
    >
      <va-select
        style="margin: 8px 0;"
        label="With label"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      />
      <va-select
        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        placeholder="Long label"
        v-model="defaultSingleSelect.value"
        :options="defaultSingleSelect.options"
      />
      <va-select
        style="margin: 8px 0;"
        placeholder="With placeholder"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      />
      <va-select
        label="Long placeholder"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        v-model="defaultSingleSelect.value"
        :options="defaultSingleSelect.options"
      />
      <va-select
        label="No options"
        v-model="defaultSingleSelect.value"
        :options="[]"
      />
      <va-select
        label="No options with custom text"
        v-model="defaultSingleSelect.value"
        :options="[]"
        noOptionsText="Sorry, nothing to show :("
      />
      <va-select
        style="margin: 8px 0;"
        label="Clearable"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        clearable
      />
      <va-select
        style="margin: 8px 0;"
        label="Clearable and custom clear icon"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        clearable
        clearIcon="cancel"
      />
      <va-select
        style="margin: 8px 0;"
        label="Hint messages"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        :messages="['Hint message 1', 'Hint message 2']"
      />
      <va-select
        style="margin: 8px 0;"
        label="Prepend slot"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      >
        <template #prepend>
          <va-icon
            name="share"
          />
        </template>
      </va-select>
      <va-select
        style="margin: 8px 0;"
        label="Prepend inner slot"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      >
      <template #prependInner>
        <va-icon
          name="share"
        />
      </template>
      </va-select>
      <va-select
        style="margin: 8px 0;"
        label="Append inner slot"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      >
      <template #appendInner>
        <va-icon
          name="share"
        />
      </template>
      </va-select>
      <va-select
        style="margin: 8px 0;"
        label="Append slot"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
      >
      <template #append>
        <va-icon
          name="share"
        />
      </template>
      </va-select>
      <va-select
        style="margin: 8px 0;"
        label="Custom list position (top)"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        position="top"
      />
      <va-select
        style="margin: 8px 0;"
        label="Custom list position (bottom)"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        position="bottom"
      />
      <va-select
        style="margin: 8px 0;"
        label="Custom list height (320px)"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        maxHeight="320px"
      />
      <va-select
        style="margin: 8px 0;"
        label="Custom select width (50%)"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        width="50%"
      />
    </VbCard>
    <VbCard
      title="State"
      style="width: 400px;"
    >
      <va-select
        style="margin: 8px 0;"
        label="Disabled"
        :options="defaultSingleSelect.options"
        v-model="disabledValue"
        disabled
      />
      <va-select
        style="margin: 8px 0;"
        label="Loading"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        loading
      />
      <va-select
        style="margin: 8px 0;"
        label="Error state"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        error
      />
      <va-select
        style="margin: 8px 0;"
        label="Error state with messages"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        error
        :error-messages="['Error message']"
      />
      <va-select
        style="margin: 8px 0;"
        label="Success state"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        success
      />
      <va-select
        style="margin: 8px 0;"
        label="Success state with messages"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        success
        :messages="['Success message']"
      />
    </VbCard>
    <VbCard
      title="Searchable"
      style="width: 400px;"
    >
      <va-select
        style="margin: 8px 0;"
        label="Searchable single select"
        :options="defaultSingleSelect.options"
        v-model="defaultSingleSelect.value"
        searchable
      />
      <va-select
        style="margin: 8px 0;"
        label="Searchable multi select"
        :options="defaultMultiSelect.options"
        v-model="defaultMultiSelect.value"
        multiple
        searchable
      />
    </VbCard>
    <VbCard
      title="Allow create new"
      style="width: 400px;"
    >
      <va-select
        style="margin: 8px 0;"
        label="Default mode and single select"
        :options="defaultSingleSelect.options"
        v-model="allowCreateValue"
        allowCreate
      />
      <va-select
        style="margin: 8px 0;"
        label="Unique mode and single select"
        :options="defaultSingleSelect.options"
        v-model="allowCreateValueMultiple"
        allowCreate="unique"
      />
      <va-select
        style="margin: 8px 0;"
        label="Default mode and multi select"
        :options="defaultMultiSelect.options"
        v-model="allowCreateValueMultiple"
        allowCreate
        multiple
      />
      <va-select
        label="Unique mode and multi select"
        style="margin: 8px 0;"
        :options="defaultMultiSelect.options"
        v-model="allowCreateValueMultiple"
        allowCreate="unique"
        multiple
      />
    </VbCard>
    <VbCard
      title="With ajax"
      style="width: 400px;"
    >
      <va-select
        searchable
        v-model="defaultSingleSelect.value"
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
        label="At least 1 option should be selected"
        :options="validationSelect.options"
        :rules="validationSelect.rules.required"
        v-model="validationSelect.value"
      />
      <va-select
        label="Exactly 2 options should be selected"
        :options="validationSelect.options"
        :rules="validationSelect.rules.twoOptions"
        v-model="validationSelect.multipleValue"
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
  },
}
</script>
