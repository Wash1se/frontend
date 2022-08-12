<template>
  <div v-for="(item, index) in playerTracklistStore.allTracks" :key="item.id">
    <p>{{index}}{{item.song_name}}</p>
  </div>
</template>

<script>
import { useTokenStore } from '@/stores/store.js';
import { usePlayerTracklistStore } from '@/stores/usePlayerTracklistStore.js';

export default {
  components:{
    },
  data(){
    return{
    };
  },

    setup(){
      const store = useTokenStore();
      const playerTracklistStore = usePlayerTracklistStore();
      return{
        store,
        playerTracklistStore,
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

