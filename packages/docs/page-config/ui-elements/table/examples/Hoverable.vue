<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.country }}</td>
          <td>
            <VaBadge
              :text="user.status"
              :color="user.status"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      users: [
        {
          id: 1,
          fullName: "Ashley Mcdaniel",
          email: "ashleymcdaniel@nebulean.com",
          country: "Cayman Islands",
          status: "warning",
        },
        {
          id: 2,
          fullName: "Todd Sellers",
          email: "sellerstodd@nebulean.com",
          country: "Togo",
          status: "info",
        },
        {
          id: 3,
          fullName: "Sherman Knowles",
          email: "shermanknowles@nebulean.com",
          country: "Central African Republic",
          status: "warning",
        },
        {
          id: 4,
          fullName: "Vasquez Lawson",
          email: "vasquezlawson@nebulean.com",
          country: "Bouvet Island",
          status: "info",
        },
      ],
    };
  },
});
</script>

<style>
.va-table-responsive {
  overflow: auto;
}
</style>
