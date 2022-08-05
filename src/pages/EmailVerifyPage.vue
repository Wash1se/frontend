<template>
    <Message :type="type" :header="header" :hide_message="hide_message" @returned_show_value="hide_message = $event"/>
    <div class="mb-3" v-if="show_email_field">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" v-bind:class="{ highlighted: field==='email'}">
             <button v-on:click="SendMail()">Send email</button>
    </div>
</template>

<script>
import API from '@/utils/api.js';
import Message from "./../components/VueMessage.vue"



export default {
  components:{
      Message
    },
  data(){
    return{
      email: null,
      token: null,
      type: null,
      header: null,
      hide_message: true,
      show_email_field: false,
    };
  },
  methods:{
    GetToken(){
        this.token =this.$route.query.token
    },

    async SendToken() {
        this.GetToken()
        API
        .post("https://music-platform228.herokuapp.com/auth/email-verify/", {token: this.token})
        .then(response => {
            console.log()
            for (const [key, value] of Object.entries(response.data)) {
                this.type=key
                this.header=value
            }
            this.hide_message = false
        })
        .catch(error => {
            let resp = error.response.data
            this.show_email_field=resp.show_email_field
            this.type="error"
            this.header=resp.error

            this.hide_message = false
        });
    },
    async SendMail(){
        if (this.email){
            API
            .post("https://music-platform228.herokuapp.com/auth/resend-verification-link/", {email: this.email})
        .then(response => {
            console.log()
            for (const [key, value] of Object.entries(response.data)) {
                this.type=key
                this.header=value
                console.log(`${key} ${value}`);
            }
            this.hide_message = false
            this.show_email_field = false
        })
        .catch(error => {
            let resp = error.response.data
            this.show_email_field=resp.show_email_field
            this.type="error"
            this.header=resp.error

            this.hide_message = false
        });
        }
    }

  },
  beforeMount(){
        this.SendToken()
    },
  
}
</script>

<style>
</style>

