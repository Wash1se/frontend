import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import plugin from './utils/plugin.js';
import router from './router';
import { jsonp } from 'vue-jsonp'

import mitt from 'mitt';

import { OhVueIcon, addIcons } from "oh-vue-icons"

import {
    BiSkipStartFill,
    BiSkipEndFill,
    BiPlayCircleFill,
    HiSolidPause,
    RiOrderPlayFill,
    RiShuffleFill,
    RiRepeatOneFill
} from "oh-vue-icons/icons";
addIcons(
    BiSkipStartFill,
    BiSkipEndFill,
    BiPlayCircleFill,
    HiSolidPause,
    RiOrderPlayFill,
    RiShuffleFill,
    RiRepeatOneFill
);




const pinia = createPinia()
pinia.use(piniaPersist)

const emitter = mitt();


const app = createApp(App)

app.config.globalProperties.emitter = emitter;

app.use(pinia).use(plugin).use(router).component("v-icon", OhVueIcon).mount('#app')
app.config.globalProperties.jsonp = jsonp



