import Vue from 'vue'
import VueRouter from 'vue-router'
import Ingresar from '../views/usuarios/Ingresar.vue'
import Confirmado from '@/views/usuarios/Confirmado.vue'
import CRUDConvocatorias from '@/components/CRUDConvocatorias.vue'
import CRUDProgEducativos from '@/components/CRUDProgEducativos.vue'
import CRUDRequisitos from '@/components/CRUDRequisitos.vue'
import ListadoConvocatorias from '@/components/ListadoConvocatorias.vue'
import ConvocatoriaDetalle from '@/components/ConvocatoriaDetalle.vue'
import MisConvocatorias from '@/components/MisConvocatorias.vue'
import Participacion from '@/components/Participacion.vue'
import AspirantesConvocatoria from '@/components/AspirantesPorConvocatoria.vue'
import ParticipacionValidaDocs from '@/components/ParticipacionValidaDocs.vue'
import CRUDEmpleados from '@/components/CRUDEmpleados.vue'
//import MaterialChartCard from '@/components/MaterialChartCard.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ingresar',
    component: Ingresar
  },
  {
    path: '/home',
    name: 'Home',
    meta: {requireAdmin: true},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
       children: [
        {
          // Convocatorias will be rendered inside Home's <router-view>
          // when /user/:id/profile is matched
          path: 'convocatorias',
          component: CRUDConvocatorias
        },
        {
          // Peducativos will be rendered inside Home's <router-view>
          // when /user/:id/posts is matched
          path: 'peducativos',
          component: CRUDProgEducativos
        },
         {
          // Requisitos will be rendered inside Home's <router-view>
          // when /user/:id/posts is matched
          path: 'requisitos',
          component: CRUDRequisitos
        },
        {
          path: 'usuarios',
          component: CRUDEmpleados
        },
        {
          path: 'dashboard',
          component: Dashboard
        }
      ]
  },
  {
    path: '/confirmado',
    name: 'Confirmado',
    component: Confirmado
  },
  
   {
    path: '/aspirantes/convocatorias/detalle',
    name: 'ConvocatoriaDetalle',
    component: ConvocatoriaDetalle

  },
   
  
 
    {
    path: '/aspirantes',
    name: 'Aspirantes',
    component: () => import(/* webpackChunkName: "home" */ '../views/Aspirantes.vue'),
       children: [
        
        {
           path: 'convocatorias',           
            component: ListadoConvocatorias
        },
        {
          path: 'misparticipaciones',          
          component: MisConvocatorias
        },
        {
          path: 'participacion/:id',
          name: 'Participacion',
          component: Participacion

         },
        
      ]
  },

    {
    path: '/seguimiento',
    name: 'Seguimiento',
    component: () => import(/* webpackChunkName: "home" */ '../views/Seguimiento.vue'),
       children: [
        
        {
           path: 'dashboard',           
           name: 'DashboardDashboard',
          component: Dashboard
        },
         {
            path: 'convocatoria/:id',
            name: 'AspirantesConvocatoria',
            component: AspirantesConvocatoria

          },
         
          {
            path: 'convocatoria/participacion/:id',
            name: 'ParticipacionValidaDocs',
            component: ParticipacionValidaDocs

          }
               
      ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next ) =>{ 

  console.log(store.state)

      const rutaProtegidaAdmin = to.matched.some(record=> record.meta.requireAdmin)

      if(rutaProtegidaAdmin && store.state.token ===''){
        console.log('no tiene token')
           next({name: 'Ingresar'})
      }else if(rutaProtegidaAdmin && store.state.usuarioDB.authorities[0].authority != 'ADMIN'){
         console.log('no es Admin')
         console.log(store.state.usuarioDB.authorities[0].authority)
            next({name: 'Ingresar'})
      }else if(rutaProtegidaAdmin && store.state.usuarioDB.authorities[0].authority == 'ADMIN'){
        console.log('ES Admin!!')
          next();
      }else{
        console.log('otras rutas')
        next();
      }

});

export default router
