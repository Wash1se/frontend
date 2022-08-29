<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white my-navbar">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4">My site</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
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
    <hr>
  </div>

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
.my-navbar{
  background-color: #070707;
  width: 20rem;
  height: 100%;
}

.nav-item {
  color:red;
  margin:5%;
}
.navbar-nav{
    width:20%;
    justify-content: center;
}
</style>