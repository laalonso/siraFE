  <template>
  <v-container>
    
    <v-card
     class="mx-auto"
        max-width="500"
        >
      <v-card-title class="indigo white--text text-h5 ">
       Mis participaciones
      </v-card-title>

      <v-card-text class="mt-2"> 

    <v-col
            v-for="(participacion, i) in participaciones"
            :key="i"
            cols="12"
          >
      <v-card
       
         elevation="8"
      
      >
      <v-card-title class="indigo darken-4 white--text ">
        <div class="subtitle-1">{{participacion.convocatoria.programaEducativo.abreviatura}}</div>
          <p class="text-h5 white--text fix">
            {{participacion.convocatoria.nombre}}
          </p>
         
      </v-card-title>
        <v-card-text class="mt-2">
              <v-row>
                  <v-col
                        cols="6"
                        sm="6"
                        md="6"

                      >
                       <p class="font-weight-bold mb-0">Estatus :</p>                
                       <v-chip
                         
                         :color="getColorStatus(participacion.estatus)"
                         text-color="white"
                         class="mt-1 fix"
                      >{{participacion.estatus}}</v-chip>               
                </v-col>
                 <v-col
                        cols="6"
                        sm="6"
                        md="6"
                            class="text-center"
                      >                
                       <p class="font-weight-bold mb-0">Fecha Límite:</p>
                       <v-chip  text-color="white"
                         
                         color="primary"
                          class="ma-1"
                      >{{ new Date(participacion.convocatoria.fechaTermino).toLocaleString("es-MX",{dateStyle:"medium"}) }}</v-chip>                
                </v-col>
              </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="indigo darken-2 white--text"
            @click="verParticipacion(participacion)"
          >
            Ver detalle
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-col>

  <v-card v-if="participaciones.length==0"
        class="mx-auto"
        max-width="500"
         elevation="8"
      shaped
      tile
      >
      <v-card-title class="indigo darken-4 white--text "> 
      </v-card-title>
        <v-card-text class="mt-2">
              <v-row>
                 <v-alert
                    class="ma-4"
                    border="top"
                    color="blue"
                    dense
                    type="info"
                  >Aún no te has registrado en ninguna convocatoria</v-alert>
              </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
          class="mx-auto"
            text
            color="indigo accent-4"
          >
            Consultar convocatorias
          </v-btn>
        </v-card-actions>
      </v-card>

</v-card-text>
</v-card>
</v-container>
</template>

<script type="text/javascript">

  import {axios} from "axios";

   export default {
    data: () => ({

          participaciones:[
            {
                convocatoria:{
                    programaEducativo:{
                      abreviatura: ''
                    }
                }
            
          }],
          total:'',
          entregados:''
    }),

    created () {
      this.initialize()
    },

    methods: {

     initialize () {

      let token = localStorage.getItem('token');
         
      let config = {
                   headers: { Authorization: `Bearer ${token}` }
                  };

      this.axios.get("/sira/participaciones/",           
                   config
                  )
                .then(response => {
                   console.log(response);
                   //console.log(response.headers.authorization);
                   //actualizamos la vista
                     this.participaciones=response.data;   
                  })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });  

       },

       verParticipacion(participacion){
        console.log(participacion)
          this.$router.push('/aspirantes/participacion/'+participacion.id)
       },

        getColorStatus (estatus) {
          if (estatus=='subir requisitos' || estatus == 'en espera de documentos') return 'red darken-1'
          else if(estatus=='en validación') return 'orange darken-2'
           else return 'green'
         },
    }

  }
</script>
<style type="text/css">
  .fix {
    overflow-wrap: anywhere;
    word-wrap: break-word;
    word-break: normal;
    hyphens: auto;
}
</style>