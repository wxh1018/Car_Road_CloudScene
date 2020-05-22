<template>
  <div class="wrap">
    <BaseWrap name="交通预警">
      <div class="Addhost">
        <div>
          <span>设备类型:</span>
          <b>
            <select name id v-model="hostvalue">
              <option :value="item" :key="id" v-for="(item,id) in hostOptions">{{item}}</option>
            </select>
          </b>
        </div>
        <div>
          <span>广播范围:</span>
          <b>
            <select name id v-model="disvalue">
              <option :value="item" :key="id" v-for="(item,id) in distance">{{item}}</option>
            </select>
          </b>
        </div>
        <div style="margin-bottom:0">
          <span>传达信息:</span>
          <b>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          </b>
        </div>
        <ul>
          <li class="color">道路状况</li>
          <li>
            {{road.roadname}}
            <hr />
          </li>
          <li>{{detailroad}}</li>
          <li>{{roadmsg}}</li>
          <li class="color">天气</li>
          <li>{{road.weather}}</li>
        </ul>
        <div class="subbtn">
          <el-button plain @click="btnsure()">开始搜索</el-button>
          <el-button plain @click="btnesc()">停止搜索</el-button>
        </div>
      </div>
    </BaseWrap>
  </div>
</template>
<script>
const BaseWrap = () => import("../../components/BaseWrap");
import vm from "../../communication";
import * as api from "../../api/api";
export default {
  data() {
    return {
      allmsg: "",
      hostOptions: [],
      hostvalue: "", //主机值
      distance: [500, 1000, 1500, 2000],
      disvalue: "",
      textarea: "",
      LongLat: { longItude: 118.8727613217, latItude: 32.028425814 }, //主机的经纬度,
      road: "",
      detailroad: "",
      roadmsg: ""
    };
  },
  watch: {
    hostvalue() {
      this.RoadMsg();
    }
  },
  created() {},
  mounted() {
    // this.gethost();
    this.$vm.$on("gethost", () => {
      console.log("rightbottom收到");
      this.gethost();
    });
    this.disvalue = this.distance[0];
  },
  methods: {
    // 获取主机信息
    gethost() {
      console.log('右下角执行');
      console.log(this.$store.state.AllHost);
      // let 主机加经纬度
      this.allmsg = this.$store.state.AllHost;
      let data = this.$store.state.AllHost;
      let arr = [];
      console.log(data);
      data.forEach(v => {
        arr.push(v.equipmentNum);
      });
      this.hostOptions = arr;
      this.hostvalue = this.hostOptions[0];
    },
    //查询道路信息
    RoadMsg() {
      let obj = this.allmsg.filter(v => v.equipmentNum == this.hostvalue);
      //查询道路情况
      console.log(obj);
      this.LongLat = { longItude: obj[0].longItude, latItude: obj[0].latItude };
      api
        .getRouteInfomation({
          x: this.LongLat.longItude,
          y: this.LongLat.latItude
        })
        .then(data => {
          console.log(data.data);
          if (!data.data.success) {
            this.$notify({
              title: "道路信息查询失败",
              duration: 2000
            });
            return;
          }
          this.$notify({
            title: "道路信息查询成功",
            duration: 2000
          });
          let obj = data.data.data;
          this.road = obj;
          let roadname = data.data.data.roadname;
          this.detailroad = obj.traffic.description;
          this.roadmsg = obj.traffic.evaluation.description;
        });
    },
    btnesc() {
      this.$vm.$emit("stopMove");
    },
    btnsure() {
      vm.$emit("sendvalue", {
        equipmentNum: this.hostvalue,
        distance: this.disvalue,
        road: this.detailroad + this.roadmsg,
        area: this.textarea
      });
    }
  },
  components: {
    BaseWrap
  }
};
</script>
<style scoped>
.wrap {
  width: 22%;
  height: 60%;
  position: absolute;
  top: 33%;
  right: 1px;
  z-index: 1;
}
.Addhost {
  top: 20%;
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-flow: column;
  border-radius: 10px;
  z-index: 99;
  background: rgba(6, 20, 54, 0.8);
  color: white;
  font-size: 24px;
  align-items: center;
  border: 1px solid #1380bd;
  z-index: 2;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 0;
}
.Addhost div {
  width: 100%;
  display: flex;
  /* border: 1px solid red; */
  justify-content: space-around;
  margin-bottom: 20px;
}
.Addhost div span {
  width: 30%;
  display: inline-block;
  white-space: nowrap;
}
b {
  width: 70%;
  display: flex;
  justify-content: center;
}
.Addhost div select {
  width: 100%;
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
ul {
  width: 100%;
  height: 200px;
  border: 1px solid #41a2ff;
  overflow: auto;
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
}
ul::-webkit-scrollbar {
  display: none;
}
ul li {
  line-height: 30px;
}
ul li:nth-child(4) {
  color: yellow;
}
.color {
  color: aqua;
}
</style>