<template>
  <v-data-table :headers="headers" :items="convocatorias" sort-by="descripcion"  class="elevation-10" :header-props="headerProps" >
     <template v-slot:item.fechaInicio="{ item }">
        <span>{{ new Date(item.fechaInicio).toLocaleString("es-MX",{dateStyle:"medium"}) }}</span>
     </template>
     <template v-slot:item.fechaTermino="{ item }">
        <span>{{ new Date(item.fechaInicio).toLocaleString("es-MX",{dateStyle:"medium"}) }}</span>
     </template>
     <template v-slot:item.fechaExamen="{ item }">
        <span>{{ new Date(item.fechaExamen).toLocaleString("es-MX",{dateStyle:"medium"}) }}</span>
     </template>
    <template v-slot:top>
      <v-toolbar flat color="indigo darken-2 white--text fix"  >
        <v-toolbar-title class="fix">
           <v-icon dark large>mdi-bullhorn-outline</v-icon>
         Convocatorias
       </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical

        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn  color="primary"  dark  class="mb-2" v-bind="attrs"  v-on="on" >
             Crear Nueva
            </v-btn>
          </template>
          <v-card>
            <div class="indigo darken-2 text-center white--text">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
          </div>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                   <v-select
                        :items="programas"
                         v-model="editedItem.programaEducativo"
                         item-text="nombre"
                         item-value="id"
                        label="Programa Educativo"
                        dense
                        solo
                      ></v-select>                  
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                     outlined                   
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                    ></v-textarea>
                  </v-col>
                 <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.fechaInicio"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.fechaInicio"
                            label="Fecha de Inicio"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.fechaInicio"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editedItem.fechaInicio)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                        <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.fechaTermino"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.fechaTermino"
                            label="Fecha de Término"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.fechaTermino"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu2 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu2.save(editedItem.fechaTermino)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                                            <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.fechaExamen"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.fechaExamen"
                            label="Fecha de Examen"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.fechaExamen"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu3 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu3.save(editedItem.fechaExamen)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cantAspirantes"
                      label="Cupo"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo darken-2"  dark  class="mb-2"
               
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
               color="indigo darken-2"  dark  class="mb-2"
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Estas seguro que deseas eliminar ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeleteReq" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Estas seguro que deseas eliminar ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteReqConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogRequisitos" max-width="500px">
          <v-card>
            <div class="indigo accent-3 text-center white--text">
            <v-card-title>
              <span class="text-h5">{{ formTitleRequisitos }}{{convocatoriaNombre}}</span>
            </v-card-title>
          </div>
          <v-card-text>
           <v-container>
              <template>
                <v-subheader>Requisitos de la Convocatoria {{convocatoriaNombre}}</v-subheader>
              </template>                 
                 
               <v-divider></v-divider>
                <v-row>            
                     
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      >
                      <template>
                        <v-data-table
                          :headers="headersRequisitos"
                          :items="requisitosConvocatoria"
                          :items-per-page="5"
                          class="elevation-1"

                        >
                          <template v-slot:item.requisito.id="{ item }">
                            <v-icon
                              color="teal"
                              class="mr-2"
                              @click="deleteRequisito(item.requisito.id,item.cantidad,item.indispensable,item.original)"
                            >
                               mdi-delete
                            </v-icon>     
                            </template>
                        </v-data-table>
                      </template>
                </v-col>
                 <v-spacer></v-spacer>
                <v-spacer></v-spacer>
              </v-row>    

              <v-row>
                  <v-divider></v-divider>   
                  

             <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                   <template>
                         <v-subheader>Agrega un nuevo requisito</v-subheader>
                    </template>
                  <v-autocomplete
                    :items ="requisitos"
                    v-model = "requisito"
                    item-text = "nombre"
                    item-value ="id"
                    label = "Selecciona requisito"
                    dense

                  >                    
                  </v-autocomplete>     
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select   
                        v-model="original"
                        :items="['original','copia','ambos']"                                    
                        label="original/copia"
                        dense
                        solo
                      ></v-select>     
                </v-col>

                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-switch
                      v-model="esIndispensable"
                      label="Es indispensable"
                       color="indigo"
                    ></v-switch>
                </v-col>

                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >

                 <v-text-field
                      v-model ="cantidad"
                      label="Cantidad"
                      type = "number"
                    ></v-text-field>
                    <v-text-field
                      v-model ="idConvocatoria"
                      v-show="false"
                      type = "number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="2"
                    sm ="2"
                    md="2"
                    >
                    
                     <v-btn
                       color="primary"  dark  class="mb-2"
                        @click="agregarRequisito"
                      >
                        Agregar Requisito
                   </v-btn>
                </v-col>              
            </v-row>
         
          </v-container>
        </v-card-text>
            <v-card-actions>
            
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        color="teal"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        color="red"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
       <v-icon
        color="info"
        @click="editaRequisitos(item)"
      >
      mdi-clipboard-list-outline
      </v-icon>
    </template>

    

    

    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reiniciar
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>

  import {axios} from "axios";
  import {qs} from "qs";

  export default {
    data: () => ({
      menu: false,
      menu2: false,
      menu3: false,
      dialog: false,
      dialogDelete: false,
      dialogRequisitos: false,
      dialogDeleteReq: false,
       headerProps: {
        sortByText: "Ordenar por"
      },
      headers: [
        {text: 'No.', value:'id', class:'indigo lighten-1 white--text text-center'},
        { text: 'Nombre ', align: 'start', sortable: false, value: 'nombre', class: 'indigo lighten-1 white--text text-center'},
        { text: 'Descripcion', value: 'descripcion', width:'300', class: 'indigo lighten-1 white--text '},
        { text: 'Fecha Inicio', value: 'fechaInicio', class: 'indigo lighten-1 white--text ' },
        { text: 'Fecha Término', value: 'fechaTermino', class: 'indigo lighten-1 white--text ' },
         { text: 'Fecha Examen', value: 'fechaExamen', class: 'indigo lighten-1 white--text ' },
        { text: 'Programa Educativo', value: 'programaEducativo.nombre', class: 'indigo lighten-1 white--text ' },
        { text: 'Cupo', value: 'cantAspirantes', class: 'indigo lighten-1 white--text ' },
        { text: 'Acciones', value: 'actions', sortable: false, class: 'indigo lighten-1 white--text ' },
      ],
      convocatorias: [],
      editedIndex: -1,
      editedItem: {
        id:'',
        nombre: '',
        descripcion: '',
        fechaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fechaTermino: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
         fechaExamen: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        programaEducativo: '',
        cantAspirantes:''
      },
      defaultItem: {
        id: '',
        nombre: '',
        descripcion: '',
        fechaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fechaTermino: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        fechaExamen: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        programaEducativo: '',
        cantAspirantes:''
      },
     
      programas:[],

      requisitos:[],
      requisito : '',
      esIndispensable: false,
      original: '',
      cantidad: '',
      requisitosConvocatoria:[],
      idConvocatoria:'',
      convocatoriaNombre:'',
      requisitoIndex: -1,
      idRequisito: '',

       headersRequisitos: [
        {text: 'No.', value:'id', class:'indigo lighten-1 white--text text-center'},
        { text: 'Requisito ', align: 'start', sortable: false, value: 'requisito.nombre', class: 'indigo lighten-1 white--text text-center'},
        { text: 'Indispensable', value: 'indispensable', class: 'indigo lighten-1 white--text' },
        { text: 'Cant.', value: 'cantidad', class: 'indigo lighten-1 white--text' },
        { text: 'Original.', value: 'original', class: 'indigo lighten-1 white--text' },
         { text: 'reqid', value: 'requisito.id', class: 'indigo lighten-1 white--text' },
      ],

      formTitleRequisitos: 'Requisitos de  '
         
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Convocatoria' : 'Editar Convocatoria'
      },

    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
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

      this.axios.get("/sira/catalogos/peducativos",
                   config
                   )
                  .then(response => {
                      console.log(response.data);
                      this.programas = response.data.peducativos;
                      
                  })

         this.axios.get("/sira/catalogos/requisitos",
                   config
                   )
                  .then(response => {
                      console.log(response.data);
                      this.requisitos = response.data;
                      
                  })                                  

      },

      editaRequisitos(item){
          console.log("item >>>> "+item.id)
         this.convocatoriaNombre=item.nombre
         let token = localStorage.getItem('token');
         
          let config = {
                      headers: { Authorization: `Bearer ${token}` }
                    };
             this.idConvocatoria = item.id

          this.axios.get("/sira/catalogos/convocatorias/"+item.id+"/requisitos",
                   config
                   )
                  .then(response => {
                      console.log(response.data);
                      this.requisitosConvocatoria = response.data;
                     
                  })   

          this.dialogRequisitos = true
      },

      editItem (item) {
        //this.editedIndex = this.convocatorias.indexOf(item)
       /* console.log(item);
         this.editedIndex = this.convocatorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true*/

        this.editedIndex = this.convocatorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        /*this.editedIndex = this.convocatorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true*/
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
       // this.convocatorias.splice(this.editedIndex, 1)
           let token = localStorage.getItem('token');

           let bodyParams = { 
                   
                  };

           let config = {
                       headers: { Authorization: `Bearer ${token}` }
                     };

          let indice = this.editedIndex;
             this.axios.delete("/sira/catalogos/convocatorias/"+this.editedIndex,                  
                           config
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                           console.log("convocatoria eliminada ->"+response);                              
                              this.convocatorias = this.convocatorias.filter(p => p.id != indice)
                              this.closeDelete()
                          })
                        .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                        });     
      
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeRequisitos(){
          this.dialogRequisitos = false
      },

      save () {
        //TODO ....
           let token = localStorage.getItem('token');

           

           let bodyParams = { 
                    nombre: this.editedItem.nombre,                   
                    descripcion: this.editedItem.descripcion,
                    fechaInicio: this.editedItem.fechaInicio,
                    fechaTermino: this.editedItem.fechaTermino,                   
                    cantAspirantes: this.editedItem.cantAspirantes,
                    fechaExamen: this.editedItem.fechaExamen                  
                  };

           let config = {
                       headers: { Authorization: `Bearer ${token}` }
                     };

             if (this.editedIndex > -1) {  //si es update

                        let progEducativo = this.editedItem.programaEducativo.id;
                        console.log("EL id que se actualizara en BD será > " +this.editedItem.id)
                        console.log("El indice de la tabla actualizar es >"+ this.editedIndex)
                        let indice = this.editedIndex;
                        this.axios.put("/sira/catalogos/convocatorias/"+this.editedItem.id+"/peducativos/"+progEducativo,                  
                           bodyParams,
                           config                          
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                              console.log("convocatoria editada ->"+response.data);                              
                              Object.assign(this.convocatorias[indice], response.data);
                          })
                        .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                        });     
                        
                }
             else {  //si es nuevo
                let progEducativo = this.editedItem.programaEducativo;
                console.log("entrando a guardar nueva convocatoria");
                console.log("el token es "+localStorage.getItem('token'));        
                

                      this.axios.post("/sira/catalogos/convocatorias/peducativos/"+progEducativo,                  
                           bodyParams,
                           config
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                              console.log("convocatoria editada ->"+response.data);
                               this.convocatorias.push(response.data)      
                          })
                        .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                        });                                    
                }                              
           this.close()              
      },

      agregarRequisito(){
         let token = localStorage.getItem('token');     

         let params = this.qs.stringify({
            cantidad: this.cantidad,
            indispensable : this.esIndispensable,
            original: this.original
         })     
          

           let config = {
                       headers: { Authorization: `Bearer ${token}` }
                     };

           this.axios.post("/sira/catalogos/convocatorias/"+this.idConvocatoria+"/requisitos/"+this.requisito,                  
                           params,
                           config
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                              console.log("convocatoria editada ->"+response.data);
                               this.requisitosConvocatoria=response.data.requisitos
                                    this.requisito=''
                                    this.cantidad=''
                                    this.original=''
                                    this.esIndispensable=false
                          })
                        .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                        });  


      },

      deleteRequisito(id,cantidad,esIndispensable,original){
        console.log(id,cantidad,esIndispensable,original)
         this.idRequisito = id        
         this.cantidad = cantidad
         this.esIndispensable = esIndispensable
         this.original = original
        
        //this.editedItem = Object.assign({}, item)
        this.dialogDeleteReq = true
      },

      closeDeleteReq(){
        
        this.dialogDeleteReq = false
      },

       deleteReqConfirm () {
       // this.convocatorias.splice(this.editedIndex, 1)
           let token = localStorage.getItem('token');
             console.log(this.cantidad,this.esIndispensable,this.original)
          let params2 = this.qs.stringify({
          
         })     

           let config = {
                       headers: { Authorization: `Bearer ${token}` }
                     };

          //let indice = this.editedIndex;
             this.axios.delete("/sira/catalogos/convocatorias/"+this.idConvocatoria+"/requisitos/"+this.idRequisito+"?cantidad="+this.cantidad+"&indispensable="+this.esIndispensable+"&original="+this.original,                  
                           //params2,
                           config
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                           console.log("requisito-convocatoria eliminado ->"+response);
                              this.requisitosConvocatoria = response.requisitos                              
                              //this.requisitos = this.convocatorias.filter(p => p.id != indice)
                              this.closeDeleteReq()
                          })
                        .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                        });     
      
      },


    },
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