<template>
  <va-dropdown>
    <template #anchor>
      <va-button class="mr-2">
        Click
      </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown>

  <va-dropdown trigger="right-click">
    <template #anchor>
      <va-button class="mr-2">
        Right click
      </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown>

  <va-dropdown trigger="dblclick">
    <template #anchor>
      <va-button class="mr-2">
        Double click
      </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown>

  <va-dropdown trigger="hover">
    <template #anchor>
      <va-button class="max-sm:mt-2 max-sm:mr-2">
        Hover
      </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown>

  <div
    class="mt-2 max-sm:inline-block max-sm:leading-none max-sm:align-middle"
  >
    <va-dropdown
      v-model="doShowDropdown"
      trigger="none"
      class="mr-2"
      :close-on-click-outside="false"
    >
      <template #anchor>
        <va-button> None </va-button>
      </template>

      <va-dropdown-content> Dropped down! </va-dropdown-content>
    </va-dropdown>

    <va-button @click="doShowDropdown = !doShowDropdown">
      {{ doShowDropdown ? "hide" : "show" }} dropdown
    </va-button>
  </div>
</template>

<script>
export default {
  data() {
    return { doShowDropdown: false };
  },
};
</script>

<style scoped>
.va-button {
  --va-button-line-height: var(--va-dropdown-line-height);

  vertical-align: middle;
}
</style>
