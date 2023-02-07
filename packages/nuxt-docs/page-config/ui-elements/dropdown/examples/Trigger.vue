<template>
  <va-dropdown>
    <template #anchor>
      <va-button class="mr-2"> Click </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown>

  <va-dropdown trigger="right-click">
    <template #anchor>
      <va-button class="mr-2"> Right click </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown>

  <va-dropdown trigger="hover">
    <template #anchor>
      <va-button> Hover </va-button>
    </template>

    <va-dropdown-content> Dropped down! </va-dropdown-content>
  </va-dropdown>

  <div class="mt-2">
    <va-dropdown
      v-model="doShowDropdown"
      trigger="none"
      class="mr-2"
      :closeOnClickOutside="false"
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
