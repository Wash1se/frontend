<template>
    <Message />
    <router-view v-if="store.authenticated"/>
    <MusicPlayer v-if="store.authenticated && playerTracklistStore.currentQueue"/>
</template>

<script>
import Message from '@/components/VueMessage.vue';
import MusicPlayer from '@/components/VueMusicPlayer.vue';

// import API from '@/utils/api.js';

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
    },
  beforeMount(){
  }
}
</script>

<style>
</style>

