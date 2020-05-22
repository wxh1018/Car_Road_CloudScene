import * as api from '../../api/api.js'
var adddevice ={
    state:{
        host:'',
        device:'',
        obu:''
    },
    mutations:{
        sethost(state,v){
            state.host = v
        },
        setdev(state,v){
            state.device = v
        },
        setobu(state,v){
            state.obu = v
        }
    },
    actions:{
        addhost({commit},v){
            return api.sub(v).then(data=>data)
        }
    }
}
export default adddevice