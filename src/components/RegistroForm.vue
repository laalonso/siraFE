<template>
	<v-main>
		<v-card class="px-4">			
			<v-card-title >Registro</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation  >
				 <v-row>
                    	 <v-col cols="12" sm="6" md="6">
                         	<v-text-field v-model="nombre" :rules="[rules.required]" label="Nombre" maxlength="20" required></v-text-field>
                         </v-col>
                          <v-col cols="12" sm="6" md="6">
                         	<v-text-field v-model="apellido" :rules="[rules.required]" label="Apellidos" maxlength="60" required></v-text-field>
                         </v-col>
                          <v-col cols="12" sm="6" md="6">
                         	<v-text-field v-model="escuela"  label="Escuela de procedencia:" maxlength="40" required></v-text-field>
                         </v-col>
                          <v-col cols="12" sm="6" md="6">
                         	<v-text-field v-model="nowhatsapp"  label="No. de whatsapp" maxlength="10" required></v-text-field>
                         </v-col>
                         <v-col cols="12">
                           <v-text-field v-model="email" :rules="emailRules" label="Correo" required></v-text-field>
                         </v-col>
                         <v-col cols="12">
                          	<v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="Debe tener por lo menos 6 caracteres" counter @click:append="show1 = !show1"></v-text-field>
                         </v-col>
                         <v-col cols="12">
                          	<v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                        	</v-col>
                         <v-spacer></v-spacer>
                         <v-col class="d-flex justify-space-between mb-6  " cols="12" sm="12" xsm="12">
                             <v-btn x-large block :disabled="!valid" color="success" @click="validate">Registrar</v-btn>
                         </v-col>
                         
                         	 <v-col class=" justify-space-between mb-0 mt-0 " cols="12" sm="12" xsm="12">
                         	<template>
							  <div class="text-center">
							  
							    <v-dialog
							      v-model="dialog"
							      width="500"
							    >
							      <template v-slot:activator="{ on, attrs }">
							        <v-btn
							          color="blue lighten-1"
							          dark
							          v-bind="attrs"
							          v-on="on"
							          outlined
							          class="mx-auto mt-0"
							        >
							          Aviso de privacidad
							        </v-btn>
							        	<p class="font-italic mt-1" >Al crear su cuenta usted acepta el acuerdo de privacidad de LANIA. </p>
							      </template>

							      <v-card>
							        <v-card-title class="text-h5 grey lighten-2">
							          Aviso de privacidad
							        </v-card-title>

							        <v-card-text>
							          Usted expresamente acepta Política de	Privacidad	al	registrarse, accede	a,	navegar	por,	
										o utilizar nuestros productos, contenido, funcionalidades,	tecnología	o	funciones	disponibles	en	redes	sociales	y	nuestro	sitio www.lania.edu.mx/sira
							        </v-card-text>

							        <v-divider></v-divider>

							        <v-card-actions>
							          <v-spacer></v-spacer>
							          <v-btn
							            color="primary"
							            text							        
							            @click="dialog = false"
							          >
							            Acepto
							          </v-btn>
							        </v-card-actions>
							      </v-card>
							    </v-dialog>
		  						</div>
							</template>
                         </v-col>
                        




				</v-row>	
				</v-form>
				
			</v-card-text>
		</v-card>

		

	</v-main>
</template>

<script type="text/javascript">
	import {axios} from "axios";


 export default {
 
	   data: () => ({
	   			dialog: false,
		      	valid: true,
		    	nombre: "",		      
		        apellido:"", 
		      	checkbox: false,
		      	email: "",
		      	nowhatsapp: "",
		      	escuela: "",
			    password: "",
			    verify: "",			   	   
			    emailRules: [
			      v => !!v || "Requerido",
			      v => /.+@.+\..+/.test(v) || "Debe ingresar un correo válido"
			    ],
			    show1: false,
			    rules: {
			      required: value => !!value || "Requerido",
			      min: v => (v && v.length >= 6) || "Min 6 caracteres"
    			}
		    }),
	   computed: {
		   		passwordMatch() {
		      		return () => this.password === this.verify || "La contraseña debe coincidir";
    			}
  			},
	   methods: {
				validate() {
			      if (this.$refs.form.validate()) {
			        // submit form to server/API here...
			         console.log("entrando a registrar");
			       /*  this.axios.post('/sira/usuarios', {
								    nombre: this.nombre,
								    apellido: this.apellido,
								    email: this.email,
								    escuela: this.escuela,
								    noWhatsapp: this.nowhatsapp,
								    password: this.password 
								  })
								  .then(function (response) {
								    console.log(response);
								     this.$swal('Hello Vue world!!!');
								  })
								  .catch(function (error) {
								    console.log(error);
								 });
*/

					 this.axios.post("/sira/usuarios", {
								    nombre: this.nombre,
								    apellido: this.apellido,
								    email: this.email,
								    escuela: this.escuela,
								    noWhatsapp: this.nowhatsapp,
								    password: this.password 
								  })
						    .then(response => {
						    	 console.log(response);
						    	 this.$swal({										 
										  position: 'center',
							                type: 'success',
							                title: 'Se ha enviado un correo para confirmar su cuenta',
							                showConfirmButton: true,								  
    									
										  //timer: 1500
										})
						    	})
						    .catch(error => {
						      this.errorMessage = error.message;
						      console.error("There was an error!", error);
						    });
			      		}
			    },
			    reset() {
			      this.$refs.form.reset();
			    },
			    resetValidation() {
			      this.$refs.form.resetValidation();
			    },

		    },
 }



</script>