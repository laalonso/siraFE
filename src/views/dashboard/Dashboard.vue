<template>
  <div>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container>

      <v-layout row wrap >

        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile width="80" height="80" class="mt-n12">
                <v-sheet color="green"  width="80" height="80" elevation="15">
                  <v-icon dark large>mdi-account-group</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Aspirantes registrados</div>
                <v-list-item-title class="headline mb-1 text-right">{{numAspirantes}}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-arrow-bottom-right</v-icon>
              <div class="overline">Ver</div>
            </v-card-actions>
          </v-card>
        </v-flex>

            <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile width="80" height="80" class="mt-n12">
                <v-sheet color="green"  width="80" height="80" elevation="15">
                  <v-icon dark large>mdi-bullhorn-outline</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Convocatorias Activas</div>
                <v-list-item-title class="headline mb-1 text-right">{{numConvocatorias}}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-arrow-bottom-right</v-icon>
              <div class="overline">Ver</div>
            </v-card-actions>
          </v-card>
        </v-flex>

            <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile width="80" height="80" class="mt-n12">
                <v-sheet color="green"  width="80" height="80" elevation="15">
                  <v-icon dark large>mdi-newspaper-variant-outline</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Programas Educativos</div>
                <v-list-item-title class="headline mb-1 text-right">{{numPE}}</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2" >mdi-arrow-bottom-right</v-icon>
              <div class="overline">Ver</div>
            </v-card-actions>
          </v-card>
        </v-flex>

       <v-divider></v-divider>

       
              <v-spacer></v-spacer>

                <v-row>   

                     
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      >
                      <template>

                        <v-data-table
                          :headers="headersConvocatorias"
                          :items="convocatoriasActivas"
                          :items-per-page="5"
                          class="elevation-1"

                        >

                          <template v-slot:top>
                            <v-toolbar flat color="indigo darken-2 white--text fix"  >
                              <v-toolbar-title class="fix">Convocatorias Activas</v-toolbar-title>
                              <v-divider
                                class="mx-4"
                                inset
                                vertical

                              ></v-divider>

                                </v-toolbar>
                           </template>

                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              color="teal"
                              class="mr-2"
                              @click="verParticipantes(item)"
                            >
                               mdi-account-group
                            </v-icon>     
                            </template>
                        </v-data-table>
                      </template>
                </v-col>

                 <v-spacer></v-spacer>
               </v-row>
            
      </v-layout>
    </v-container>    
  </div>
</template>

<script >

   export default {

    created () {
      this.initialize()
    },

    data: () => ({
      numConvocatorias: 0,
      numPE: 0,
      numAspirantes: 0,
     headersConvocatorias: [
        {text: 'No.', value:'id', class:'indigo lighten-1 white--text  text-center'},
        { text: 'Convocatoria ', align: 'start', sortable: false, value: 'nombre', class: 'indigo lighten-1 white--text  text-center'},
        { text: 'Fecha de Inicio', value: 'fechaInicio', class: 'indigo lighten-1 white--text ' },
        { text: 'Fecha de Término', value: 'fechaTermino', class: 'indigo lighten-1 white--text ' },
        { text: 'Cupo', value: 'cantAspirantes', class: 'indigo lighten-1 white--text ' },
         { text: 'Ver Aspirantes', value: 'actions', class: 'indigo lighten-1 white--text ' }
      ],

      convocatoriasActivas : []
    }),

     methods: {
      initialize () {

         let token = localStorage.getItem('token');
             
         let config = {
                        headers: { Authorization: `Bearer ${token}` }
                      };

          this.axios.get("/sira/catalogos/convocatorias",           
                       config
                      )
                    .then(response => {
                       console.log(response);
                       //console.log(response.headers.authorization);
                       //actualizamos la vista
                         this.convocatoriasActivas=response.data.convocatorias;
                         if(response.data.numConv!='')
                         this.numConvocatorias = response.data.numConv;   
                      })
                    .catch(error => {
                      this.errorMessage = error.message;
                      console.error("There was an error!", error);
                    });  

          this.axios.get("/sira/catalogos/peducativos",           
                   config
                  )
                .then(response => {
                   console.log(response);
                   console.log(response.headers.authorization);
                   //actualizamos la vista
                   if(response.data.numPE!='')
                     this.numPE=response.data.numPE;   
                  })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });     

          this.axios.get("/sira/participaciones/aspirantes",           
                   config
                  )
                .then(response => {
                  
                   //actualizamos la vista
                   if(response.data.numAspirantes!='')
                     this.numAspirantes=response.data.numAspirantes;

                  })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });    
        },

        verParticipantes(item){
          console.log(item.id)
          this.$router.push('/seguimiento/convocatoria/'+item.id)
        }
    }

  }
</script>