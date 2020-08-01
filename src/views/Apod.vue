<template>
   <div>
    <nav-bar :brand="'SPACE-NASA'"/>
    <v-main  >
      <v-container class="text-center mt-16" >
         <h1 class=" font-weight-thin mt-8 text-center animate__animated animate__lightSpeedInLeft animate__repeat-1" style="font-size: 36px">Fotografías por día</h1>
            <h4 class=" font-weight-thin mb-8 text-center  animate__animated animate__lightSpeedInRight animate__repeat-1">Seleccione un día en el calendario</h4>
        <v-row >
          <v-col cols="12" md="6" class="d-flex  justify-center d-md-block " >
            
            <v-date-picker 
              v-model="date"
              v-bind:max="today" 
              color="primary"
              :landscape="$vuetify.breakpoint.smAndUp"
              header-color="primary" @click:date="getInfo"
              
            >
            </v-date-picker>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="mx-auto pa-3" max-width="600" color="grey darken-4">
              <v-img v-if="apod.media_type=='image'" :src="apod.url" class="white--text align-end" height="375px">
                <v-card-title >{{apod.title}}</v-card-title>
              </v-img>
              <iframe v-else :src="apod.url" width="100%" height="375px" frameborder="0"/>
              <v-card-subtitle >{{apod.date}}</v-card-subtitle>
              <v-card-text class="text--green">
                <div class="text-justify">{{apod.explanation}}</div>
              </v-card-text>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import {mapActions, mapState} from 'vuex'

export default {
  data () {
      return {
        today: new Date().toISOString().substr(0, 10),
        date: new Date().toISOString().substr(0, 10),
      }
    },
  components: {
    NavBar
  },
  methods: {
    ...mapActions(['getApod']),
    getInfo(){
      this.getApod(this.date)
    }
  },
  computed: {
    ...mapState(['apod'])
  }
  
}
</script>

<style >


</style>