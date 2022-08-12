import { defineStore } from 'pinia'

export const usePlayerTracklistStore = defineStore('PlayerTracklist', {
  state:() => ({
    favouriteMusic: null,
    allTracks:null,
    currentQueue:null,
    
    currentlyPlaying: false,
    currentSong: 0,
    waves_active: null,
  }),
  actions:{
    async setFavouriteMusic(favouriteMusic){
        this.favouriteMusic = favouriteMusic
    }
  },
  persist: {
      enabled: true
  }
})
