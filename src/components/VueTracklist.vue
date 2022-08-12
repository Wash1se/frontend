<template>
	<div class="audioPlayerList">
			<div style="padding:0px 20px;margin:10px 0 10px 0;">
				<table class="item" v-for="(item,index) in music"
				:key="item.id"
				@mouseover="highlighted = item.id"
				@mouseleave="highlighted = null"
				@click="this.emitter.emit('clickTrackTemplate', index)">
					<td class="id-waves-or-btn" style="justify-content: center!important;">
						<transition v-if="highlighted === item.id"
						name="fade" mode="out-in" style="display: flex;justify-content: center;width: 100%;" appear>

							<a class="button play" @click="playPauseAudio(index)" title="Play/Pause Song" :key="playerTracklistStore.currentSong + playerTracklistStore.currentlyPlaying">
								<v-icon :name="playerTracklistStore.currentlyPlaying && playerTracklistStore.currentSong === index ? 'hi-solid-pause' : 'bi-play-circle-fill' " 
								:key="1" class="icon" scale="2" fill="red"/>
							</a>
						</transition>

						<div v-if="highlighted != item.id && playerTracklistStore.waves_active!=index" 
						style="display: flex;justify-content: center;width: 100%;" class="index">{{index+1}}</div>
					
						<div v-if="playerTracklistStore.waves_active===index && highlighted != item.id" class="wave active">
							<div class="wave1"></div>
							<div class="wave1"></div>
							<div class="wave1"></div>
						</div>
					</td>


					<td class="song-info">
						<img class="song-img" :src="store.mediaUrl+item.icon_path" alt="">
						<h5>
							{{item.song_name}}
							<br> 
							<div class="subtitle">{{item.song_author}}</div> 
						</h5>
					</td>

					<td class="album">Пока пусто</td>

					<td class="is-liked"><i class="bi fas bi-heart-fill"></i></td>


					<td class="duration">{{item.duration}}</td>
				</table>
			</div>
		</div>
</template>


<script>
import { useTokenStore } from "@/stores/store.js";
import {usePlayerTracklistStore} from "@/stores/usePlayerTracklistStore.js";


export default {

	components:{
	},

	name: "trackList",

	props:['music'],

    setup(){
      const store = useTokenStore();
      const playerTracklistStore = usePlayerTracklistStore();

      return{
        store,
        playerTracklistStore,

        // waves_active: playerTracklistStore.waves_active, //track list & player 1
        // currentSong: playerTracklistStore.currentSong, //track list & player 1
        // currentlyPlaying: playerTracklistStore.currentlyPlaying, //track list & player 1

        
      }
    },

	data() {
		return {
				highlighted:null, //track list

				// favouriteMusic:this.favouriteMusic, //track list & player

				// waves_active: Vue.prototype.$waves_active, //track list & player
				// audio: Vue.prototype.$audio, //track list & player
				// posterLoad: Vue.prototype.$posterLoad, //track list & player
				// currentlyPlaying: Vue.prototype.$currentlyPlaying, //track list & player
				// currentSong: Vue.prototype.$currentSong, //track list & player
				// trackDuration: Vue.prototype.$trackDuration, //track list & player
				// checkingCurrentPositionInTrack: Vue.prototype.$checkingCurrentPositionInTrack, //track list & player


		};
	},
	methods: {
		isCurrentSong: function(index) {
			if (this.playerTracklistStore.currentSong == index) {
				return true;
			}
			return false;
		}, //track list

		playPauseAudio(index){
			this.playerTracklistStore.currentQueue = this.music
			this.emitter.emit('playPauseAudio', index)
		},

	},

	mounted(){
	},

};
</script>









<style>
.audioPlayerList .item .id-waves-or-btn .wave{
    width: 30px;
    height: 30px;
    /* border: 1px solid #fff; */
    justify-content: center;
    display: flex;
    align-items: flex-end;
}
.audioPlayerList .item .id-waves-or-btn .wave .wave1{
    width: 3px;
    height: 10px;
    margin-right: 3px;
    border-radius: 10px 10px 0px 0px;
    background: #36e2ec;
    animation: unset;
}
.audioPlayerList .item .id-waves-or-btn .wave .wave1:nth-child(2){
    height: 13px;
    /* animation-delay: .4s; */
}
.audioPlayerList .item .id-waves-or-btn .wave .wave1:nth-child(3){
    height: 8px;
    /* animation-delay: .8s; */
}
.audioPlayerList .item .id-waves-or-btn .active .wave1{
    animation: wave .5s linear infinite;
}
.audioPlayerList .item .id-waves-or-btn .active .wave1:nth-child(2){
    animation-delay: .4s;
}
.audioPlayerList .item .id-waves-or-btn .active .wave1:nth-child(3){
    animation-delay: .8s;
}
@keyframes wave{
    0%{height: 10px;}
    50%{height: 15px;}
    100%{height: 10px;}
}


	.audioPlayerList .item{
	color: darkgrey;
	display: grid;
    grid-template-columns: .1fr 1fr .5fr .1fr .1fr;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    justify-items: start;
	}



	.audioPlayerList .item td{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start!important;
}
	.audioPlayerList .item .song-info img{
		width: 35px;
		sheight: 35px;
	}
	.audioPlayerList .item .index,.audioPlayerList .item .album,.audioPlayerList .item .duration {
		font-size: 13px;
		color: #fff;
		margin: 0;
		padding: 0;
	}

 .audioPlayerList .item .song-info h5{
    width: 90px;
    height: 100%;
    font-size: 13px;
    color: #fff;
    margin: 0;
    padding: 0 0 0 15px;
}
.audioPlayerList .item .song-info h5 .subtitle{
    font-size: 11px;
}    

.audioPlayerList .item .is-liked{
	font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
}
.audioPlayerList .item .is-liked .fas{
    margin: 10px;
    cursor: pointer;
}


</style>


<style lang="stylus" scoped>
	.audioPlayerList 
			color rgba(0, 0, 0, 0.75)
			transition 0.5s
	.item 
				margin-bottom 1.5rem
				transition 0.2s
				&:hover
					background-color rgba(255, 255, 255, .15)
</style>