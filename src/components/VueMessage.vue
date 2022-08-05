<template>
  <div>
    <div class="ui message" :class="type" v-if="!hidden">
        <i class="close icon" @click="hide"></i>
        <div class="header">
            {{header}}
        </div>
        <slot></slot>
    </div>
  </div>

  
</template>

<script>
  export default{
    props:{
        type: {type: String, default: 'info'},
        header: {type: String, default: null},
        hide_message: {type: Boolean, default: true},
      },
      data(){
        return {
          hidden: true,
        }
      },
      watch: {
        $props: {
          handler() {
            this.hidden=this.hide_message;
          },
          deep: true,
          immediate: true,
        },
      }, 
      methods:{
        hide(){
          this.hidden = true
          this.$emit('returned_show_value', this.hidden)
        },
      }
  }
</script>
