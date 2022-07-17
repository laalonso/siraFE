

<template>
  <v-card class="mx-auto mt-10" width="400px" elevation="19" >
  	<div class="indigo accent-4 text-center">
  <v-card-title >
    <span class="white--text">Registro confirmado</span>
  </v-card-title></div>
    <v-card-text>
     <v-alert
  		outlined
      type="success"
      text
	> Su cuenta ha sido confirmada, ahora puede inicar sesión</v-alert> 
	<v-btn to="/"
      class="ma-2"
      
      color="success"
    > Ir a Login
    </v-btn><!--  <v-btn class="mt- mx-auto" color="primary" >iniciar sesión</v-btn> -->
    </v-card-text>
  </v-card>
</template>


