import axios from "axios"

axios.defaults.baseURL="";
axios.defaults.timeout=3000;

//请求之前
axios.interceptors.request.use(config=>{
    let token=localStorage.getItem("token")?localStorage.getItem("token"):"";
    config.headers.Authorization=token;
    return config;
})
//响应之前
axios.interceptors.response.use(response=>{
    return response.data
},error=>{
    return Promise.reject(error);
})
//
function get(url,params={}){
    return new Promise((res,rej)=>{
        axios({
            url,
            method:"get",
            params
        }).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
    })
}
function post(url,data={}){
    return new Promise((res,rej)=>{
        axios({
            url,
            method:"post",
            data
        }).then(data=>{
            res(data)
        }).catch(err=>{
            rej(err)
        })
    })
}
export default {
    get,
    post
}