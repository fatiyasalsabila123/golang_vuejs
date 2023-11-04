<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Item from '../components/item.vue' 
</script>

<template>

<h1>MENU CONSTANT</h1>

  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-4 custom-column custom-center-vertical">
        <div class="card" style="width: 15rem;">
          <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <div class="plus-minus-button">
              <button @click="decrement1">-</button>
              <span>{{ count1 }}</span>
              <button @click="increment1">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 custom-column custom-center-vertical">
        <div class="card" style="width: 15rem;">
          <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <div class="plus-minus-button">
              <button @click="decrement2">-</button>
              <span>{{ count2 }}</span>
              <button @click="increment2">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 custom-column custom-center-vertical">
        <div class="card" style="width: 15rem;">
          <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <div class="plus-minus-button">
              <button @click="decrement3">-</button>
              <span>{{ count3 }}</span>
              <button @click="increment3">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 custom-column custom-center-vertical">
        <div class="card" style="width: 15rem;">
          <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <div class="plus-minus-button">
              <button @click="decrement3">-</button>
              <span>{{ count3 }}</span>
              <button @click="increment3">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 custom-column custom-center-vertical">
        <div class="card" style="width: 15rem;">
          <img class="card-img-top" src="../assets/images.jpeg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           <div class="plus-minus-button">
              <button @click="decrement3">-</button>
              <span>{{ count3 }}</span>
              <button @click="increment3">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr>

<h1>MENU DYNAMICT</h1>

  <div class="product-list">
    <Item v-for="(item,index) in items" :cardTitle="item.title" :cardDescription="item.desc" :index="item.index" :parentFunction="updateValue">
    </Item>    
  </div>
</template>

<style>
hr {
    border: none; /* Remove the default line */
    border-top: 2px solid #000000; /* Add a 2px solid line with a color */
    margin: 20px 0; /* Adjust margin as needed */
}
</style>


<script>

export default {
  components: {
    Item
  },
  data() {
    return {
      count1: 0, // Initial count
      count2: 0, // Initial count
      count3: 0, // Initial count
      temp:[],
      jsonRes :"",
      obj :{},
      items:[
        {
          index:1,
          title:"Sample Card222222",
          desc:"This is a sample card body with multiple items:",
          count:0,
        },
        {
          index:2,
          title:"Sample Card333333",
          desc:"This is a sample card body with multiple items:",
          count:0,
        },
        {
          index:3,
          title:"Sample Card333333",
          desc:"This is a sample card body with multiple items:",
          count:0,
        },
        {
          index:4,
          title:"Sample Card333333",
          desc:"This is a sample card body with multiple items:",
          count:0,
        },
        {
          index:5,
          title:"Sample Card333333",
          desc:"This is a sample card body with multiple items:",
          count:0,
        },
      ],
    };
  },
  methods: {
    getAllValues() {
      this.temp = []

      for (let i = 0; i < this.items.length; i++) {
        this.obj= {
          index : this.items[i].index,
          count : this.items[i].count,
        }
        this.temp.push(this.obj);
      }
      
      this.jsonRes = JSON.stringify(this.temp);

      console.log(this.jsonRes);
    },

    updateValue(count,index) {
      for (let i = 0; i < this.items.length; i++) {
        if(this.items[i].index==index){
          this.items[i].count = count
        }
      }

    },
    redirectToPage() {
      this.$router.push('/test');
    },

    increment1() {
      this.count1++;
    },
    decrement1() {
      if (this.count1 > 0) {
        this.count1--;
      }
    },
    increment2() {
      this.count2++;
    },
    decrement2() {
      if (this.count2 > 0) {
        this.count2--;
      }
    },
    increment3() {
      this.count3++;
    },
    decrement3() {
      if (this.count3 > 0) {
        this.count3--;
      }
    },
    loopItems() {
        return this.items.map(item => item + ' ');
    },
  },
  
  
};


</script>