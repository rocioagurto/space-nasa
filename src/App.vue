<template>
  <v-app>
    
    <v-main>
      <div>
       <v-overlay :value="loading" color="primary" class="dark-blue--text" opacity="0.6">
     <v-progress-circular indeterminate size="94">Loading</v-progress-circular>
    </v-overlay>
          <router-view/>
      </div>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/Footer'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components: {
     Footer
  },
  data: () => ({
    //
  }),
  computed: mapState(['loading'])
};
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400&display=swap');
*{
 font-family: 'Titillium Web', sans-serif;
} 
</style>