<template>
 <v-card
          class="mx-auto"
         
        >
          <div class="d-flex flex-no-wrap justify-space-between indigo darken-4"  >
            <div>
              <v-card-title
                    class="text-h5 fix white--text "
                   
                    >{{tituloProg}}</v-card-title>  
                    <v-card-subtitle class="font-weight-regular white--text">{{tituloConv}}</v-card-subtitle>
            </div>
             <v-avatar
                  class="ma-3"
                  size="100"
                  tile
                >
                  <v-img contain :src=logo></v-img>
                </v-avatar>
          </div>
          <v-container>
            <div class="d-flex justify-space-around ">
              <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >                
                   <p class="font-weight-bold mb-0">Fecha Inicio:</p>
                    <p class="font-weight-regular">{{fechaInicio}}</p>
                    <p class="font-weight-bold mb-0">Fecha Examen:</p>
                    <p class="font-weight-regular">{{fechaExamen}}</p>
                
            </v-col>
             <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                
                   <p class="font-weight-bold mb-0">Fecha Término:</p>
                    <p class="font-weight-regular">{{fechaTermino}}</p>
                    <p class="font-weight-bold mb-0">Hora Exámen:</p>
                    <p class="font-weight-regular">5:00 pm</p>
             
            </v-col>
            
          </div>
          </v-container>
         
         <v-data-table

			    :headers="headers"
			    :items="participaciones"
			    class="elevation-1 "
          no-data-text="No se encontraron participantes en esta convocatoria"
         
			  >

         <template v-slot:item.aspirante.nombre="{ item }">
           <p>{{item.aspirante.nombre}} {{item.aspirante.apellido}}</p>
          </template>
       

			    <template v-slot:item.estatus="{ item }">
			      <v-chip
			        :color="getColorStatus(item.estatus)"
			        dark
			       >
			          {{item.estatus}}
			      </v-chip>
			    </template>

              <template v-slot:item.actions="{ item }">
                  <v-icon
                    color="green"
                    class="mr-2"
                    @click="verParticipacion(item)"
                  >
                    mdi-eye-check
                  </v-icon>
            </template>

			       

 		 </v-data-table>

          <v-divider></v-divider>           
               
         <v-card-actions class="text-center" >
              <v-spacer></v-spacer>
              <div >
            
               <v-btn color="indigo darken-2 white--text"  dark  class="mb-2 "
               
                @click="$router.go(-1)"
              >
                Regresar
              </v-btn>
            </div>
            </v-card-actions>
        </v-card>
</template>
<script type="text/javascript">
	
   import {axios} from "axios";

	export default {
		data : () => ({
			   tituloConv: 'Participantes de la Convocatoria Test 2021',
		      tituloProg: 'Programa de MCA',
		      fechaInicio: '20/02/2021',
		      fechaTermino:'24/03/2021',
		      fechaExamen:'28/03/2021',
		      logo:'http://www.lania.mx/wp-content/uploads/2020/05/thumbnail-1.png',
		      total: 5,
		      //entregados: 2,

	   headers: [
         {
            text: 'Aspirante ',
            align: 'start',
            sortable: false,
            value: 'aspirante.nombre',
           class: ' white--text  indigo darken-2'
          },
          { text: 'Escuela Procedencia', value: 'aspirante.escuela', class: 'indigo darken-2 white--text' },
          { text: 'Estatus', value: 'estatus', class: 'indigo darken-2 white--text' },
          { text: 'Ver documentos', value: 'actions', class: 'indigo darken-2 white--text' }
        ],

        aspirantes : [
        		{
              id: 1,
        			name: '',
        			escuela: 'Universidad de Xalapa',
        			entregados: 3
        			
        		},
        		{
              id: 2,
        			name: 'Raúl Díaz Sánchez',
              escuela: 'Universidad Veracruzana',
              entregados: 2
        		},{
              id: 3,
        			name: 'Mariana Rivas Portilla',
              escuela: 'Universidad Veracruzana',
              entregados: 5
        		}
        ],

        participaciones : [
             {
              id:1,
              aspirante: {
                id: 1,
                nombre: "Miguel Angel",
                apellido: "Landa Lopez",
                escuela: "Universidad Veracruzana",
                noWhatsapp:"2288470233"
              },
              estatus:"validación de documentos"
            },
            {
              id:2,
              aspirante: {
                id: 2,
                nombre: "Juan",
                apellido: "Pérez Reyes",
                escuela: "Universidad Veracruzana",
                noWhatsapp:"23322422"
              },
              estatus:"subir requisitos"
            },
            {
              id:3,
              aspirante: {
                id: 3,
                nombre: "Mariana",
                apellido: "Rivas Portilla",
                escuela: "Tecnológico de Xalapa",
                noWhatsapp:"23332321"
              },
              estatus:"subir requisitos"
            }
        ],

		}),

      created () {
      this.initialize()
    },


	 methods: {
	       getColorStatus (estatus) {
          if (estatus=='subir requisitos' || estatus == 'en espera de documentos') return 'red darken-1'
          else return 'indigo accent-2'
         },

       verParticipacion(item){
          console.log(item);
          this.$router.push('/seguimiento/convocatoria/participacion/'+item.id)
       },
    


     initialize () {

      let token = localStorage.getItem('token');
         
      let config = {
                   headers: { Authorization: `Bearer ${token}` }
                  };

      this.axios.get(`/sira/catalogos/convocatorias/${this.$route.params.id}/participaciones`,           
                   config
                  )
                .then(response => {
                   console.log(response);
                   //console.log(response.headers.authorization);
                   //actualizamos la vista
                     this.participaciones=response.data.convocatoria.participaciones;   
                  })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });  

       },
    },
	}
</script>