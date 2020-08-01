<template>
  <div>
    <v-app-bar
      fixed="top"
      id="navbar"
    >
      <router-link to="/apod" class="text-decoration-none grey--text text--darken-3  d-inline-flex align-center ml-3 ml-md-10" > <img class="mr-3" src="assets/img/c2.png" alt="">  <v-toolbar-title id="title"  class="white--text ">  {{ brand }}</v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="white--text mr-3 mr-md-10"
          >
            <v-icon >mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list id="navbar"  >
          <v-list-item link to="/apod" v-if="isLoggedIn">
            <v-list-item-title class="white--text">
              APOD
            </v-list-item-title>
          </v-list-item>

          <v-list-item link to="/rover" v-if="isLoggedIn">
            <v-list-item-title class="white--text">
              Mars Rover Photos
            </v-list-item-title>
          </v-list-item>
            <v-list-item  @click="signOut"  v-if="isLoggedIn" link>
              <v-list-item-title class="white--text">
                Cerrar sesion
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!isLoggedIn" link to="/">
              <v-list-item-title class="white--text">
                Iniciar sesión
              </v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import Firebase from 'firebase';
import { mapGetters, mapActions, mapState} from 'vuex'
export default {
  created(){
   this.getApod()
  },
    props: {
    brand: {
      type: String,
      default: '',
    },
  },
  methods:{
     ...mapActions(['getApod']),
   
    signOut() {
      Firebase.auth().signOut().then( () => {
        this.$router.push('/')
        this.$store.dispatch('updateUser', false)
      })
    }
  },
  computed:{
    ...mapGetters(['isLoggedIn']),
    ...mapState(['apod']),
   
  }
}
</script>
<style >
#navbar {
  background: #121212ec;
}
  
</style>
