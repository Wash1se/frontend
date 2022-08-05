<template>
		<div class="audioPlayerList">
			<div style="padding:0px 20px;margin:10px 0 10px 0;">
				<table class="item" v-for="(item,index) in musicPlaylist" :class="{ 'isActive':isCurrentSong(index) }"
				:key="item.id"
				@mouseover="highlighted = item.id"
				@mouseleave="highlighted = null"
				@click="clickTrackTemplate(index)">
					<td class="id-waves-or-btn" style="justify-content: center!important;">
						<transition v-if="highlighted === item.id"
						name="fade" mode="out-in" style="display: flex;justify-content: center;width: 100%;" appear>

							<a class="button play" @click="playPauseAudio(index)" title="Play/Pause Song" :key="currentSong + currentlyPlaying">
								<v-icon :name="currentlyPlaying && currentSong === index ? 'hi-solid-pause' : 'bi-play-circle-fill' " 
								:key="1" class="icon" scale="2" fill="red"/>
							</a>
						</transition>

						<div v-if="highlighted != item.id && waves_active!=index" 
						style="display: flex;justify-content: center;width: 100%;" class="index">{{index+1}}</div>
					
						<div v-if="waves_active===index && highlighted != item.id" class="wave active">
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


		<div class="audioPlayerUI">

			<div class="albumDetails">
				<transition name="slide-fade" mode="out-in" appear>
					<img class="image" :key="currentSong" :src="store.mediaUrl+musicPlaylist[currentSong].icon_path" alt="">
				</transition>
				<div style="width: 70%; display: flex;	flex-wrap: wrap;flex-direction: column;justify-content: center;">
					<transition name="slide-fade" mode="out-in" appear>
						<p class="title" :key="currentSong">{{ musicPlaylist[currentSong].song_name }}</p>
					</transition>
					<transition name="slide-fade" mode="out-in" appear>
						<p class="artist" :key="currentSong">{{ musicPlaylist[currentSong].song_author }}</p>
					</transition>
				</div>
			</div>


			<div class="timeAndProgress">


				<div class="playerButtons">
					<!-- shuffle play btn -->
					<a class="button" id="mode" @click="switchMode(Mode[1].title)" :title="Mode[1].title" ><v-icon :name="Mode[1].icon" class="icon" :class="{selected:modeIndex===1}" scale="1.2" /></a>

					<!-- prev song btn-->
					<a class="button" @click="prevSong()" title="Previous Song"><v-icon name="bi-skip-start-fill" class="icon" scale="2" /></a>

					<!-- play/ pause btn -->
					<transition name="fade" mode="out-in" appear>
						<a class="button play" @click="playPauseAudio(currentSong)" title="Play/Pause Song" :key="currentSong + currentlyPlaying">
							<v-icon :name="currentlyPlaying ? 'hi-solid-pause' : 'bi-play-circle-fill' " 
							:key="1" class="icon" scale="2" fill="red"/>
						</a>
					</transition>

					<!-- next song btn -->
					<a class="button" @click="nextSong()" title="Next Song">
						<v-icon name="bi-skip-end-fill" class="icon" scale="2" />
					</a>

					<!-- repeat song btn -->
					<a class="button" id="mode" @click="switchMode(Mode[2].title)" :title="Mode[2].title" ><v-icon :name="Mode[2].icon" class="icon" :class="{selected:modeIndex===2}" scale="1.2" /></a>
				</div>


				<div style="display: flex; justify-content: space-around; align-items: center; margin: 0 0 1rem 0;">
					<span class="currentTime">{{ currentTimeShow }}</span>

					<div @click="clickProgress" @mouseover="showProgressDot=true" @mouseleave="showProgressDot=false" style="width: 100%; height: 15px; margin: 0 1rem 0 1rem; cursor: pointer; display: flex;align-items: center;" >
						<div class="currentProgressBar" ref="progress" >
							<div class="currentProgress" :class="{'bar-active':showProgressDot}" :style="{width: currentProgressBar + '%'}">
								<div v-if="showProgressDot" class="dot"></div>
							</div>
						</div>
					</div>

					<span class="totalTime"> {{ trackDurationShow }}</span>
				</div>

			</div>

			<div class="volumePart" style="display: flex; justify-content: center; align-items:center; padding: 0 1rem 0 1rem;;">
				<i class="bi bi-volume-down-fill" style="color:black; font-size: 2.5rem;"></i>

				<div @click="clickVolume" 
				@mouseover="showVolumeDot=true" @mouseleave="showVolumeDot=false"
				style="width: 8rem; height: 15px; margin: 0 1rem 0 1rem; cursor: pointer; display: flex;align-items: center;">
					<div class="currentVolumeBar" ref="volumeProgress">
						<div class="currentVolumeProgress" :class="{'bar-active':showVolumeDot}" :style="{ width: currentVolumeBar + '%' }">
							<div v-if="showVolumeDot" class="dot"></div>
						</div>
					</div>
				</div>
			</div>


		</div>


</template>



<style>
	.dot{
		width: 1rem;
		height: 1rem;
		background-color: white;
		border-radius: 50px;
		float: right;
		position: relative;
		bottom: 0.4rem;
		left: 0.5rem;
	}

	.selected{
		color: green;	
	}

	.bar-active{
		background-color: green!important;
	}

	.bi{
    color: #fff;
}

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



<script>
import { useTokenStore } from "@/stores/store.js";
import {usePlayerTracklistStore} from "@/stores/usePlayerTracklistStore.js";


export default {

	name: "MusicPlayer",

    setup(){
      const store = useTokenStore();
      const playerTracklistStore = usePlayerTracklistStore();

      return{
        store,
        playerTracklistStore,


      }
    },

	data() {
		return {
				waves_active: null, //track list & player
				highlighted:null, //track list
				musicPlaylist:this.playerTracklistStore.musicPlaylist, //track list & player
				showProgressDot:false, //player
				showVolumeDot:false, //player
				audio: "", //track list & player
				posterLoad: false, //track list & player
				currentlyPlaying: false, //track list & player
				modeIndex: 0, //player
				currentSong: 0, //track list & player
				currentTime: 0, //player
				trackDuration: 0, //track list & player
				currentProgressBar: 0, //player
				currentVolumeBar: 100, //player
				checkingCurrentPositionInTrack: "", //track list & player 
				currentMode:null, //player
				Mode: [
					{
						title: "Order Play",
						icon: "ri-order-play-fill"
					},
					{
						title: "Shuffle Play",
						icon: "ri-shuffle-fill"
					},
					{
						title: "Single Cycle",
						icon: "ri-repeat-one-fill"
					},
				], //player
		};
	},
	methods: {
		clickTrackTemplate(index){
			if (!this.currentlyPlaying && index != this.currentSong){
					this.changeSong(index)
					this.waves_active = index
					this.playAudio()
				}
			else if(this.currentlyPlaying && index != this.currentSong){
					this.changeSong(index)
					this.waves_active = index
				}
		},

		timeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}, //player

		switchMode: function(n) {
            this.currentMode=n
            
            if ((this.currentMode === "Shuffle Play" && this.modeIndex === 1) || (this.currentMode === "Single Cycle" && this.modeIndex === 2) ){
				this.currentMode=null
			}
            if (this.currentMode === "Shuffle Play"){
				this.modeIndex = 1
            }
            if (this.currentMode === "Single Cycle"){
				this.modeIndex = 2
            }

			if (this.currentMode===null){
				this.modeIndex = 0
            }

		}, //player
		nextIndex: function() {
			switch (this.modeIndex) {
				case 0:
					console.log('next song')
					this.currentSong = (this.currentSong + 1) % this.musicPlaylist.length;
					break;
				case 1:
					console.log('randon song')
					this.currentSong = Math.floor(Math.random() * this.musicPlaylist.length);
					break;
				case 2: console.log('repeat current song')
			}
			return this.currentSong;
		}, //player & track list
		prevIndex: function() {
			switch (this.modeIndex) {
				case 0:
					console.log('prev song')
					this.currentSong = (this.currentSong - 1 + this.musicPlaylist.length) % this.musicPlaylist.length;
					break;
				case 1:
					console.log('random song')
					this.currentSong = Math.floor(Math.random() * this.musicPlaylist.length);
					break;
				case 2: console.log('repeat current song')
			}
			return this.currentSong;
		}, // player
		nextSong: function() {
			this.changeSong(this.nextIndex());
		}, //player

		prevSong: function() {
			this.changeSong(this.prevIndex());
		}, //player

		changeSong: function(index, pausePrev = true) {
			var wasPlaying = this.currentlyPlaying;
			if (pausePrev == true) {
				this.stopAudio();
			}
			this.currentSong = index;


			var audioFile = this.store.mediaUrl + 
								this.musicPlaylist[this.currentSong].song_path;
			this.audio = new Audio(audioFile);

			this.posterLoad = false;
			if(this.musicPlaylist[this.currentSong].icon_path !== undefined) this.posterLoad = true;

			
			var that = this;
			this.audio.addEventListener("loadedmetadata", function() {
				that.trackDuration = Math.round(this.duration);
			});
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playPauseAudio(this.musicPlaylist.indexOf(this.currentSong))
			}

			this.audio.volume = this.currentVolumeBar / 100
		}, //player & track list
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		}, //track list

		playPauseAudio: function(index) {
			if (!this.currentlyPlaying) {
				this.waves_active = index
				this.playAudio()
			}
			else{
				this.waves_active = null
				this.stopAudio()
			}
			

		}, //player & track list
		playAudio: function() {
			this.getCurrentTimeEverySecond();
			this.currentlyPlaying = true;
			this.audio.play();
		}, //player & track list
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			clearTimeout(this.checkingCurrentPositionInTrack);
		}, //player & track list
		handleEnded: function() {
			this.changeSong(this.nextIndex());
		}, //player & track list
		getCurrentTimeEverySecond: function() {
			var that = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
					that.currentTime = that.audio.currentTime;
					that.currentProgressBar =
						that.audio.currentTime / that.trackDuration * 100;
					that.getCurrentTimeEverySecond();
				}.bind(this),
				500
			);
		},//player & track list
		clickProgress: function(event){
			this.updateBar(event.pageX);
		}, //player
		clickVolume: function(event){
			this.updateVolume(event.pageX);
		}, //player
		updateVolume: function(x){
			var volumeProgress = this.$refs.volumeProgress;
			var position = x - volumeProgress.getBoundingClientRect().left;
			var percentage = (100 * position) / volumeProgress.offsetWidth;
			if (percentage > 100) {
				percentage = 100;
			}
			if (percentage < 0) {
				percentage = 0;
			}

			this.audio.volume = percentage / 100
			this.currentVolumeBar = percentage
		}, //player

		updateBar: function(x){
			var progress = this.$refs.progress;
			var maxduration = this.audio.duration;
			var position = x - progress.getBoundingClientRect().left;
			var percentage = (100 * position) / progress.offsetWidth;
			if (percentage > 100) {
				percentage = 100;
			}
			if (percentage < 0) {
				percentage = 0;
			}
			// this.audio.currentTime
		
			this.audio.currentTime = (maxduration * percentage) / 100;
			console.log(this.audio.currentTime)
			console.log((maxduration * percentage) / 100)
			this.currentTime = percentage / 100
			this.currentProgressBar = percentage
		},//player

	},
	mounted() {
		this.changeSong(this.currentSong, false);
		this.audio.loop = false;
	},
	watch: {
		currentTime: function() {
			this.currentTime = Math.round(this.currentTime);
		}
	},
	computed: {
		currentTimeShow() {
			return this.timeFormat(this.currentTime);
		},
		trackDurationShow() {
			return this.timeFormat(this.trackDuration);
		},
	},
	beforeUnmount: function() {
		this.audio.pause()
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.handleEnded);

		clearTimeout(this.checkingCurrentPositionInTrack);
	}
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&family=Montserrat&family=Raleway&display=swap');
@font-face
	font-family Bender
	src url(../assets/fonts/Bender.woff)
@font-face
	font-family Geometos
	src url(../assets/fonts/Geometos.woff)
* 
	box-sizing border-box
			
.audioPlayerList 
			color rgba(0, 0, 0, 0.75)
			transition 0.5s
	.item 
				margin-bottom 1.5rem
				transition 0.2s
				&:hover
					background-color rgba(255, 255, 255, .15)

.audioPlayerUI
			.currentVolumeBar 
				width 100%
				height 3px
				background-color rgba(110,110,110,0.2)
				margin 0.75rem 0
				border-radius 50px
				.currentVolumeProgress 
					background-color rgba(255, 255, 255, 0.75)
					width 0px
					height 3px
					transition 100ms
					border-radius 50px
			position fixed
			bottom 0
			left 0
			right 0
			background-color #111727
			display grid
			grid-template-columns .2fr 1fr .2fr
			will-change transform
			align-items center
			transition 0.5s

			.timeAndProgress
				display flex
				flex-direction column
				justify-content center
			.albumDetails 
				text-align center
				padding-left: 1rem;

				display flex
				align-items center
				justify-content center
				.image
						height 3rem
						width 3rem
				p
					margin 0px
					display: flex;
					align-items center
					&.title
						font-family Geometos 
						font-size 1.2rem
						color rgba(0, 0, 0, 1)
						margin 0.2rem 0
					&.artist 
						margin 0.2rem 0
						font-family 'Montserrat'
						font-size 0.8rem
						font-weight none
						color rgba(0, 0, 0, 0.75)
						transition-delay 100ms

							.isActive
								color #FF0000
		.playerButtons
				position relative
				margin 0 auto
				text-align center
				.button
					display inline-block
					position relative
					vertical-align middle
					padding 0.5rem
					margin 0 0.25rem
					color rgba(0, 0, 0, 0.75)
					border-radius 50%
					outline 0
					text-decoration none
					cursor pointer
					transition 0.5s
					&#mode
						transition 0.3s ease-in-out

					&.play
						margin 0 auto
					&:active 
						opacity 0.75
						transform scale(0.75)
					.icon
						display flex

			.currentProgressBar 
				width 100%
				background-color rgba(110, 110, 110, .2)
				margin 0.75rem 0
				height 3px
				border-radius 50px
				.currentProgress 
					background-color rgba(255, 255, 255, 0.75)
					width 0px
					height 3px
					transition 100ms
					border-radius 50px
 .audioPlayerUI .totalTime 
	font-size 0.8rem
	font-family Bender !important
	color rgba(0, 0, 0, 0.75)


::-webkit-scrollbar
	width 0 !important
	height 0
	display none

</style>