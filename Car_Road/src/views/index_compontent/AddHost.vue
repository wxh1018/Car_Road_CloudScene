<template>
  <div class="Addhost moveshow" v-show="isshow">
    <div>
      <span>设备编号:</span>
      <p>{{mark1}}</p>
    </div>
    <div>
      <span>位置坐标:</span>
      <p @click="mapshow" :class="{color:true}">{{content}}</p>
    </div>
    <div>
      <span>通讯方式:</span>
      <b>
        <select name id v-model="CommunicationType">
            <option :value="item" :key="id" v-for="(item,id) in ComOptions">{{item}}</option>
        </select>
      </b>
    </div>
    <div class="subbtn">
      <el-button plain @click="btnesc()">取消</el-button>
      <el-button plain @click="btnsure()">添加</el-button>
    </div>
  </div>
</template>
<script>
import vm from "../../communication";
export default {
  data() {
    return {
        isshow: false,
        mark1: "",//设备编码
        ComOptions:['4G','wifi','C-V2X','DSRC'],
        content:'点此选择坐标',
        CommunicationType:"",//通信方式
        Posi:''
    };
  },
  mounted() {
      this.CommunicationType = this.ComOptions[0]
    vm.$on("ctrlhost", () => {
      this.change();
    });
    vm.$on("ctrl13", () => {
      this.isshow = false;
    });
    vm.$on("ctrl12", () => {
      this.isshow = false;
    });
    //接收坐标
    vm.$on('send',(data)=>{
        this.content = `${data.lng},${data.lat}`
        this.Posi = data
    })
  },
  methods: {
    change() {
      this.isshow = !this.isshow;
      if (this.isshow) {
        this.mark();
        this.$store.commit("sethost", true);
      } else {
        this.$store.commit("sethost", false);
      }
    },
    mark() {
      //主机编号
      function random(n) {
        let num = "";
        for (let i = 0; i < n; i++) {
          let ran = parseInt(Math.random() * 10);
          num += ran;
        }
        return num;
      }
      this.mark1 = "NLGLC" + random(8);
    },
    //地图选点
    mapshow(){
        this.$router.push('/mapposition')
    },
    btnesc(){
      this.isshow = !this.isshow;
      this.content = '点此选择坐标'
    },
    btnsure(){
        if(this.content == '点此选择坐标'){
            this.$message({
                message:'请选择坐标',
                type:'error'
            })
            return 
        }

        
        let [level_id,equipment_num,long_itude,lat_itude,device_type,communication, level] = [1,this.mark1,this.Posi.lng,this.Posi.lat,'边缘主机',this.CommunicationType,1]
        
        let params = {level_id,equipment_num,long_itude,lat_itude,device_type,communication, level}
        this.$store.dispatch('addhost',params).then((data)=>{
            if(data.status == 200){
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
                // this.getcode()//调用接口
                vm.$emit('setcode')
                vm.$emit('getall')
                this.$store.dispatch("InquireHost")//刷新主机
                //再获取主机
                vm.$emit('gethost')
                this.btnesc()
            }else{
                this.$message.error('提交失败');
            }
        })
    },
  }
};
</script>
<style scoped>
.Addhost {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 25%;
  min-height: 100px;
  display: flex;
  flex-flow: column;
  border-radius: 10px;
  z-index: 99;
  margin-left: -15%;
  background: rgba(6, 20, 54, 0.8);
  color: white;
  font-size: 24px;
  align-items: center;
  padding: 20px 0;
  border: 1px solid #1380bd;
  z-index: 2;
}
div {
  width: 80%;
  display: flex;
  /* border: 1px solid red; */
  justify-content: space-around;
  margin-bottom: 20px;
}
div span {
  width: 30%;
  display: inline-block;
  white-space: nowrap;
  text-align: center;
}
div p {
  width: 70%;
  height: 30px;
  border-radius: 5px;
  border: none;
  /* padding-left: 30%; */
  text-align: center;
}
b {
  width: 70%;
  display: flex;
  justify-content: center
}
div select{
    width: 70%;
    height: 30px;
    border-radius: 5px;
    padding-left: 30%;
}
option{
    text-align: center
}
.subbtn {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px !important;
  margin-bottom: 0;
}
.subbtn button {
  height: 40px;
  margin: 0 30px;
  width: 50%;
  border-radius: 5px;
  border: none;
  font-size: 16px;
}
.color{
  color: aqua;
  cursor: pointer;
  
}
</style>