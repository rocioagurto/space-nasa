<template>
    <v-container class="text-center mb-16" >
       <v-overlay :value="loading" color="primary" class="dark-blue--text" opacity="0.6">
     <v-progress-circular indeterminate size="94">Loading</v-progress-circular>
    </v-overlay>
      <v-snackbar  class="text-center mt-6" color="primary"  v-model="alert.snackbar" top >
        {{ alert.message }}
         <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="alert.snackbar = false"
        >
        Cerrar
      </v-btn>
    </template>
   </v-snackbar>
   <v-row class=" row container mx-auto justify-center">
   <v-col cols="12"  md="6" lg="3">
       <v-card  class="rounded mx-auto card pa-10">
           <h1 class="text-center mb-5" style="font-size: 40px">APP-NASA</h1>

    <v-form
      v-model="valid"
      lazy-validation
      class=" form "
      
      >
      
      <v-text-field
        v-model="input.email"
        placeholder="chao@mail.com"
        label="Email"
        prepend-icon="mdi-account"
        required
        >
      </v-text-field>
     
      <v-text-field
        v-model="input.password"
        label="Contraseña"
        placeholder="*************"
        :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
        require
      >
      </v-text-field>
      
    <v-container class=" mt-6" >
      <v-btn
      rounded
      color="primary"
        :disabled="!valid"
        class=" boton  mb-3  "
        @click="login"
        >
        INGRESAR AQUÍ
      </v-btn>
     
      </v-container>
     </v-form>
     
     </v-card>
 
      
 
    </v-col>
    
   </v-row>
  </v-container>
   

</template>

<script>
import Firebase from 'firebase'
import {mapState} from 'vuex'


export default {
  data: () => ({
  
    valid: true,
    input: {
      email: '',
      password: '',
    },
    alert: {
      message: '',
      snackbar: false,   
    },
    showPassword: false,
    
  }),
  methods: {
    
    reset(e) {
    e.preventDefault()
    this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    login(e) {
      e.preventDefault()
      
      if (this.input.email != '' && this.input.password != '') {
        Firebase.auth().signInWithEmailAndPassword(
          this.input.email,
          this.input.password
        )
        .then(() => {
          let user = this.input.email
          this.$store.dispatch('updateUser', user)
          this.alert.snackbar = true
          this.alert.message = `Bienvenid@, ${user}`
          setTimeout(() => {
            this.$router.push('/apod')
          }, 2000)
          
        })
        .catch(() => {
          this.alert.snackbar = true
          this.alert.message = 'Usuario no autenticado, intente nuevamente...'
          setTimeout(() => {
            this.alert.message = ''
            this.input.email= ''
             this.input.password= ''
          }, 2000)
        }) 
      } else {
        this.alert.snackbar = true
        this.alert.message = 'Debe completar todos los campos...'
        setTimeout(() => {
             this.alert.snackbar = false
          }, 2000)
        

      }
    }
  },
  computed: {
     ...mapState(['loading']),
    
   
  }
}
</script>

<style scoped>
.form {
  margin: 0 auto;
  border: none;
}
.card{
  background: rgba(0, 0, 0, 0.739);
  border-radius: 40rem;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow:none;
  
}
.container{
  padding: 0px, 5px, 5px, 10px;
}



</style>