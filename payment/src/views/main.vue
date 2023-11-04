<script setup>
import Product from '../components/product.vue'; 
</script>

<template>
  <div>
    <h1 class="page-title">E-commerce Store</h1>

    <div class="product-list">
      <Product v-for="(item,index) in products" :title="item.title" :description="item.desc" :price="item.price" 
      :index="item.index" :addToCart="addToCart" :removeFromCart="removeFromCart">
      </Product> 
    </div>

    <!-- Shopping Cart -->
    <div class="cart">
      <h2>Shopping Cart</h2>
      <div v-for="item in cart">
        {{ item.product.title }} - Quantity: {{ item.product.qty }}
      </div>
      <p>Total: Rp {{ cartTotal }}</p>
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
      products: [
      {
          index:1,
          title:"Sample 1",
          desc:"This is a sample card body with multiple items:",
          price:20000,
          qty:0,
        },
        {
          index:2,
          title:"Sample 2",
          desc:"This is a sample card body with multiple items:",
          price:20000,
          qty:0,
        },
        {
          index:3,
          title:"Sample 3",
          desc:"This is a sample card body with multiple items:",
          price:20000,
          qty:0,
        },
        {
          index:4,
          title:"Sample 4",
          desc:"This is a sample card body with multiple items:",
          price:20000,
          qty:0,
        },
        {
          index:5,
          title:"Sample 5",
          desc:"This is a sample card body with multiple items:",
          price:20000,
          qty:0,
        },
      ],
      cart: [],
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.product.price * item.product.qty, 0);
    },
  },
  methods: {
    addToCart(product) {
      const cartItem = this.cart.find((item) => item.product.index === product.index);
      if (cartItem) {
      } else {
        this.cart.push({ product});
      }
    },
    removeFromCart(product) {
      const cartItem = this.cart.find((item) => item.product.index === product.index);
      if (cartItem) {
        if (cartItem.product.qty > 0) {
        } else {
          this.cart = this.cart.filter((item) => item.product.index !== product.index);
        }
      }
    },
    async checkout() {
      if(this.cart.length>0){
        const request = []
      
      for(var i =0;i<this.cart.length;i++){
        request.push({ "index": this.cart[i].product.index, "qty": this.cart[i].product.qty });
      }
      
        const tokens = localStorage.getItem('jwtToken');

        let status = await token.validateToken(tokens);

        if(status==false){
          localStorage.removeItem("jwtToken");
          alert.showAlertError("PLEASE RELOAD or LOGIN TO GENERATE NEW TOKEN")
          return
        }
        
        axios.post('/api/payment',JSON.stringify(request) , {headers: {
            'Content-Type': 'application/json',
            "Authorization":`david`,
          }
        })
        .then((response) => {
          const resp = response.data
          if( resp.success == true){
            alert.showAlertSuccess("BERHASIL PAYMENT")            
          }else{
            alert.showAlertError("GAGAL PAYMENT")
          }
        })
        .catch((error) => {
          console.log(error)
          alert.showAlertError("Internal Server Error!")
        });
      }else{
        alert.showAlertWarning("Please Add Your Cart First")
      }
      
    },
  },
};
</script>
