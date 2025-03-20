<script setup>
import { ref, computed } from 'vue';

const ordersCount = ref(500);
const orders = computed(() => Array.from({ length: ordersCount.value }, (_, i) => ({
  id: i,
  customer: `Customer ${i + 1}`,
  amount: (Math.random() * 1000).toFixed(2),
  status: ['Pending', 'Shipped', 'Delivered'][i % 3]
})));

const icon = [
  {
    label: 'User',
    icon: 'person'
  }
];
</script>

<template>
  <div class="app">
    <h1>Order Management</h1>
    <button @click="ordersCount += 50">Load More Orders</button>
    <div class="orders-grid">
      <VcOrderCard v-for="order in orders" :order="order" />
    </div>
<!--
    <VcButton>
      Hello
    </VcButton>

    <VcButton icon="heart">
      Hello
    </VcButton>

    <VcButton :icon="icon">
      Hello
    </VcButton> -->
  </div>
</template>

<style>
.app {
  text-align: center;
}
.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}
</style>
