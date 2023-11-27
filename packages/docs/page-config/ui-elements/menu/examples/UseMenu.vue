<template>
  <ul>
    <li
      v-for="user in 4"
      :key="user"
      @click.right="$event => show({
        event: $event,
        options: [
          { text: 'Rename', icon: 'edit' },
          { text: 'Share', icon: 'share' },
          { text: 'Delete', icon: 'delete' },
        ],
        onSelected(option) {
          console.log(option, user)
        },
      })"
    >
      User {{ user }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { useMenu } from 'vuestic-ui';

  const { show } = useMenu()
</script>
