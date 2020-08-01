<template>
  <div class="text-center " >
    <v-img :src="apod.url" min-height=100vh >
      <v-container>       
          <v-btn
           
            id="btn1"
            fab dark large
            @click="expand = !expand"
            class=" animate__animated animate__zoomInUp animate__repeat-1"
          
          >
          <img src="assets/img/cohete.png" alt="">
          </v-btn>
          
         
          </v-container>
         <v-expand-transition>
        <Form v-show="expand"/>
        </v-expand-transition>
   
        </v-img>
  </div>
</template>



<script>


import {mapActions, mapState} from 'vuex'
import Form from '../components/Form'
export default {
  data () {
      return {
         expand: false,
        dialog: false,
      }
    },
  components: {
    Form
  },
  computed:{
  ...mapState(['apod'])
  },
  methods: {
  ...mapActions(['getApod']),
 
  },
  created(){
    this.getApod()
  }

}
</script>

<style >
#btn1{
  margin: 0 auto;
  margin-top: 7rem;

}
#btn1:active #btn1::after {
background: #000;

}



.animate__animated.animate__zoomInUp {
  --animate-duration: 3s;
}

/* This changes all the animations globaly */
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.4s;
}






</style>


