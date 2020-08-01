<template>
  <div>
    <nav-bar :brand="'SPACE-NASA'"/>
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" md="8" >
            <h1 class=" font-weight-thin mt-16 text-center  animate__animated animate__slideInLeft animate__repeat-1">Fotografías de Marte</h1>
            <h3 class=" font-weight-thin text-center  animate__animated animate__slideInRight animate__repeat-1">Filtre su búsqueda</h3>
            <v-form class="my-10 pa-3 text-center ">
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
                color="primary" 
                @click="getRoverInfo"
                class=" mt-10 "
              >
                Buscar
              </v-btn>
            </v-form >

            <v-divider></v-divider>

            <div v-if="cameras" class="text-center mt-4" >
             <div v-for="(count, camera) in camerasCount" :key="camera">
              {{camera}} : {{count}}
            </div> 
          </div>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" md="4"  
          v-for = 'photo in roverData.photos' 
          :key='photo.id'
          >
          
            <v-card
            class="mx-auto pa-3 mb-3"
            max-width="450"
            color="grey darken-4"
            >
            
              <v-img
                class="white--text align-end "
                height="300px"
                :src="photo.img_src"
                
              >
                <v-card-title 
                class="titulo"
                >
                  Camera: 
                  {{photo.camera.name}}
                </v-card-title>
              </v-img>
              <v-card-subtitle 
              class="pb-0 mb-2">
               <h3> {{photo.earth_date}}</h3>
              </v-card-subtitle>
              <v-card-text>
                <p font-weight-thin>Fecha de aterrizaje: {{photo.rover.landing_date}}</p>
                <p font-weight-thin>Fecha de lanzamiento: {{photo.rover.launch_date}}</p>
              </v-card-text>
               
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
import NavBar from '../components/NavBar'
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  data() {
    return {
      sol: 1000,
      rover:'Curiosity',
      rovers: ['Curiosity', 'Spirit', 'Opportunity'],
    
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
    ...mapState(['roverData', 'loading']),
    ...mapGetters(['cameras']),
    camerasCount(){
      let summary = {} 
      this.cameras.map((camera)=>{
        summary[camera] = (summary[camera] || 0) +1
      });
      return summary
    } 
  }
}
</script>

<style >

.titulo{
  background: hsla(0, 0%, 0%, 0.787);
}


</style>