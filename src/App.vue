<template>
  <v-app>
    
    <v-main>
      <div>
          <router-view/>
      </div>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
     Footer
  },
  data: () => ({
    //
  }),
};
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400&display=swap');
*{
 font-family: 'Titillium Web', sans-serif;

 
} 
</style>