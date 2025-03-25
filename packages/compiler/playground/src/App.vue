<script setup>
import VcOrderCard from './components/VcOrderCard.vue';

const ordersCount = 1000;
const orders = Array.from({ length: ordersCount }, (_, i) => ({
  id: i,
  customer: `Customer ${i + 1}`,
  amount: (Math.random() * 1000).toFixed(2),
  status: ['Pending', 'Shipped', 'Delivered'][i % 3]
}));
</script>

<template>
  <div class="app">
    <h1>Order Management</h1>
    <div class="orders-grid" v-once>
      <VcOrderCard v-for="order in orders" :order="order" />
    </div>
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
