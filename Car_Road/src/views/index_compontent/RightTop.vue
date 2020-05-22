<template>
  <div class="wrap">
    <BaseWrap name="设备添加">
      <ul class="list">
        <!-- 边缘主机 -->
        <li @click="host">
          <img src="../../assets/bianyuan.png" />
        </li>
        <!-- 路测设施 -->
        <li @click="open2">
          <img src="../../assets/luce.png" alt />
        </li>
        <!-- 车载OBU -->
        <li @click="open3">
          <img src="../../assets/OBU.png" alt />
        </li>
      </ul>
    </BaseWrap>
  </div>
</template>
<script>
const BaseWrap = () => import("../../components/BaseWrap");
import vm from "../../communication";
export default {
  data() {
    return {
      isshow: false, //边缘主机
      isshow2: false, //路测设施
      isshow3: false //车载OBU
    };
  },
  components: {
    BaseWrap
  },
  methods: {
    host() {
      vm.$emit("ctrlhost");
      vm.$emit("ctrl23");
    },
    open2() {
      vm.$emit("ctrldevice");
      vm.$emit("ctrl13");
    },
    open3() {
      vm.$emit("ctrlobu");
      vm.$emit("ctrl12");
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 22%;
  height: 22%;
  position: absolute;
  top: 10%;
  right: 0;
  z-index: 1;
}
.list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.list li {
  width: 30%;
  height: 80%;
  /* border: 1px solid red; */
  background-size: contain;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.list li img {
  width: 100%;
  border-radius: 5px;
  box-shadow: -1px -1px 10px blue;
}
.list li img:hover {
  box-shadow: 0 0 30px #41a2ff;
  margin-top: -10px;
}
</style>