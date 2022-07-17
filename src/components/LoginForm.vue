<template>
	<v-main>
		<v-card class="px-4 ">			
			<v-card-title >Ingresar</v-card-title>
			<v-card-text>
				<v-form ref="loginForm" v-model="valid" lazy-validation  >		  
					 <v-row>
                        <v-col cols="12">
                        	 <v-text-field v-on:change="quitarMensaje()" v-model="email" :rules="emailRules" label="Dirección de Correo:" required></v-text-field>
                        </v-col>
				   		 <v-col cols="12">
				   		 	<v-text-field v-model="password" :counter="6" :rules="passwordRules" label="Contraseña:" type="password" required></v-text-field> 
				   		 </v-col>
				   		 <v-spacer></v-spacer>
				   		 <v-alert
						      border="top"
						      color="red lighten-2"
						      dark
						      v-if="mensaje!=''"
						    >
						     {{mensaje}}
						    </v-alert>
                         <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                             <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Ingresar </v-btn>
                        </v-col>				    
					</v-row>	
				</v-form>				
			</v-card-text>
		<!-- 	<v-card-actions>
					<router-link to="/home">
						<v-btn 
   					 :disabled="!valid"
					      color="indigo darken-2"
					      class="mx-auto"
					      @click="validate"					    
					      >Ingresar</v-btn>
					</router-link>
   					 
				</v-card-actions> -->
		</v-card>

	<!-- 	 <v-dialog v-model="dialogErrors" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">{{dialogError}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="!dialogErrors">OK</v-btn>
          
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
 -->
	</v-main>
</template>

<script type="text/javascript">
	import { mapActions } from "vuex";
		import {axios} from "axios";
	

 export default {
 
	   data: () => ({
	   		  mensaje: '',
		      valid: true,
		      password: '',
		      passwordRules: [
		        v => !!v || 'La contraseña es requerida',
		        v => (v && v.length >= 6) || 'La contraseña debe tener al menos 6 caracteres',
		         //v => /(?=.*[A-Z])/.test(v) || 'Debe tener al menos una mayúscula',
			    v => /(?=.*\d)/.test(v) || 'Debe tener al menos un número',
			   // v => /([!@$%])/.test(v) || 'Debe contener un caracter especial [!@#$%]'
			      ],
		      email: '',
		      emailRules: [
		        v => !!v || 'El correo es requerido',
		        v => /.+@.+\..+/.test(v) || 'Debe ingresar un correo válido',
		      ],		     
		    }),

		    methods: {

		    	...mapActions(['guardarUsuario']),

		      validate () {
		         if (this.$refs.loginForm.validate()) {
			        // submit form to server/API here...
			        console.log("entrando a validar login");
			        this.axios.post("/login", {								   
								    email: this.email,								   
								    password: this.password 
								  })
						    .then(response => {
						    		console.log("cae en el response")
						    	 console.log(response);
						    	 console.log(response.headers.authorization);
						    	 const token = response.headers.authorization.replace('Bearer ','');
		      					//localStorage.setItem('token',response.headers.authorization.replace('Bearer ',''));
		      						this.guardarUsuario(token);

		      					//this.$router.push('/home');					    	
						    	})
						    .catch(error => {
						    	console.error("There was an error!", error);
						    	this.dialogErrors=true
						      this.mensaje = error.response.data.mensaje;
						      
						    });		       		

			      }
		      },
		      reset () {
		        this.$refs.loginForm.reset()
		      },
		      resetValidation () {
		        this.$refs.loginForm.resetValidation()
		      },
		      quitarMensaje(){
		      	this.mensaje=""
		      }

		    },
 }



</script>