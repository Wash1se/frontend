import axios from "axios";
import { useTokenStore } from "@/stores/store";
import VueCookies from "vue-cookies";

const api = axios.create();


api.interceptors.request.use( config => {
    const store = useTokenStore();
    if (store.getToken){
        config.headers = {
            'authorization': 'Access '+store.getToken
        };
    }
    return config

})

api.interceptors.response.use( config => {
    const store = useTokenStore();
    if (store.getToken){
        config.headers = {
            'authorization': 'Access '+store.getToken
        };
    }
    return config
},error => {
    const store = useTokenStore();
    if (error.response.data.error === 'Access token is expired'){
        store.access_expired = true
        if (store.access_expired === true && store.authenticated === true){
            const refresh = VueCookies.get("refresh")
            return api
            .post(store.mainAuthUrl+"refresh/", {'refresh':refresh})
            .then(response => {
                store.changeAccess(response.data.access)
                VueCookies.set("refresh" , response.data.refresh, "7d")
                error.config.headers.authorization = 'Access '+store.getToken
                return api.request(error.config)
                })
            .catch(error => {
                console.log(123123)
                store.logout()
                return Promise.reject(error);
            });
        }
    }
    if (error.response.data.error === 'Authentication credentials were not provided.'){
        if (store.getToken){
            error.config.headers.authorization = 'Access '+store.getToken
            return api.request(error.config)
        }else{
            return Promise.reject(error);
        }
    }
    else{
        return Promise.reject(error);
    }
})

export default api