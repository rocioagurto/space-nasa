<template>
  <div class="text-center " >
    
    <v-img :src="apod.url" min-height=100vh >
      
    <v-dialog
      v-model="dialog" persistent max-width="400px"
    >
    <template v-slot:activator="{ on, attrs }"  >
      <v-btn
        color="indigo darken-2"
        v-bind="attrs"
        v-on="on"
        class="btn1 pa-6"
        v-if="boton = true"
        @click="ingresar()"

       
      >
      Haz click aquí
        </v-btn>
      </template>
      
        <v-actions class="text-center" >
        
          <v-btn
            color="indigo darken-2"
            text
            @click="dialog = false"
             class="mt-4 ml-3"
          >
          <v-icon>
            mdi-close-circle
          </v-icon>
          
          </v-btn>
           
        </v-actions>
        <Form/>
   
    </v-dialog>
        </v-img>
  </div>
</template>



<script>
  export default {
    data: () => ({
      dialog: false,
      boton: true
     
    }),
  }
</script>
<script>

import {mapActions, mapState} from 'vuex'
import Form from '../components/Form'
export default {
  data () {
      return {
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
  ingresar(){
    this.boton = false
  }
  },
  created(){
    this.getApod()
  }

}
</script>

<style >
.btn1{
  margin-top: 20rem;
}
.v-dialog {
 background: #000;
 width: 100%;
 border-radius: 20px;
}




</style>


