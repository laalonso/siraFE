<template>
    <v-dialog    
     v-model="dialog" 
     max-width="500px" >         
       <v-card
          class="mx-auto"
         
        >
          <div class="d-flex flex-no-wrap justify-space-between indigo darken-4"  >
            <div>
              <v-card-title
                    class="text-h5 fix white--text "
                    >Maestría en Computación Aplicada</v-card-title>  
                    <v-card-subtitle class="font-weight-regular white--text">Convocatoria 2021</v-card-subtitle>
            </div>
             <v-avatar
                  class="ma-3"
                  size="100"
                  tile
                >
                  <v-img contain src="http://www.lania.mx/wp-content/uploads/2020/05/logoMR.png"></v-img>
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
                    <p class="font-weight-regular">10 de Julio de 2021</p>
                    <p class="font-weight-bold mb-0">Fecha Examen:</p>
                    <p class="font-weight-regular">10 de Agosto de 2021</p>
                
            </v-col>
             <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                
                   <p class="font-weight-bold mb-0">Fecha Término:</p>
                    <p class="font-weight-regular">10 de Agosto de 2021</p>
                    <p class="font-weight-bold mb-0">Hora Exámen:</p>
                    <p class="font-weight-regular">5:00 pm</p>
             
            </v-col>
            
          </div>
          </v-container>
         
   <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
         
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <v-divider></v-divider>           
               
         <v-card-actions class="text-center" >
              <v-spacer></v-spacer>
              <div >
              <v-btn color="primary"  dark  class="mb-2 "
               
                @click=""
              >
                Registrar participación
              </v-btn>
            </div>
            </v-card-actions>
        </v-card>
     </v-dialog>
</template>  
<script type="text/javascript">
    export default {
    data () {
      return {
        dialog: true,
      items: [
        { header: 'Requisitos' },
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
        },
      ],
      }
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


