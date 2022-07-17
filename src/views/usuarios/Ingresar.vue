<template>
<div>


	<v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
		
	 		 <div>
	 		  	<v-tabs v-model="tab" show-arrows background-color="indigo darken-4" icons-and-text dark grow>
	 		  		 <v-tabs-slider color="purple darken-4"></v-tabs-slider>
	 		  		  <v-tab v-for="i in tabs" :key="i.name">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                     <v-tab-item>
                     	<LoginForm />
                     </v-tab-item>
                     <v-tab-item>
                     	<RegistroForm />
                     </v-tab-item>
	 		  	</v-tabs>
	 		 </div>
			 </v-dialog>


</div>
</template>

<script>
  import LoginForm from '@/components/LoginForm'
  import RegistroForm from '@/components/RegistroForm'

  export default {
    name: 'Login',

    components: {
      LoginForm,
      RegistroForm
    },
    data: () => ({
    	dialog: true,
	    tab: 0,
	    tabs: [
	        {name:"Ingresar", icon:"mdi-account"},
	        {name:"Registrarse", icon:"mdi-account-outline"}
	    ],
    })
  }
</script>
