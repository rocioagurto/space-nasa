<template>
  <div class="text-center">
    <v-img :src="apod.url" min-height=100vh >
      <v-row class="col ">
        <v-col cols="12">
         <p class="titulo  mt-16">404</p>
          <h2> Not found</h2>
      <p >The requested URL was not found on this server.</p>
      <v-btn color="indigo darken-4"><router-link class="text-decoration-none white--text" to="/apod">Home</router-link></v-btn> 
      </v-col>
    </v-row>
    </v-img>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
      return { 
        dialog: false,
      }
    },
 
  computed:{
  ...mapState(['apod'])
  }
  

}
</script>

<style  scoped>
.titulo {
  font-size: 4rem;
  
}
</style>