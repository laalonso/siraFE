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
                      <v-card-subtitle class="font-weight-regular white--text"> <v-chip
                            :color="getColorStatus(total,entregados,validados)"
                            dark
                           >
                              Entregados: {{entregados}} - 
                              Validados : {{validados}} de {{entregados}}
                          </v-chip>
                        </v-card-subtitle>
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
                   <p class="font-weight-bold mb-0">Nombre del Aspirante:</p>
                    <p class="font-weight-regular">{{nombreAspirante}}</p>
                    <p class="font-weight-bold mb-0">Número de whatsapp:</p>
                    <p class="font-weight-regular">{{noWhatsapp}}</p>
                
            </v-col>
             <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                
                   <p class="font-weight-bold mb-0">Escuela de procedencia:</p>
                    <p class="font-weight-regular">{{escuela}}</p>
                    <p class="font-weight-bold mb-0">Hora Exámen:</p>
                    <p class="font-weight-regular">5:00 pm</p>
             
            </v-col>
            
          </div>
          </v-container>
         
         <v-data-table

			    :headers="headers"
			    :items="requisitosPart"
			    class="elevation-1 "
			  >
			    <template v-slot:item.entregado="{ item }">
			      <v-chip
			        :color="getColor(item.entregado)"
			        dark
			       >
			           <span v-if="item.entregado">Entregado</span>
                 <span v-else>Falta</span>
			      </v-chip>
			    </template>

			     <template v-slot:item.rutaArchivo="{ item }">
                <v-icon v-if="item.entregado"
                    color="teal"
                    class="mr-2"
                    @click="verDocumento(item.rutaArchivo)"
                  >
                    mdi-eye
                  </v-icon>
                  <span v-else>No entregado</span>
            </template>
             <template v-slot:item.actions="{ item }">
                 
                  <v-btn
                        icon
                        :color="getColor(item)"
                        :disabled="!item.entregado"
                        @click="validarDocumento(item)"
                      >
              <v-icon>mdi-thumb-up</v-icon>
              <span v-if="item.validado">Ok</span>
                 <span v-else>Validar</span>
            </v-btn>
            </template>

             <template v-slot:item.requisitoConvocatoria.indispensable="{ item }">
            <v-chip
              :color="getColorIndisp(item.requisitoConvocatoria.indispensable)"
              dark
             >
                 <span v-if="item.requisitoConvocatoria.indispensable">SI</span>
                 <span v-else>NO</span>
            </v-chip>
          </template> 

 		 </v-data-table>

          <v-divider></v-divider>           
               
         <v-card-actions class="text-center" >
              <v-spacer></v-spacer>
              <div >
             
               <v-btn color="indigo darken-2"  dark  class="mb-2 "
               
               @click="$router.go(-1)"
              >
                Regresar
              </v-btn>
            </div>
            </v-card-actions>

             <v-dialog v-model="dialogCompletada" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">{{mensajeCompletada}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog()">OK</v-btn>
          
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        </v-card>

        
</template>
<script type="text/javascript">
	
	export default {
		data : () => ({
			   tituloConv: 'Convocatoria de MRySI 2014',
		      tituloProg: 'Estatus de la participación del Aspirante',
		      nombreAspirante: 'Miguel Ángel Landa López',
		      escuela:'Universidad Veracruzana',
		      noWhatsapp:'2288470202',
		      logo:'http://www.lania.mx/wp-content/uploads/2020/05/thumbnail-1.png',
		      total: 5,
		      entregados: 2,
          idParticipacion: '',
          requisitoConvocatoria: {indispensable: true},
          validados: 0,
          dialogCompletada: false,
          mensajeCompletada: '',

	 /*  headers: [
          {
            text: 'Requisito ',
            align: 'start',
            sortable: false,
            value: 'name',
           class: ' white--text  indigo darken-2'
          },
          { text: 'Original/copia', value: 'original', class: 'indigo darken-2 white--text' },
          { text: 'Cantidad', value: 'cantidad', class: 'indigo darken-2 white--text' },
          { text: 'Indispensable', value: 'esIndispensable', class: 'indigo darken-2 white--text' },
          { text: 'Ver ', value: 'documento', class: 'indigo darken-2 white--text' },
          { text: 'Validar Doc', value: 'actions', sortable: false, class: 'indigo darken-2 white--text' },
        ],*/

         headers: [
          {
            text: 'Requisito ',
            align: 'start',
            sortable: false,
            value: 'requisitoConvocatoria.requisito.nombre',
           class: ' white--text  indigo darken-2'
          },
          { text: 'Original/copia', value: 'requisitoConvocatoria.original', class: 'indigo darken-2 white--text' },
          { text: 'Cantidad', value: 'requisitoConvocatoria.cantidad', class: 'indigo darken-2 white--text' },
          { text: 'Indispensable', value: 'requisitoConvocatoria.indispensable', class: 'indigo darken-2 white--text' },
          { text: 'Ve Doc. ', value: 'rutaArchivo', class: 'indigo darken-2 white--text' },
          { text: 'Validar Doc', value: 'actions', sortable: false, class: 'indigo darken-2 white--text' },
        ],

        requisitosPart : [
        		/*{
        			name: 'Certificado de Licenciatura',
        			cantidad: 2,
        			original: 'ambos',
        			indispensable: true,
        			entregado: true,
              validado: true,
              documento: 'http://www.africau.edu/images/default/sample.pdf'
        		},
        		{
        			name: 'Título de Licenciatura',
        			cantidad: 1,
        			original: 'original',
        			indispensable: true,
        			entregado: true,
              validado: false,
              documento: 'http://www.africau.edu/images/default/sample.pdf'
        		},{

        			name: 'CURP',
        			cantidad: 1,
        			original: 'copia',
        			indispensable: true,
        			entregado: false,
              validado: false,
              documento: ''
        		}*/
        ],

		}),

    created () {
      this.initialize()
    },

	 methods: {

    initialize () {
          console.log("entrando a initialize");

          let token = localStorage.getItem('token');
             
          let config = {
                       headers: { Authorization: `Bearer ${token}` }
                      };

          this.axios.get(`/sira/participaciones/${this.$route.params.id}`,           
                       config
                      )
                    .then(response => {
                       console.log(response);
                       //console.log(response.headers.authorization);
                       //actualizamos la vista
                         this.requisitosPart=response.data.participacion.participacionRequisitosConvocatoria
                         //this.tituloProg=response.data.participacion.convocatoria.programaEducativo.nombre                         
                         this.tituloConv=response.data.participacion.convocatoria.nombre
                         this.fechaInicio=response.data.participacion.convocatoria.fechaInicio
                         this.fechaTermino=response.data.participacion.convocatoria.fechaTermino
                         this.logo=response.data.participacion.convocatoria.programaEducativo.src
                         this.total=response.data.total
                         this.entregados=response.data.entregados
                         this.idParticipacion = response.data.participacion.id
                         this.nombreAspirante = response.data.participacion.aspirante.nombre+' '+response.data.participacion.aspirante.apellido
                         this.escuela = response.data.participacion.aspirante.escuela
                         this.noWhatsapp = response.data.participacion.aspirante.noWhatsapp
                         this.validados = response.data.validados
                                     
                         


                      })
                    .catch(error => {
                      //this.errorMessage = error.message;
                      console.error("There was an error!", error);
                    });  

       },

	      getColor (item) {
          //console.log(item)
	        if (!item.validado) return 'red'
	        else return 'green'
	       },

       getColorIndisp(item){
        console.log('el item'+item)
           if (!item) return 'red'
          else return 'green'
       },

     closeDialog(){
        
        this.dialogCompletada= false
      },

       verDocumento(item){
        //let route = this.$router.resolve({ path: item.documento });
         window.open(item);
       },

       getColorStatus (total,entregados,validados) {
          if (total>validados) return 'red'
          else return 'green'
         },

       validarDocumento(item){

        console.log("aca se validará el documento "+item.id + " el id de la participacion es "+this.idParticipacion + " el validado es ->"+item.validado)

         let token = localStorage.getItem('token');
          const fd = new FormData();
          if(!item.validado)
          fd.append('validado',true)
          else
            fd.append('validado',false)

          let config = {
                       headers: { Authorization: `Bearer ${token}` }
                      };

         this.axios.patch('/sira/participaciones/'+this.idParticipacion+ '/prc/'+item.id,
                      fd,
                      config,                      
                      ).then(response => {
                                 console.log(response);
                          if(response.data.participacion.estatus=='completada'){
                             
                              this.mensajeCompletada=response.data.mensajeCompletada
                               this.dialogCompletada=true
                          }        
                                 this.initialize();

                      }).catch(error => {
                          //this.errorMessage= 
                          console.error("Hubo un error", error);
                      });             



       }

    	},

	}
</script>