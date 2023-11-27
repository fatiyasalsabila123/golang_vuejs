<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Item from '../components/item.vue'
</script>

<template>
  <!-- Bagian "MENU CONSTANT" -->
  <div class="container">
    <div class="row justify-content-md-center">
      <!-- Loop melalui data statis -->
      <div class="col-md-4 custom-column custom-center-vertical" v-for="index in 5" :key="index">
        <div class="card" style="width: 15rem;">
          <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <!-- Button untuk menambah/mengurangi nilai count -->
            <div class="plus-minus-button">
              <button @click="decrement(index)">-</button>
              <span>{{ getCount(index) }}</span>
              <button @click="increment(index)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr> <!-- Garis pemisah -->

  <!-- Bagian "MENU DYNAMICT" -->
  <div class="product-list">
    <!-- Loop melalui data dinamis -->
    <Item v-for="(item, index) in items" :key="index" :cardTitle="item.title" :cardDescription="item.desc" :index="item.index" :parentFunction="updateValue">
    </Item>
  </div>
</template>

<style>
hr {
    border: none;
    border-top: 2px solid #000000;
    margin: 20px 0;
}
</style>

<script>
export default {
  components: {
    Item
  },
  data() {
    return {
      // Data statis untuk "MENU CONSTANT"
      count1: 0,
      count2: 0,
      count3: 0,

      // Data dinamis untuk "MENU DYNAMICT"
      items: [
        {
          index: 1,
          title: "Sample Card222222",
          desc: "This is a sample card body with multiple items:",
          count: 0,
        },
        // ... (data lainnya)
      ],
    };
  },
  methods: {
    // Fungsi untuk mendapatkan nilai count berdasarkan index
    getCount(index) {
      return this['count' + index];
    },

    // Fungsi untuk menambah nilai count berdasarkan index
    increment(index) {
      this['count' + index]++;
    },

    // Fungsi untuk mengurangi nilai count berdasarkan index
    decrement(index) {
      if (this['count' + index] > 0) {
        this['count' + index]--;
      }
    },

    // Fungsi untuk mengupdate nilai count pada data dinamis
    updateValue(count, index) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].index === index) {
          this.items[i].count = count;
        }
      }
    },

    // Fungsi untuk mendapatkan nilai count pada data dinamis
    loopItems() {
      return this.items.map(item => item + ' ');
    },
  },
};
</script>
