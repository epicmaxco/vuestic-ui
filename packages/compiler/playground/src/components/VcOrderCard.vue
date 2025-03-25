<script setup lang="ts">
import VcButton from './VcButton.vue';

const props = defineProps({
  order: { type: Object, required: true }
});

const statusClass = (status: 'pending' | 'shipped' | 'delivered') => {
  switch (status) {
    case 'pending':
      return 'text-yellow-500';
    case 'shipped':
      return 'text-blue-500';
    case 'delivered':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};
</script>

<template>
  <div class="p-4 rounded-lg shadow bg-white">
    <h3>Order #{{ order.id }}</h3>
    <p><strong>Customer:</strong> {{ order.customer }}</p>
    <p><strong>Amount:</strong> ${{ order.amount }}</p>
    <p><strong>Status:</strong> <span :class="statusClass(order.status.toLowerCase())">{{ order.status }}</span></p>

    <div class="flex flex-col items-center gap-2 mt-2">
      <VcButton color="primary" type="solid">
        View Customer
      </VcButton>
      <VcButton color="secondary" type="outlined">Track Order</VcButton>
    </div>
  </div>
</template>
