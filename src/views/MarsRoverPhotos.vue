<template>
   <div>
    <nav-bar :brand="'SPACE-NASA'"/>
     <v-container>
 
       

 <v-row class="justify-center">
          <v-col cols="12" md="8">
        <v-form class="my-10 ">
          
          <v-text-field
            v-model="sol"
            hide-details
            single-line
            type="number"
            label="Sol days"
          />
        <v-select
          v-model="rover"
          :items="rovers"
          label="Rover"
          required
        />
        <v-btn
          :disabled="!valid"
          color="indigo darken-4" 
          class="mr-4 mt-5"
          @click="getRoverInfo"
        >
        Buscar
        </v-btn>
       
      </v-form>
       </v-col>
        </v-row>
          <v-divider></v-divider>
        <v-row >

       
        <v-col cols="12" md="4"  v-for = 'photo in roverData.photos' 
      :key='photo.id'>


      <v-card
     
      class="mx-auto pa-5 mb-5 mt-5"
      max-width="450"
      color="grey darken-4"


  >
    <v-img
      class="white--text align-end "
      height="300px"
      :src="photo.img_src"
    >
      <v-card-title class="titulo">Camera: {{photo.camera.name}}</v-card-title>
    </v-img>
     <v-card-subtitle class="pb-0 mb-2">{{photo.earth_date}}</v-card-subtitle>
    <v-card-text>
      <p>Fecha de aterrizaje: {{photo.rover.landing_date}}</p>
      <p>Fecha de lanzamiento: {{photo.rover.launch_date}}</p>
    </v-card-text>
  </v-card>
        </v-col>
      </v-row>
  
  </v-container>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import {mapActions, mapState} from 'vuex'

export default {
  data() {
    return {
      sol: 1000,
      rover:'Curiosity',
      rovers: ['Curiosity', 'Spirit', 'Opportunity'],
      valid: true
    }
  },
  components: {
    NavBar
  },
  methods: {
    ...mapActions(['getRoverData']),
    getRoverInfo(){
      const payload = {sol: this.sol, rover: this.rover};
      this.getRoverData(payload);
    }
  },
  computed: {
    ...mapState(['roverData'])
   
  }
  
}
</script>

<style >
.titulo{
  background: hsla(0, 0%, 0%, 0.726);
}


</style>