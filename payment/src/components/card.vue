<template>
  <!-- Komponen kartu -->
  <div class="card">
    <div class="card-body">
      <!-- Judul kartu, nilai dari prop cardTitle -->
      <h5 class="card-title">{{ cardTitle }}</h5>

      <!-- Deskripsi kartu, nilai dari prop cardDescription -->
      <p class="card-text">{{ cardDescription }}</p>

      <!-- Daftar item kartu, nilai dari prop cardItems -->
      <ul class="list-group">
        <!-- Loop melalui setiap item dalam array cardItems -->
        <li class="list-group-item" v-for="(item, index) in cardItems" :key="index">
          {{ item }} <!-- Tampilkan setiap item dalam daftar -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // Mendefinisikan properti yang diterima oleh komponen
  props: {
    // Judul kartu, bertipe String
    cardTitle: String,

    // Deskripsi kartu, bertipe String
    cardDescription: String,

    // Daftar item kartu, bertipe Array
    cardItems: Array
  }
};
</script>
