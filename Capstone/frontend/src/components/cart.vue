<template>
    <div>
      <h2>Cart</h2>
      <div v-for="item in cart" :key="item.prodID">
        <p>{{ item.prodName }} - ${{ item.amount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      cart() {
        return this.$store.state.cart;
      },
    },
  };
  </script>