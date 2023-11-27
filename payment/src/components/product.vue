<template>
  <!-- Tampilan kartu produk -->
  <div class="product-card">
    <!-- Gambar produk -->
    <img src="../assets/images.jpeg" alt="Product Image" class="product-image" />

    <!-- Detail produk -->
    <div class="product-details">
      <h2 class="product-name">{{ title }}</h2>
      <p class="product-description">{{ description }}</p>
      <p class="product-price">Rp {{ price }}</p>
    </div>

    <!-- Tombol plus dan minus untuk menambah atau mengurangi jumlah produk -->
    <div class="plus-minus-button">
      <button @click="removeFromCart">-</button>
      <span style="margin-left: 10px; margin-right: 10px;">{{ qty }}</span>
      <button @click="addToCart">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Properti yang diterima dari induk komponen
    index: Number,
    image: String,
    title: String,
    description: String,
    price: Number,
    addToCart: Function,
    removeFromCart: Function,
  },
  data() {
    return {
      // Data lokal untuk jumlah produk
      qty: 0,
    };
  },
  methods: {
    // Metode untuk menambahkan produk ke keranjang
    addToCart() {
      this.qty++;
      this.addToCart(this); // Panggil fungsi induk
    },
    // Metode untuk menghapus produk dari keranjang
    removeFromCart() {
      if (this.qty > 0) {
        this.qty--;
        this.removeFromCart(this); // Panggil fungsi induk
      }
    },
  },
};
</script>
