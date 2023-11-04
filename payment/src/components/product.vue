<template>
  <div class="product-card">
    <img src="../assets/images.jpeg" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h2 class="product-name">{{ title }}</h2>
        <p class="product-description">{{ description }}</p>
        <p class="product-price">Rp {{ price }}</p>
      </div>
    
      <div class="plus-minus-button">
        <button @click="removeFromCart">-</button>
        <span style="margin-left: 10px;margin-right: 10px;">{{ qty }}</span>
        <button @click="addToCart">+</button>
      </div>
    </div>

</template>

<script>
export default {
  props: {
    index: Number,
    image: String,
    title: String,
    description: String,
    price: Number,
    addToCart: Function,
    removeFromCart: Function,
  },
  data(){
    return{
      qty:0,
    }
  },
  methods:{
    addToCart() {
      this.qty++;
      this.addToCart(this); // Call the parent function
    },
    removeFromCart() {
      if( this.qty>0){
        this.qty--;
        this.removeFromCart(this); // Call the parent function
      }
    }
  }


};
</script>
