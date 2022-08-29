<template>
    <Message />
    <router-view v-if="store.authenticated"/>
    <MusicPlayer v-if="store.authenticated && playerTracklistStore.currentQueue"/>
</template>

<script>
import Message from '@/components/VueMessage.vue';
import MusicPlayer from '@/components/VueMusicPlayer.vue';

import API from '@/utils/api.js';

import { useTokenStore } from '@/stores/store.js';
import { usePlayerTracklistStore } from '@/stores/usePlayerTracklistStore.js';

export default {
  components:{
      Message,
      MusicPlayer
    },
  data(){
    return{
        type: null,
        header: null,
        hide_message: true,
        field: null,
    };
  },

    setup(){
      const store = useTokenStore()
      const playerTracklistStore = usePlayerTracklistStore();
      return{
        store,
        playerTracklistStore
      } 
    },


  methods:{
    async getAllSongs(){
      API
      .get(this.store.mainUrl+"audio/songs")
      .then(response => {
          this.playerTracklistStore.allTracks = response.data
          if (!this.playerTracklistStore.previousQueue){this.playerTracklistStore.previousQueue = response.data}
        })
      .catch(error => {
          console.log(error)
          let err = error.response.data
          this.field = err.detail
          this.type = "error"
          this.header = err.error
          this.hide_message = false
        });
      }
    },
  mounted(){
    this.getAllSongs()
  },
}
</script>

<style>
</style>

