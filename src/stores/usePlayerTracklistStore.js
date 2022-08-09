import { defineStore } from 'pinia'

export const usePlayerTracklistStore = defineStore('PlayerTracklist', {
  state:() => ({
    musicPlaylist: null,
    
    currentlyPlaying: false,
    currentSong: 0,
    waves_active: null,
    currentVolumeBar: 100,
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
