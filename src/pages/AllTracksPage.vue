<template>
    <Message :type="type" :header="header" :hide_message="hide_message" @returned_show_value="hide_message = $event"/>
    <VueTracklist :music="playerTracklistStore.allTracks" />
</template>

<script>
import Message from '@/components/VueMessage.vue';
import VueTracklist from '@/components/VueTracklist.vue';


import API from '@/utils/api.js';

import { useTokenStore } from '@/stores/store.js';
import { usePlayerTracklistStore } from '@/stores/usePlayerTracklistStore.js';

export default {
  components:{
    Message,
    VueTracklist,
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
      const store = useTokenStore();
      const playerTracklistStore = usePlayerTracklistStore();
      return{
        store,
        playerTracklistStore,
      }
    },


  methods:{
    async getAllSongs(){
      API
      .get(this.store.mainUrl+"audio/songs")
      .then(response => {
          this.playerTracklistStore.allTracks = response.data
          // this.playerTracklistStore.currentQueue = response.data
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
    created(){
      },
  beforeMount(){
    this.getAllSongs()
  }
}
</script>

<style>
</style>

