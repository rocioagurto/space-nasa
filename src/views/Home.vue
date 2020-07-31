<template>
  <div class="text-center " >
    <v-img :src="apod.url" min-height=100vh >
      
       
          <v-btn
     
            id="btn1"
            @click="expand = !expand"
             class=" ml-3 pa-6"
             rounded
            
             
          >
         <h3>Haz click aquí </h3> 
          </v-btn>
  
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
  margin-top: 10rem;
  background: rgb(0, 36, 156);
}
#btn1:hover{
  height: 4%;
  transition: .8s;
  transition-duration: .5s;
  background: rgb(0, 0, 0);
}







</style>


