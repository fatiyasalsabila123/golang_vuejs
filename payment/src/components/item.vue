<template>
  <!-- Kolom kustom dengan ukuran lebar 4 dari sistem grid Bootstrap dan pusat secara vertikal -->
  <div class="col-md-4 custom-column custom-center-vertical">
    <!-- Kartu dengan lebar 13rem -->
    <div class="card" style="width: 13rem;">
      <!-- Gambar bagian atas kartu -->
      <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
      <div class="card-body">
        <!-- Judul produk, nilai dari prop cardTitle -->
        <h5 class="product-name">{{cardTitle}}</h5>

        <!-- Deskripsi produk, nilai dari prop cardDescription -->
        <p class="product-description">{{cardDescription}}</p>

        <!-- Area tombol tambah/kurang dengan tampilan hitungan -->
        <div class="plus-minus-button">
          <!-- Tombol kurang, memanggil metode decrement saat diklik -->
          <button @click="decrement">-</button>

          <!-- Tampilan hitungan, menampilkan nilai dari data count -->
          <span>{{ count }}</span>

          <!-- Tombol tambah, memanggil metode callParentFunction saat diklik -->
          <button @click="callParentFunction">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Properti yang diterima oleh komponen
  props: {
    // Index produk, bertipe Number
    index: Number,

    // Judul produk, bertipe String
    cardTitle: String,

    // Deskripsi produk, bertipe String
    cardDescription: String,

    // Fungsi dari parent component, bertipe Function
    parentFunction: Function,
  },
  data(){
    return{
      // Data lokal count untuk menyimpan nilai hitungan
      count: 0
    }
  },
  methods:{
    // Metode untuk menambah nilai hitungan
    increment(){
      this.count++;
    },
    // Metode untuk mengurangi nilai hitungan
    decrement(){
      this.count--;
    },
    // Metode untuk memanggil fungsi dari parent component dan menambah nilai hitungan
    callParentFunction() {
      this.count++;
      // Memanggil fungsi parentFunction dengan parameter count dan index
      this.parentFunction(this.count, this.index);
    }
  },
};
</script>
