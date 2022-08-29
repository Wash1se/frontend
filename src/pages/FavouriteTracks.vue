<template>
  <Message :type="type" :header="header" :hide_message="hide_message" @returned_show_value="hide_message = $event"/>
  <div v-if="store.authenticated" style="width: 100%;">
    <div style="padding: 0px 20px; margin: 10px 0 10px 0;">
      <table class="naming">
              <td class="id-or-waves">
          
              </td>

              <td class="song-img-name-and-author">
                Title
              </td>

              <td class="song-album">
                Album
              </td>

              <td class="liked">

              </td>

              <td class="song-duration">
                <i class="bi bi-clock"></i>
              </td>
          </table>
    </div>

    <VueTracklist :music="playerTracklistStore.allTracks.filter(song => song.is_liked === true)"/>    

  </div>
</template>

<script>
import { useTokenStore } from '@/stores/store.js';
import { usePlayerTracklistStore } from '@/stores/usePlayerTracklistStore.js';

import Message from '@/components/VueMessage.vue';
// import API from '@/utils/api.js';
import VueTracklist from '@/components/VueTracklist.vue';


export default {
  components:{
      Message,
      VueTracklist,
    },

  setup(){
      const store = useTokenStore();
      const playerTracklistStore = usePlayerTracklistStore();
      return{
        store,
        playerTracklistStore,
      }
    },

  data(){
    return{
      type: null,
      header: null,
      hide_message: true,
      field: null,
    };
  },
  methods:{
    },
  beforeMount(){
  }
  
}
</script>



<style>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");

  .naming, tbody{
    width: 100%;
  }

  .tracklist{
    width: 100%;
  }

  .naming tbody tr{
    color: darkgrey;
    display: grid;
    grid-template-columns: .1fr 1fr .5fr .1fr .1fr;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    justify-items: start;
  }

  .naming tbody tr td{
    width: 100%;
  }

  h1{
    padding:0;
    margin: 0;
  }

  .songs{
    margin: 2%;
  }
  

</style>