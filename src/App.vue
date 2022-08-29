<template>
  <div class="app-template">
    <Header class="header"/>
    <router-view/>
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

.app-template{
  display: flex;
  width: 100%;
  height: 100%;
}

body{
  background-color: #121212!important;
}
h1{
  color: #E0CA3C!important;
}
</style>
