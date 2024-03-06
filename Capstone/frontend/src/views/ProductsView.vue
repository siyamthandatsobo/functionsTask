<template>
  <div>
    <h2>Products</h2>
    <div v-for="product in products" :key="product.prodID">
      <p>{{ product.prodName }} - ${{ product.amount }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.Products;
    },
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addProductToCart', product)
    },
  },
  mounted() {
    this.$store.dispatch('getProducts');
  },
};
</script>
