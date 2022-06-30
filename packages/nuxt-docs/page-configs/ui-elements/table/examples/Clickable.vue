<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--clickable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.country }}</td>
          <td>
            <va-badge :text="user.status" :color="user.status" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import users from "vuestic-ui/src/data/Users";

export default {
  data() {
    return {
      users: users.slice(0, 4),
    };
  },
};
</script>

<style lang="scss" scoped>
.va-table-responsive {
  overflow: auto;
}
</style>
