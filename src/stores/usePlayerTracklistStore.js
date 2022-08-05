import { defineStore } from 'pinia'

export const usePlayerTracklistStore = defineStore('PlayerTracklist', {
  state:() => ({
    musicPlaylist: null,
    
  }),
  actions:{
    async setMusicPlaylist(MusicPlaylist){
        this.musicPlaylist = MusicPlaylist
    }
  },
  persist: {
      enabled: true
  }
})
