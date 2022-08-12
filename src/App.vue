<template>
  <div>
    <Header />
    <router-view />
    
    <!-- <h1>access expired: {{store.access_expired}}</h1>
    <h1>authenticated: {{store.authenticated}}</h1> -->
  </div>
</template>




<script>
import Header from "./components/VueHeader.vue"

  export default{

    setup(){
    },

    components:{
      Header,
    },
    data(){
        return {
        }
      },
  }
</script>


<style>
body{
  background-color: #111727!important;
}
h1{
  color: #E0CA3C!important;
}
</style>
