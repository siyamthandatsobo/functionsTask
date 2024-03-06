<template>
    <div>
      <h2>Shopping Cart</h2>
      <div v-for="item in cart" :key="item.prodID">
        <p>{{ item.prodName }} - ${{ item.amount }}</p>
        <button @click="removeFromCart(order.orderID)">Remove from Cart</button>
      </div>
    </div>
  </template>
  
  
<script>
export default {
  computed: {
   
  },
  methods: {
  removeFromCart(order) {
    console.log(order)
    this.$store.dispatch('removeProductFromCart',order);
  }
}
}
</script>
  