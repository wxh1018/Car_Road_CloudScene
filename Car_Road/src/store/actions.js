import * as api from '../api/api'
var actions = {
    //获取所有边缘主机
    InquireHost({commit}){
        return api.InquireHost().then(data=>{
            commit('setAllHost',data.data)
            return data
        })
    }
    //查询所有的主机和设备
}
export default actions