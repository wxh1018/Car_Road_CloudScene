import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.interceptors.response.use((res)=>{
    NProgress.done()
    return res
},(error)=>{
    console.log(error.response);
    // if(error.response.status == 504){
    //     alert('请求失败')
    // }
})
axios.interceptors.request.use((res)=>{
    console.log(1);
    NProgress.start()
    return res
},(erro)=>{
    return Promise.reject(erro)
})
let baseurl = 'http://106.12.111.224:9010'
// let baseurl = '/api'

export const jinweidu = ()=>{
    return axios.get('http://222.186.52.79:8088/StandardApiAction_getDeviceStatus.action?jsession=d405f719-c6cc-458c-868c-014ee8e6f77a&devIdno=13520195337&toMap=2&driver=0&language=zh').then((data)=>data)
}

export let HardwarpService=(code,lng,lat)=>axios.post("http://119.3.210.185:9010/hardware/getRouteInfomation",{
    code:code,
    x:lng,
    y:lat,
})


// Post
export const Post = (url,params)=>{
    return axios.post(`${baseurl}${url}`,params).then(data=>data)
}
// Get
export const Get = (params,url)=>{
    return axios.get(`${baseurl}${url}`,params).then(data=>data)
}