<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ cardTitle }}</h5>
      <p class="card-text">{{ cardDescription }}</p>
      <ul class="list-group">
        <li class="list-group-item" v-for="(item, index) in cardItems" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: String,
    cardDescription: String,
    cardItems: Array
  }
};
</script>
