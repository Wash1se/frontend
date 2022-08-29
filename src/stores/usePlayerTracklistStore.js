import { defineStore } from 'pinia'

export const usePlayerTracklistStore = defineStore('PlayerTracklist', {
  state:() => ({
    allTracks:null,
    previousQueue:null,
    currentQueue:null,
    
    currentlyPlaying: false,
    currentSong: 0,
    // currentSongId:null,
    track_active: null,
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
