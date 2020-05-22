<template>
  <div class="Addhost moveshow2" v-show="isshow">
    <div>
      <span>设备类型:</span>
      <b>
        <select name id v-model="deviceValue">
          <option :value="item" :key="id" v-for="(item,id) in deviceOptions">{{item}}</option>
        </select>
      </b>
    </div>
    <div>
      <span>选择主机:</span>
      <b>
        <select name id v-model="hostvalue">
          <option :value="item" :key="id" v-for="(item,id) in hostOptions">{{item}}</option>
        </select>
      </b>
    </div>
    <div class="address">
      <span>接入地址:</span>
      <b>
        <input v-model="address" type="text" />
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
import * as api from "../../api/api";
export default {
  data() {
    return {
      isshow: false,
      deviceOptions: ["路测探头", "路测雷达", "路测信控", "路测其他"],
      deviceValue: "", //设备值
      hostOptions: [],
      hostvalue: "", //主机值
      address: ""
    };
  },
  created() {},
  mounted() {
    this.deviceValue = this.deviceOptions[0];
    vm.$on("ctrldevice", () => {
      this.change();
    });
    vm.$on("ctrl12", () => {
      this.isshow = false;
    });
    vm.$on("ctrl23", () => {
      this.isshow = false;
    });
    this.$vm.$on("gethost", () => {
      console.log('AddDevice收到');
      this.gethost();
    });
    // this.gethost();
  },
  methods: {
    //获取主机
    gethost() {
      let data = this.$store.state.AllHost;
      let arr = [];
      data.forEach(v => {
        arr.push(v.equipmentNum);
      });
      this.hostOptions = arr;
      this.hostvalue = this.hostOptions[0];
    },
    change() {
      this.isshow = !this.isshow;
      if (this.isshow) {
        this.$store.commit("setdev", true);
      } else {
        this.$store.commit("setdev", false);
      }
    },
    btnesc() {
      this.address = "";
      this.isshow = !this.isshow;
    },
    btnsure() {
      if (this.address == "") {
        this.$message.error("请输入接入地址！！！");
        return;
      }
      this.tardevice();
    },

    tardevice() {
      //当前主机的设备
      let host = this.hostvalue;
      api.getHostDevice({ equipmentNum: host }).then(data => {
        let dev = [];
        data.data.forEach(v => {
          dev.push(v.deviceType);
        });
        let fg = dev.some(v => v == this.deviceValue);
        if (dev.length >= 3) {
          this.$message.error("该主机已添加所有设备");
          return;
        }
        if (fg) {
          this.$message.error("该设备已添加，请选择其他设备");
        } else {
          this.add();
        }
      });
    },
    add() {
      let host = this.hostvalue;
      let data = this.$store.state.AllHost;
      let tardata = data.filter(v => v.equipmentNum == host);
      console.log(tardata[0]);
      
      let [
        level_id,
        equipment_num,
        long_itude,
        lat_itude,
        address,
        device_type,
        communication,
        level
      ] = [
        1,
        this.hostvalue,
        tardata[0].longItude,
        tardata[0].latItude,
        tardata[0].address,
        this.deviceValue,
        tardata[0].communication,
        2
      ];

      let params = {
        level_id,
        equipment_num,
        long_itude,
        lat_itude,
        address,
        device_type,
        communication,
        level
      };
      api.sub(params).then(data => {
        console.log(data);
        if (data.data.success) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.btnesc();
          this.$store.dispatch("InquireHost")//再次查询主机设备
          vm.$emit('setcode')
          vm.$emit('getall')
        } else {
          this.$message({
            message: "提交失败请稍后再试",
            type: "error"
          });
        }
      });
    }
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
b {
  width: 70%;
  display: flex;
  justify-content: center;
}
div select {
  width: 80%;
  height: 30px;
  border-radius: 5px;
}
option {
  text-align: center;
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

.address input {
  width: 80%;
  height: 30px;
  border: none;
  border-radius: 5px;
}
</style>