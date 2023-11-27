<script setup>
import Product from '../components/product.vue'; // Mengimpor komponen Product dari file terpisah
</script>

<template>
  <div>
    <!-- Judul halaman -->
    <h1 class="page-title">E-commerce Store</h1>

    <!-- Daftar produk -->
    <div class="product-list">
      <!-- Menggunakan komponen Product untuk setiap item dalam daftar produk -->
      <Product
        v-for="(item, index) in products"
        :title="item.title"
        :description="item.desc"
        :price="item.price"
        :index="item.index"
        :addToCart="addToCart"
        :removeFromCart="removeFromCart"
      ></Product>
    </div>

    <!-- Keranjang Belanja -->
    <div class="cart">
      <h2>Shopping Cart</h2>
      <!-- Menampilkan setiap item dalam keranjang belanja -->
      <div v-for="item in cart">
        {{ item.product.title }} - Quantity: {{ item.product.qty }}
      </div>
      <!-- Menampilkan total belanja -->
      <p>Total: Rp {{ cartTotal }}</p>
      <!-- Tombol untuk proses checkout -->
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as alert  from '../utils/alert'
import * as token  from '../utils/token'

export default {
  // Data yang digunakan dalam komponen
  data() {
    return {
      // Daftar produk yang akan ditampilkan
      products: [
        // Contoh produk dengan properti index, title, desc, price, dan qty
        {
          index: 1,
          title: "Sample 1",
          desc: "This is a sample card body with multiple items:",
          price: 20000,
          qty: 0,
        },
        // ... (produk lainnya)
      ],
      // Keranjang belanja
      cart: [],
    };
  },
  // Properti yang dihitung secara komputasi
  computed: {
    // Menghitung total belanja berdasarkan isi keranjang
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.product.price * item.product.qty, 0);
    },
  },
  // Metode yang digunakan dalam komponen
  methods: {
    // Menambahkan produk ke keranjang belanja
    addToCart(product) {
      const cartItem = this.cart.find((item) => item.product.index === product.index);
      if (cartItem) {
        // Produk sudah ada dalam keranjang, bisa dilakukan penanganan khusus jika diperlukan
      } else {
        // Tambahkan produk baru ke keranjang belanja
        this.cart.push({ product });
      }
    },
    // Menghapus produk dari keranjang belanja
    removeFromCart(product) {
      const cartItem = this.cart.find((item) => item.product.index === product.index);
      if (cartItem) {
        if (cartItem.product.qty > 0) {
          // Produk memiliki jumlah lebih dari 0, bisa dilakukan penanganan khusus jika diperlukan
        } else {
          // Hapus produk dari keranjang jika jumlahnya 0
          this.cart = this.cart.filter((item) => item.product.index !== product.index);
        }
      }
    },
    // Metode untuk proses checkout
    async checkout() {
      // Memeriksa apakah keranjang belanja tidak kosong
      if (this.cart.length > 0) {
        // Menyiapkan data untuk dikirim sebagai permintaan pembayaran
        const request = this.cart.map((item) => ({ index: item.product.index, qty: item.product.qty }));

        // Melakukan validasi token JWT
        const tokens = localStorage.getItem('jwtToken');
        let status = await token.validateToken(tokens);

        // Jika token tidak valid, tampilkan pesan kesalahan dan hapus token dari localStorage
        if (status == false) {
          localStorage.removeItem("jwtToken");
          alert.showAlertError("PLEASE RELOAD or LOGIN TO GENERATE NEW TOKEN");
          return;
        }

        // Mengirim permintaan pembayaran ke server
        axios.post('/api/payment', JSON.stringify(request), {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `david`, // Header Authorization dengan token atau sesuai kebutuhan
          }
        })
        .then((response) => {
          const resp = response.data;
          if (resp.success == true) {
            alert.showAlertSuccess("BERHASIL PAYMENT");
          } else {
            alert.showAlertError("GAGAL PAYMENT");
          }
        })
        .catch((error) => {
          console.log(error);
          alert.showAlertError("Internal Server Error!");
        });
      } else {
        // Jika keranjang belanja kosong, tampilkan pesan peringatan
        alert.showAlertWarning("Please Add Your Cart First");
      }
    },
  },
};
</script>
