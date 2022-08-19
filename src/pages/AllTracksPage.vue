<template>
    <Message :type="type" :header="header" :hide_message="hide_message" @returned_show_value="hide_message = $event"/>
    <VueTracklist :music="playerTracklistStore.allTracks" />
    <!-- <h1>{{playerTracklistStore.allTracks}}</h1> -->
</template>

<script>
import Message from '@/components/VueMessage.vue';
import VueTracklist from '@/components/VueTracklist.vue';


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
    },
    created(){
      },
  beforeMount(){    
    this.emitter.on('getAllSongs', () => {
      this.getAllSongs()
    })
  }
}
</script>

<style>
</style>

