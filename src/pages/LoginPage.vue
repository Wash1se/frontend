<template>
  <div class="container mt-5">
    <Message :type="type" :header="header" :hide_message="hide_message" @returned_show_value="hide_message = $event"/>
    <div class="row">
      <div class="col-sm-6 mx-auto">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" v-bind:class="{ highlighted: field==='email'}" >
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" v-bind:class="{ highlighted: field==='password'}">
          </div>

          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
   </div>
</template>

<script>

import Message from "./../components/VueMessage.vue"
import { useTokenStore } from './../stores/store.js'

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
      email: null,
      password: null,
      type: null,
      header: null,
      hide_message: true,
      field: null,
    };
  },
  methods:{
    async login(){
      const result = await this.store.getTokenFromBack(this.email, this.password)
      this.field=result.field
      this.type=result.type
      this.header=result.header
      this.hide_message=result.hide_message
    }
  }
  
}
</script>

<style>
  .highlighted{
    border: 1px solid #e20505;
  }
  .h1{
    font-size: 15px;
  }
</style>

