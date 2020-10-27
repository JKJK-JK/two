import Vue from "vue"
import Vuex from "vuex"
import http from "./../utils/http"
import router from "./../router"
import {Message} from "./../router"
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token:localStorage.getItem("token")?localStorage.getItem("token"):"",
        info:localStorage.getItem("info")?JSON.parse(localStorage.getItem("info")):{},
    },
    mutations:{  
        setInfo(state,payload){
            localStorage.setItem("token",payload.token);
            localStorage.setItem("info",JSON.stringify(payload.info));
            state.token = payload.token;
            state.info = payload.info;
        },
        clearInfo(state,payload){
            localStorage.clear();
            state.token="";
            state.info={};
        }
    },
    actions:{
        userLogin(context,payload){
            // this.$api.USERLOGIN
            http.post("/api/userlogin",payload).then(res=>{
                if(res.code==200){
                    context.commit("setInfo",{token:res.list.token,info:res.list});
                    router.replace("/index")
                }else{
                    Message.error(res.msg)
                }
            })
        }
    }
})