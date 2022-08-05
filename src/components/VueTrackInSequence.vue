<template>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet">
        <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"/>
    </head>
    
        <table class="track-in-sec" :id="songs.indexOf(song)+1" v-on:mouseover="showPlayIcon" v-on:mouseleave="unshowPlayIcon" v-for="song in songs" :key=song.id>
            <td class="id-or-waves" style="justify-content:center!important;">
                <div v-if="show_icon === true" id='play-stop-btn' v-bind:class="show_icon_class" v-on:click="playMusic()"></div>
                <div v-if="waves_active===false && show_icon===false" id="song-id">{{songs.indexOf(song)+1}}</div>

                <div v-if="waves_active===true && show_icon===false" class="wave" :class="{ active: waves_active }">
                    <div class="wave1"></div>
                    <div class="wave1"></div>
                    <div class="wave1"></div>
                </div>
            </td>

            <td class="song-img-name-and-author">
                <img :src="'http://127.0.0.1:8000/media/'+song.icon_path" alt="">
                <h5>
                    {{song.song_name}}
                    <br> 
                    <div class="subtitle">{{song.song_author}}</div> 
                </h5>
            </td>

            <td class="song-album">
                <h5>Пока пусто</h5> 
            </td>


            <td class="is_liked">
                <i class="bi bi-heart-fill"></i>
            </td>

            <td class="song-duration">
                <span id="currentEnd">{{song.duration}}</span>
            </td>
            
            

        </table>
       
        
</template>


<script>
import { useTokenStore } from '@/stores/store.js';
  export default{

      setup(){
      const store = useTokenStore();
      return{
        store,
      }
    },

      data(){
        return {
            songs:this.store.musicPlaylist,
            music: null,
            waves_active: false,
            show_icon:false,
            show_icon_class: null,
        }
      },
      methods:{
        showPlayIcon(){
            this.show_icon = true
            if (this.music.paused || this.music.currentTime <= 0){
                this.show_icon_class='bi-play-fill'                
                
            }else{
                this.show_icon_class='bi-pause'
            }
        },
        unshowPlayIcon(){
            this.show_icon = false
            this.show_icon_class=null
        },

        changeMusic(){
            this.music = new Audio('http://127.0.0.1:8000/media/'+this.song_path)
        },

        playMusic(){
            this.store.current_track_playing_music = 'http://127.0.0.1:8000/media/'+this.song_path
            this.store.current_track_playing_icon = 'http://127.0.0.1:8000/media/'+this.icon_path
        }
      },

      mounted(){
        if (this.store.playMusic){
        this.changeMusic()
        }
      },
  }
</script>







<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
*{
    margin: 0;
    padding: 0;
}
.track-in-sec{
    padding:0px 20px;
    margin:10px 0 10px 0;
    display: grid;
    grid-template-columns: .1fr 1fr .5fr .1fr .1fr;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    justify-items: start;
}
.track-in-sec:hover{
    background-color: rgb(255, 255, 255, .1);
}


.track-in-sec  td{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start!important;
}
.track-in-sec td h5{
    padding: 0;
}

.track-in-sec .song-img-name-and-author h5{
    padding: 0 0 0 2%;
}

.bi{
    color: #fff;
}
.track-in-sec .wave{
    width: 30px;
    height: 30px;
    /* border: 1px solid #fff; */
    padding-bottom: 5px;
    display: flex;
    align-items: flex-end;
    margin-right: 10px;
}
.track-in-sec .wave .wave1{
    width: 3px;
    height: 10px;
    margin-right: 3px;
    border-radius: 10px 10px 0px 0px;
    background: #36e2ec;
    animation: unset;
}
.track-in-sec .wave .wave1:nth-child(2){
    height: 13px;
    /* animation-delay: .4s; */
}
.track-in-sec .wave .wave1:nth-child(3){
    height: 8px;
    /* animation-delay: .8s; */
}
.track-in-sec .active .wave1{
    animation: wave .5s linear infinite;
}
.track-in-sec .active .wave1:nth-child(2){
    animation-delay: .4s;
}
.track-in-sec .active .wave1:nth-child(3){
    animation-delay: .8s;
}
@keyframes wave{
    0%{height: 10px;}
    50%{height: 15px;}
    100%{height: 10px;}
}
.track-in-sec img{
    width: 35px;
    height: 35px;
}
.track-in-sec h5{
    width: 90px;
    height: 100%;
    font-size: 13px;
    color: #fff;
    margin: 0;
    padding: 0 0 0 15px;
}
.track-in-sec h5 .subtitle{
    font-size: 11px;
    color: #4c5262;
}
.track-in-sec .icon{
    font-size: 20px;
    color: #fff;
    margin: 0px 20px 0px 30px;
    height: 100%;
    width: 120px;
    display: flex;
    align-items: center;
}
.track-in-sec .icon .fas{
    margin: 10px;
    cursor: pointer;
}
.track-in-sec div{
    color:#fff;
    width: 32px;
    font-size: 11px;
    font-weight: 400;
}
</style>