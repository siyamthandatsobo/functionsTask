import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.withCredentials = true;
const baseUrl = 'http://localhost:9000';

export default createStore({
  state: {
    Products: [],
    cart: [] // Add the cart state
  },
  getters: {
    // Add any getters if needed
  },
  mutations: {
    setProducts(state, payload) {
      state.Products = payload;
    },
    addToCart(state, product) {
      state.cart.push(product);
    },
    // Add other mutations if needed
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const { data } = await axios.get(`${baseUrl}/products`);
        commit('setProducts', data);
      } catch (error) {
        console.error('Error getting products:', error);
      }
    },
    async addProduct({ commit }, newproduct) {
      try {
        const { data } = await axios.post(`${baseUrl}/products`, newproduct);
        commit('setProducts', data);
        window.location.reload();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    async deleteProduct({ commit }, prodID) {
      try {
        await axios.delete(`${baseUrl}/products/${prodID}`);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    async addProductToCart({ commit }, prodID) {
      try {
        const { data } = await axios.post(`${baseUrl}/order`, { prodID });
        commit('addToCart', data); 
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    },
    async removeProductFromCart({ commit }, orderID) {
      try {
        await axios.delete(`${baseUrl}/order/${orderID}`);
        window.location.reload();
      } catch (error) {
        console.error('Error removing product from cart:', error);
      }
    },
    async editProduct({ commit }, update) {
      try {
        await axios.patch(`${baseUrl}/products/${update.prodID}`, update);
        window.location.reload();
      } catch (error) {
        console.error('Error editing product:', error);
      }
    },
  },
  modules: {
    // Add any modules if needed
  },
});
