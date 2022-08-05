import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import API from '@/utils/api.js';


export const useTokenStore = defineStore('token', {
  state:() => ({
    token: null,
    // mainUrl: 'https://music-platform228.herokuapp.com/',
    // mainAuthUrl: 'https://music-platform228.herokuapp.com/auth/',
    // mediaUrl: 'https://music-platform228.herokuapp.com/media/',
    mainUrl: 'https://music-platform228.herokuapp.com/',
    mainAuthUrl: 'https://music-platform228.herokuapp.com/auth/',
    mediaUrl: 'https://res.cloudinary.com/degn0i1cg/raw/upload/v1/',
    authenticated: false,
    access_expired: true,
    musicPlaylist: null,
  }),
  getters:{
      getToken: (state) => state.token
  },
  actions:{
      async getTokenFromBack (email, password) {
        if (email && password){
          const data = await API
          .post(this.mainAuthUrl+"login/", {email: email, password: password})
          .then((response) => {
            this.token = response.data.tokens.access
            this.authenticated = true
            this.access_expired = false
            VueCookies.set("refresh" , response.data.tokens.refresh, "7d")
            let field = null
            let type = "success"
            let header = 'Success'
            let hide_message = false
            window.location.href = "/"
            return{
              field,
              type,
              header,
              hide_message,
            }
          })
          .catch((error) => {
            // console.clear()
            let field = error.response.data.detail
            let type = "error"
            let header = error.response.data.error
            let hide_message = false
            return{
              field,
              type,
              header,
              hide_message
            }
          });
        return data
        }
        else{
          let field = null
          let type = "error"
          let header = "please enter email and password"
          let hide_message = false
          return{
            field,
            type,
            header,
            hide_message
          }
        }
      },

      async logout () {
        const tokens = {'tokens':{'access':this.token, 'refresh':VueCookies.get("refresh")}}
        API
          .post(this.mainAuthUrl+"logout/", tokens)
          .then(() => {
            this.token = null
            VueCookies.remove("refresh")
            this.authenticated = false
            this.refresh_expired = true
            window.location.href = '/';
          })
          .catch((error) => {
            // console.clear()
            console.log(error)
          });
      },

      async changeAccess(access){
        this.token = access
        this.access_expired = false
      },

      async setMusicPlaylist(MusicPlaylist){
        this.musicPlaylist = MusicPlaylist
      }

  },
  persist: {
      enabled: true
  }
})
