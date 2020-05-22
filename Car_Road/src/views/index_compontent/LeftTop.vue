<template>
  <div class="wrap">
    <BaseWrap name="车路设施">
      <div class="list">
        <ul>
          <li>
            <b>
              路测雷达
              <img src alt />
            </b>
            <p>{{code}}(个)</p>
          </li>
          <li>
            <b>
              路测信控
              <img src alt />
            </b>
            <p>{{code1}}(个)</p>
          </li>
          <li>
            <b>
              路测探头
              <img src alt />
            </b>
            <p>{{code3}}(个)</p>
          </li>
        </ul>
        <ul>
          <li>
            <b>
              车载OBU
              <img src alt />
            </b>
            <p>{{code4}}(个)</p>
          </li>
          <li>
            <b>
              边缘主机
              <img src alt />
            </b>
            <p>{{code5}}(个)</p>
          </li>
          <li>
            <b>
              其他
              <img src alt />
            </b>
            <p>0(个)</p>
          </li>
        </ul>
      </div>
    </BaseWrap>
  </div>
</template>
<script>
import vm from "../../communication";
const BaseWrap = () => import("../../components/BaseWrap");
import * as api from "../../api/api";
export default {
  data() {
    return {
      code: "?",
      code1: "?",
      code2: "?",
      code3: "?",
      code4: "?",
      code5: "?" //边缘主机
    };
  },
  components: {
    BaseWrap
  },
  created() {
    this.getCode()
  },
  mounted() {
    vm.$on('setcode',()=>{
      this.getCode()
    })
  },
  methods: {
    getCode() {
      api.listCar().then(data => {
        this.code = data.data.radar;
        this.code1 = data.data.dicon;
        this.code3 = data.data.camera;
        this.code4 = data.data.car_obu;
        //边缘主机
        this.code5 = data.data.mainframe;
      });
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 22%;
  height: 38%;
  position: absolute;
  top: 10%;
  left: 1px;
  z-index: 1;
}
.list {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  /* border: 1px solid yellow; */
}
ul {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.list ul li {
  /* border:1px solid red; */
  width: 30%;
  background: url("../../assets/ksh39.png");
  height: 100%;
  background-size: contain;
  border-bottom: 1px solid #1380bd;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
}
.list ul li b {
  font-size: 18px;
}
.list ul li p {
  font-size: 28px;
  color: #20dbfd;
  font-weight: 700;
  text-shadow: 0 0 20px #00d8ff;
}


</style>