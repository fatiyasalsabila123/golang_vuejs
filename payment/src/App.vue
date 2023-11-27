<template>
  <!-- Tampilan Cart -->
  <div class="cart-container">
    <div class="cart-header">
      <h2>Your Cart</h2>
    </div>

    <div class="cart-items">
      <!-- Loop melalui setiap produk dalam cart -->
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <!-- Menampilkan informasi produk dalam cart -->
        {{ item.product.title }} - Quantity: {{ item.product.qty }}
      </div>
      <p>Total: Rp {{ cartTotal }}</p>

      <!-- Tombol untuk checkout -->
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as alert  from '../utils/alert'
import * as token  from '../utils/token'

export default {
  data() {
    return {
      // Daftar produk yang dapat ditambahkan ke keranjang
      products: [
        // ... (produk lainnya)
      ],
      // Daftar produk dalam keranjang
      cart: [],
    };
  },
  computed: {
    // Menghitung total harga produk dalam keranjang
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.product.price * item.product.qty, 0);
    },
  },
  methods: {
    // Menambahkan produk ke keranjang
    addToCart(product) {
      const cartItem = this.cart.find((item) => item.product.index === product.index);
      if (cartItem) {
        // ... (jika produk sudah ada dalam keranjang)
      } else {
        this.cart.push({ product });
      }
    },
    // Menghapus produk dari keranjang
    removeFromCart(product) {
      const cartItem = this.cart.find((item) => item.product.index === product.index);
      if (cartItem) {
        if (cartItem.product.qty > 0) {
          // ... (jika kuantitas produk > 0)
        } else {
          this.cart = this.cart.filter((item) => item.product.index !== product.index);
        }
      }
    },
    // Proses checkout
    async checkout() {
      // ... (implementasi checkout)
    },
  },
};
</script>
