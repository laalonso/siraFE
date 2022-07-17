<template>
  <v-data-table :headers="headers" :items="requisitos" sort-by="descripcion"  class="elevation-10"  :header-props="headerProps" sort-by-text="Ordenar por" >
     <template v-slot:item.esDocumento="{ item }">
         <v-icon
        color="primary"
        class="mr-2"
      >
        {{getIcono(item.esDocumento)}}
      </v-icon>
     </template>
     <template v-slot:item.esCambiante="{ item }">
        <span>{{ item.esCambiante==true?"SI":"NO" }}</span>
     </template>
    <template v-slot:top>
      <v-toolbar flat color="indigo darken-2 white--text"  >
        <v-toolbar-title >Requisitos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn  color="primary"  dark  class="mb-2" v-bind="attrs"  v-on="on" >
             Crear Nuevo
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
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.tipo"
                      label="Tipo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >        
                  <v-switch
                      v-model="editedItem.esDocumento"
                      :label="`Documento`"
                      color="indigo"
                    ></v-switch>
             
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >
                   <v-switch
                      v-model="editedItem.esCambiante"
                      :label="`Actualizable`"
                       color="indigo"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"  dark  class="mb-2"
               
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
               color="primary"  dark  class="mb-2"
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

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headerProps: {
        sortByText: "Ordenar por"
      },
      headers: [
        {text: 'No.', value:'id', class:'indigo lighten-1 white--text text-center'},
        { text: 'Nombre ', align: 'start', sortable: false, value: 'nombre', class: 'indigo lighten-1 white--text  text-center'},
        { text: 'Tipo', value: 'tipo', width:'300', class: 'indigo lighten-1 white--text '},
        { text: 'Descripcion', value: 'descripcion', class: 'indigo lighten-1 white--text ' },
        { text: 'Documento', value: 'esDocumento', class: 'indigo lighten-1 white--text ' },
        { text: 'Cambiante', value: 'esCambiante', class: 'indigo lighten-1 white--text ' },
        { text: 'Acciones', value: 'actions', sortable: false, class: 'indigo lighten-1 white--text ' },
      ],
      requisitos: [],
      editedIndex: -1,
      editedItem: {
        id:'',
        nombre: '',
        descripcion: '',
        esDocumento: false,
        esCambiante: false,
        tipo: ''
      },
      defaultItem: {
         id:'',
        nombre: '',
        descripcion: '',
        esDocumento: false,
        esCambiante: false,
        tipo: ''
      },
              
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Requisito' : 'Editar Requisito'
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

      this.axios.get("/sira/catalogos/requisitos",           
                   config
                  )
                .then(response => {
                   console.log(response);
                   //console.log(response.headers.authorization);
                   //actualizamos la vista
                     this.requisitos=response.data;   
                  })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });  

            

      },

      getIcono(valor){
          if(valor) return "mdi-check"
            else return "mdi-close"
      },

      editItem (item) {
        //this.editedIndex = this.convocatorias.indexOf(item)
       /* console.log(item);
         this.editedIndex = this.convocatorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true*/

        this.editedIndex = this.requisitos.indexOf(item)
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
             this.axios.delete("/sira/catalogos/requisitos/"+this.editedIndex,                  
                           config
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                           console.log("requisito eliminado ->"+response);                              
                              this.requisitos = this.requisitos.filter(p => p.id != indice)
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

      save () {
        //TODO ....
           let token = localStorage.getItem('token');

           

           let bodyParams = { 
                    nombre: this.editedItem.nombre,                   
                    descripcion: this.editedItem.descripcion,
                    tipo: this.editedItem.tipo,
                    esDocumento: this.editedItem.esDocumento,                   
                    esCambiante: this.editedItem.esCambiante                  
                  };

           let config = {
                       headers: { Authorization: `Bearer ${token}` }
                     };

             if (this.editedIndex > -1) {  //si es update

                       
                        console.log("EL id que se actualizara en BD será > " +this.editedItem.id)
                        console.log("El indice de la tabla actualizar es >"+ this.editedIndex)
                        let indice = this.editedIndex;
                        this.axios.put("/sira/catalogos/requisitos/"+this.editedItem.id,                  
                           bodyParams,
                           config
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                              console.log("requisito editado ->"+response.data);                              
                              Object.assign(this.requisitos[indice], response.data.requisito);
                          })
                        .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                        });     
                        
                }
             else {  //si es nuevo
               
                console.log("entrando a guardar nueva convocatoria");
                console.log("el token es "+localStorage.getItem('token'));        
                

                      this.axios.post("/sira/catalogos/requisitos",                  
                           bodyParams,
                           config
                          )
                        .then(response => {
                           console.log(response);
                           //onsole.log(response.headers.authorization);
                              //actualizamos la vista
                              console.log("requisito creado ->"+response.data);
                               this.requisitos.push(response.data.requisito)      
                          })
                        .catch(error => {
                          this.errorMessage = error.message;
                          console.error("There was an error!", error);
                        });                                    
                }                              
           this.close()              
      },
    },
  }
</script>