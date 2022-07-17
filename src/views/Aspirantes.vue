<template >
<div id="inspire">
	<v-navigation-drawer v-model="drawer" app class="indigo lighten-4">
       <v-list-item color="indigo">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            SIRA
          </v-list-item-title>
          <v-list-item-subtitle>
            Aspirante
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-4">
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title> <span class="white--text">Sistema de Registro de Aspirantes </span></v-toolbar-title>
       <v-spacer></v-spacer>
      <div>
        <v-btn
                        icon
                        color="white"
                        @click="cerrarSesion()"
                      >
             <v-icon>mdi-account-arrow-right</v-icon> 
                         <span >Salir</span>    
            </v-btn>
         
       </div>
    </v-app-bar>

    <v-main class="indigo lighten-4">
      <!--  -->
     
          <router-view/>
    <!--    <v-row justify="center" align="center"></v-row> -->
      
    </v-main>
</div>
    

</template>

<script>
   //import CRUDProgEducativos from '@/components/CRUDProgEducativos'
     import {mapActions} from "vuex";
 export default {
 /* components: {
      CRUDProgEducativos
    },*/
    data () {
      return {
        items: [
          { title: 'Convocatorias Disponibles', icon: 'mdi-bullhorn-outline', link :'/aspirantes/convocatorias' },
          { title: 'Mis participaciones', icon: 'mdi-hand-right', link :'/aspirantes/misparticipaciones' }
         ],
        right: null,
        drawer:null
      }
    },
     methods:{
      ...mapActions(['cerrarSesion'])
    }
  }
</script>