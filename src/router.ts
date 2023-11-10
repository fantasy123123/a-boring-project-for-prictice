import {createRouter,createWebHashHistory} from "vue-router";
import QRCodeSignIn from './components/QRCodeSignIn.vue'
import signIn from './components/signIn.vue'
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/QRCodeSignIn',
            component:QRCodeSignIn
        },
        {
          path:'/signIn' ,
          component:  signIn,
        },
        {
            path:'/',
            redirect:'/signIn'
        }
    ]
});

export default router;