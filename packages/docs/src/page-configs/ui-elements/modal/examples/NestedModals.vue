<template>
  <va-button @click="showFirstModal = !showFirstModal">
    Show first modal
  </va-button>

  <va-modal v-model="showFirstModal" :message="firstMessage" hide-default-actions>
    <va-button class="mr-2" @click="$vaToast.init('Hello')">Basic notification</va-button>
    <va-popover message="Popover text"><va-button>Hover me</va-button></va-popover>
    <va-date-input class="mt-2" />

    <va-button class="mt-5" @click="showSecondModal = !showSecondModal" color="secondary">
      Show second modal
    </va-button>

    <va-modal v-model="showSecondModal" :message="secondMessage">
      <va-button class="mr-2" @click="$vaToast.init('Hello')">Show notification</va-button>
      <va-popover message="Popover text"><va-button>Hover me</va-button></va-popover>
      <va-select class="mt-2" v-model="value" :options="options" />
    </va-modal>
  </va-modal>
</template>

<script>
export default {
  data () {
    return {
      showFirstModal: false,
      showSecondModal: false,
      firstMessage: 'First modal message',
      secondMessage: 'Second modal message',
      value: '',
      options: ['one', 'two', 'three'],
    }
  },
}
</script>
