<template>
<div>
  <CartPage :products="this.products"/>
</div>
</template>

<script>
import CartPage from './components/CartPage.vue'

export default {
  name: 'App',
  components: {
    CartPage,
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    // TODO: Share function across CartPage & MiniCart?
    getProductsLocalstorage() {
      return JSON.parse(localStorage.getItem("mfe-products"));
    },
    pushProductsLocalstorage() {
      localStorage.setItem("mfe-products", JSON.stringify(this.products));
    }
  },
  beforeMount() {
    if (this.getProductsLocalstorage() != null) {
      this.products = this.getProductsLocalstorage();
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
