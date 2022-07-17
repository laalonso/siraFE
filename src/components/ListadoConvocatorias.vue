<template>
<v-container>
  <v-col
            v-for="(convocatoria, i) in convocatorias"
            :key="i"
            cols="12"
          >
            <v-card
              :color="color(convocatoria.programaEducativo.tipo)"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between ">
                <div>
                  <v-card-title
                    class="text-h5 fix"
                    v-text="convocatoria.programaEducativo.nombre"
                  ></v-card-title>
  
                  <v-card-subtitle v-text="convocatoria.nombre"></v-card-subtitle>
  
                  <v-card-actions>
             
                    <v-btn
                     
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      @click="verDetalle(convocatoria)"
                    >
                      VER DETALLE
                    </v-btn>
                  </v-card-actions>
                </div>
  
                <v-avatar
                  class="ma-3"
                  size="100"
                  tile
                >
                  <v-img contain :src="convocatoria.programaEducativo.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
      </v-col>

<!-- inicio del dialogo de detalle -->
  <v-dialog    
     v-model="dialog" 
      max-width="500px" 
      persistent>         
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
         
         <v-list three-line>

          
              <v-subheader class="font-weight-bold black--text"
                
              >Requisitos</v-subheader>

              <v-divider
               
              ></v-divider>
            <template v-for="(requisito, index) in requisitosConv">
              <v-list-item              
              >               
                <v-list-item-content>
                  <v-list-item-title v-html="requisito.requisito.nombre"></v-list-item-title>
                  <v-list-item-subtitle v-html="requisito.requisito.descripcion"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

          </v-list>

          <v-divider></v-divider>           
               
         <v-card-actions class="text-center" >
              <v-spacer></v-spacer>
              <div >
              <v-btn color="indigo darken-2"  dark  class="mb-2 "
               
                @click="registrarParticipacion(convocatoriaR)"
              >
                Registrar participación
              </v-btn>
               <v-btn color="indigo darken-2"  dark  class="mb-2 "
               
                @click="dialog=false"
              >
                Cerrar
              </v-btn>
            </div>
            </v-card-actions>
        </v-card>
     </v-dialog>
<!-- fin del dialogo de detalle -->

 <v-dialog
      v-model="dialogOK"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{registroMessage}}
        </v-card-title>

        <v-card-text>
          Le será enviado un correo con los detalles de su participación...
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

         
          <v-btn
            color="indigo darken-2"
            text
            @click="dialogOK = false" 
          > <!--- Aquí se puede redireccionar a las participaciones-->
            Entendido.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</v-container>
</template>

<script>
  import {axios} from "axios";

 	//Maestría en Redes y Sistemas Integrados
	//Maestría en Computación Aplicada
  export default {
    data: () => ({
      dialog: false,
      dialogOK: false,
      convocatoriaR: '',
      registroMessage:'',
      convocatorias: [
       /* {
          id : 1,
          color: 'indigo darken-4', //El color cambiara depende si es maestria o diplomado
          src: 'http://www.lania.mx/wp-content/uploads/2020/05/logoMR.png',
          peducativo: 'MRYSI',
          nombre: 'Convocatoria MRySI Presencial 2021',
        },
        {
          id : 2,
          color: 'indigo darken-4',
          src: 'http://www.lania.mx/wp-content/uploads/2020/05/logoMCA.png',
          peducativo: 'MCA',
          nombre: 'Convocatoria en MCA 2021',
        },
         {
          id: 3,
          color: 'indigo darken-1',
          src: 'http://www.lania.mx/wp-content/uploads/2020/05/thumbnail-1.png',
          peducativo: 'Diplomado en Redes',
          nombre: 'Convocatoria en MCA 2021',
        },*/
      ],

      convocatoriaDetalle: {
        nombre: '',
        peducativo: ''
      },

      tituloConv: '',
      tituloProg: '',
      fechaInicio: '',
      fechaTermino:'',
      fechaExamen:'',
      logo:'',

      requisitosConv: [
      /*  { header: 'Requisitos' },
        {
         
          title: 'Título de Licenciatura',
          subtitle: 'Titulo original y 2 copias',
        },
        { divider: true, inset: true },
        {
   
          title: 'Certificado de Licenciatura',
          subtitle:'Original y copia',
        },
        { divider: true, inset: true },
        {
    
          title: 'Acta de nacimiento',
          subtitle: 'original',
        },
        { divider: true, inset: true },
        {
     
          title: 'CURP',
          subtitle: 'Copia',
        },
        { divider: true, inset: true },
        {
       
          title: 'Formato CONACYT',
          subtitle: 'Original, llenar en la plataforma',
        },*/
      ],

    }),

    computed: {
      
    },

     created () {
      this.initialize()
    },

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
                     this.convocatorias=response.data.convocatorias;   
                  })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });  

       },

       verDetalle(convocatoria){
          console.log(convocatoria)

         let token = localStorage.getItem('token');
         
         let config = {
                      headers: { Authorization: `Bearer ${token}` }
                    };
        

         this.axios.get("/sira/catalogos/convocatorias/"+convocatoria.id+"/requisitos",
                   config
                   )
                  .then(response => {
                      console.log(response.data);
                      this.requisitosConv = response.data;
                      
                  }) 
         this.tituloConv = convocatoria.nombre
         this.tituloProg = convocatoria.programaEducativo.nombre
         this.fechaTermino = convocatoria.fechaTermino
         this.fechaInicio = convocatoria.fechaInicio
         this.logo = convocatoria.programaEducativo.src
         this.fechaExamen = convocatoria.fechaExamen
         this.dialog = true
         this.convocatoriaR = convocatoria
       },

       registrarParticipacion(convocatoria){
            console.log(convocatoria)

            let token = localStorage.getItem('token');
             let bodyParams = {};
         
            let config = {
                      headers: { Authorization: `Bearer ${token}` }
                    };

            this.axios.post("/sira/participaciones/convocatorias/"+convocatoria.id,
                   bodyParams,
                   config
                   )
                  .then(response => {
                      console.log(response.data);
                     
                      this.axios.post("/sira/notificaciones/convocatorias/"+convocatoria.id,
                        bodyParams,
                        config
                        ).then(response=>{
                              console.log(response.data);

                        }).catch(error => { 
                            this.errorMessage = error.message
                            console.error("Hubo un error en el envío de correo",error);
                          });
                     // this.requisitosConv = response.data;
                     this.openDialogOK(response.data.mensaje)
                      
                  })
                  .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                      });    
        
       },

       openDialogOK(message){
          this.registroMessage = message
           this.dialogOK=true

       },

      color (tipo) {
        return tipo === 'Maestria' ? 'indigo darken-4' : 'indigo darken-1'
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

