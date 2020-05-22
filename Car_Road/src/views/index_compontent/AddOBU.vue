<template>
  <div class="Addhost moveshow3" v-show="isshow">
    <div>
      <span>设备名称：</span>
      <b>
        <input v-model="device_name" type="text" />
      </b>
    </div>
    <div>
      <span>设备编号:</span>
      <b>
        <input v-model="device_id" type="text" />
      </b>
    </div>
    <div>
      <span>入网号:</span>
      <b>
        <input v-model="net_id" type="text" />
      </b>
    </div>
    <div>
      <span>联系方式:</span>
      <b>
        <input v-model="phone" type="phone" />
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
import * as api from '../../api/api'
export default {
  data() {
    return {
      isshow: false,
      device_name: "",
      device_id: "",
      net_id: "",
      phone: ""
    };
  },
  mounted() {
    vm.$on("ctrlobu", () => {
      this.change();
    });
    vm.$on("ctrl13", () => {
      this.isshow = false;
    });
    vm.$on("ctrl23", () => {
      this.isshow = false;
    });
  },
  methods: {
    change() {
      this.isshow = !this.isshow;
      if (this.isshow) {
        this.$store.commit("setobu", true);
      } else {
        this.$store.commit("setobu", false);
      }
    },
    btnesc() {
      this.isshow = !this.isshow;
      this.device_name = this.device_id = this.net_id = this.phone = "";
    },
    btnsure() {
      if (
        this.device_name == "" ||
        this.device_id == "" ||
        this.net_id == "" ||
        this.phone == ""
      ) {
        this.$message.error("全部为必填项");
        return;
      }
      this.add();
    },
    add() {
      let _this = this;
      let device_name = this.device_name;
      let dev_num = this.device_id;
      let the_net = this.net_id;
      let phone = this.phone;
      api.addOBU({ device_name, dev_num, the_net, phone }).then(data => {
        console.log(data);
        if (data.data.success) {
            vm.$emit('setcode')
            vm.$emit('getall')
          // _this.warntip(data.data.msg)
          _this.$message({
            message: "提交成功",
            type: "success"
          });
          // 添加成功初始化
          _this.btnesc()
        } else {
          _this.$message.error('提交失败请重试')
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
}
b {
  width: 70%;
  display: flex;
  justify-content: center;
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
input {
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 5px;
}
</style>