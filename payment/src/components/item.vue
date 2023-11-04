<template>
  <div class="col-md-4 custom-column custom-center-vertical">
        <div class="card" style="width: 13rem;">
          <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="product-name">{{cardTitle}}</h5>
            <p class="product-description">{{cardDescription}}</p>
           <div class="plus-minus-button">
              <button @click="decrement">-</button>
              <span>{{ count }}</span>
              <button @click="callParentFunction">+</button>
            </div>
            </div>
        </div>
      </div>

</template>

<script>
export default {
  props: {
    index: Number,
    cardTitle: String,
    cardDescription: String,
    parentFunction: Function,
  },
  data(){
    return{
      count:0
    }
  },
  methods:{
    increment(){
      this.count++;
    },
    decrement(){
      this.count--;
    },
    callParentFunction() {
      this.count++;
      this.parentFunction(this.count, this.index); // Call the parent function
    }
  }
};
</script>
