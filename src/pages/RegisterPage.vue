<template>
  <div class="container mt-5">
    <Message :type="type" :header="header" :hide_message="hide_message" @returned_show_value="hide_message = $event"/>
    <div class="row">
      <div class="col-sm-6 mx-auto">
        <form @submit.prevent="RegisterFunc">

            <div class="mb-3" style="width: 70%;display: flex;flex-wrap: wrap;align-content: center;">
                <label for="username" class="form-label">Username</label>
                <input  class="form-control" id="username" v-model="username" v-bind:class="{ highlighted: field==='username'}">
            </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" v-bind:class="{ highlighted: field==='email'}">
          </div>
        
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" v-bind:class="{ highlighted: field==='password'}">
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <button v-on:click="test">Check</button>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/utils/api.js';
import Message from "./../components/VueMessage.vue"
import { useTokenStore } from './../stores/store.js'

var access_token = null

export default {
  components:{
      Message
    },
  setup(){
      const store = useTokenStore();
      return{
        store
      }
    },
  data(){
    return{
      username: null,
      email: null,
      password: null,
      type: null,
      header: null,
      hide_message: true,
      field: null,
    };
  },
  methods:{
    async RegisterFunc() {
      if (this.username && this.email && this.password) {
        API
        .post(this.store.mainAuthUrl+"register/", {username: this.username, email: this.email, password: this.password})
        .then(response => {
          for (const [key, value] of Object.entries(response.data)) {
            this.field = null
            this.type=key
            this.header=value
          }
          this.hide_message = false
        })
        .catch(error => {
          let err = error.response.data
          this.field = err.detail
          this.type = "error"
          this.header = err.error
          this.hide_message = false
        });
      }
      else{
        this.type="error"
        this.header="Please ensure all fields are filled out"
        this.hide_message = false
        }
    },

    test(){
        console.log("access:"+access_token)
    }
  }
  
}
</script>

<style>
  .highlighted{
    border: 1px solid #e20505;
  }
</style>