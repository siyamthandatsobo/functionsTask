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
      state.cart = payload.cart;
    },
    addToCart(state, product) {
      state.cart.push(product);
    },
    setUser(state, user) {
      state.user = user;
      state.loggedIn = true;
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
    async login(context, userLogin) {
      let { data } = await axios.post(baseUrl +'/login',userLogin);
      $cookies.set('jwt', data.token);
      alert(data.msg);
      await router.push('/');
      window.location.reload();
    },
    async logout(context) {
      let cookies = $cookies.keys();
      console.log(cookies);
      $cookies.remove('jwt');  //deleting from frontend
      window.location.reload();
      let { data } = await axios.delete(baseUrl + '/logout');  //deleting from backend
      alert(data.msg);
    },
  }, // Add a comma here
  modules: {
    // Add any modules if needed
  },
});
