<!-- Cart.vue -->
<template>
  <div>
    <h2>Your Cart</h2>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cartItem in cart" :key="cartItem.orderID">
          <td>{{ getProductDetails(cartItem.prodID).prodName }}</td>
          <td>{{ cartItem.quantity }}</td>
          <td>
            <button @click="removeFromCart(cartItem.orderID)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    getProductDetails() {
      return (prodID) => {
        return this.$store.state.products.find((product) => product.prodID === prodID);
      };
    },
  },
  methods: {
    removeFromCart(orderID) {
      this.$store.dispatch('removeProductFromCart', orderID);
    },
  },
};
</script>
