<template>
  <va-dropdown-new>
    <template #anchor>
      <va-button class="mr-2">
        Click
      </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown-new>

  <va-dropdown-new trigger="right-click">
    <template #anchor>
      <va-button class="mr-2">
        Right click
      </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown-new>

  <va-dropdown-new trigger="hover">
    <template #anchor>
      <va-button> Hover </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown-new>

  <div class="mt-2 flex">
    <va-dropdown-new
      v-model="doShowDropdown"
      trigger="none"
      class="mr-2"
      :close-on-click-outside="false"
    >
      <template #anchor>
        <va-button> None </va-button>
      </template>

      <va-dropdown-content> Dropped down! </va-dropdown-content>
    </va-dropdown-new>

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
