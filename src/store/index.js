import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	token: '',
  	usuarioDB: ''
  },
  mutations: {
  	obtenerUsuario(state,payload){
  		state.token = payload;
  		if(payload===''){
  			state.usuarioDB=''
  		}else{
  			state.usuarioDB = decode(payload);
  			if(state.usuarioDB.authorities[0].authority == 'ADMIN'){
  				router.push('/home/dashboard');
  			}else if(state.usuarioDB.authorities[0].authority == 'ASPIRANTE'){
  				router.push('/aspirantes/convocatorias')
  			}else if(state.usuarioDB.authorities[0].authority == 'SEGUIMIENTO'){
  				router.push('/seguimiento/dashboard')
  			}
  		}
  	}
  },
  actions: {

  	guardarUsuario({commit}, payload){
  		localStorage.setItem('token', payload);
  		commit('obtenerUsuario',payload);
  	},

    cerrarSesion({commit}){
      commit('obtenerUsuario','');
      localStorage.removeItem('token');
      router.push({name:'Ingresar'});
    }

  },
  modules: {
  }
})
