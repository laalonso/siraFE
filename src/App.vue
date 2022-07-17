<template>
  <v-app>
    <v-main>
      <v-container fluid>
      <!--  <button @click="showAlert">Hello world</button> -->
       <router-view/>
       </v-container>
    </v-main>
  </v-app>
</template>

<script>



export default {
  name: 'App',

  
  data: () => ({
    
  }),
    methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal('Hello Vue world!!!');
    },
  },
};
</script>
