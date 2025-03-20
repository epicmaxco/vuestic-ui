<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  order: { type: Object, required: true}
});
</script>

<template>
  <div class="order-card">
    <h3>Order #{{ order.id }}</h3>
    <p><strong>Customer:</strong> {{ order.customer }}</p>
    <p><strong>Amount:</strong> ${{ order.amount }}</p>
    <p><strong>Status:</strong> <span :class="order.status.toLowerCase()">{{ order.status }}</span></p>
  </div>
</template>

<style scoped>
.order-card {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: white;
}
.order-card .pending {
  color: orange;
}
.order-card .shipped {
  color: blue;
}
.order-card .delivered {
  color: green;
}
</style>
