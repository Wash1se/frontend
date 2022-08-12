<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
      <ul class="navbar-nav">
       <li class="nav-item active">
          <router-link to="/">
              Home
          </router-link>
        </li>
       <div v-if="store.authenticated === false">
          <li class="nav-item active">
            <router-link to="/auth/register">
                Register
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/auth/login">
                Login
            </router-link>
          </li>
        </div>
        <div v-if="store.authenticated === true">
          <li class="nav-item active">
            <router-link to="/all-tracks">
                all tracks
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/collection/tracks">
                liked tracks
            </router-link>
          </li>
          <button v-on:click="logout">Logout</button>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useTokenStore } from "@/stores/store";
export default {
  setup(){
      const store = useTokenStore();
      return{
        store
      }
    },

  data(){
    return{
    };
  },
  methods:{
    logout(){
      this.store.logout()
    }
  }
  
}
</script>

<style type="text/css">
.nav-item {
  color:red;
  margin:5%;
}
.navbar-nav{
    width:20%;
    justify-content: center;
}
</style>