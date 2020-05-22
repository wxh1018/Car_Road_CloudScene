import * as Api from './index'
import axios from 'axios'
// 查询全部边缘主机信息
export const InquireHost = (params) => {
   return Api.Post('/cloud/getRoad', params)
}

// 路测设备添加兼边缘主机提交
export const sub = (params) => Api.Post('/cloud/addCarTest', params)

// 车载OBU添加
export const addOBU = (params) => Api.Post('/cloud/addCarObu', params)

// 路测设施量
export const listCar = (params) => {
   return Api.Post('/cloud/CarRoadCount', params)
}

// 路测设备展示
export const deviceShow = (params) => Api.Post('/cloud/listCarTest', params)

// 本坐标附近天气和道路拥堵状况
export const getRouteInfomation = (params) => Api.Post('/hardware/getRouteInfomation', params)

//根据主机查询设备
export const getHostDevice = (params) => Api.Post('/cloud/selDev', params)

// export const test = (params) => {
//    return axios.post('http://192.168.100.155:8080/smart-roads/user/login.action')
// }
// export const kua = ()=>{
//    return axios.post('https://www.jszc-investigate.com:9011/Home/SearchProData').then(data=>data)
// }