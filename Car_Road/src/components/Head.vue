<template>
  <div class="top">
    <img src="../assets/headmove.gif" alt />
    <div class="tixing_wrap">
      <div class="ani">
        <span>{{title}}</span>
      </div>
      <div class="tixing"></div>
    </div>
    <Time style="left:10px;font-size:16px;bottom:20%" />
	<div class="login">
		登录
	</div>
  <div class="back">
    <a href="http://119.3.210.185:8999/" title="回到车路协同系统">
		返回
    </a>
	</div>
  </div>
</template>
<script>
import time from "./TIme";
export default {
  data() {
    return {
      name: "box"
    };
  },
  components: {
    Time: time
  },
  mounted() {},
  props: ["title"]
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #41a2ff;
  position: relative;
  z-index: 101;
  background: rgba(12, 39, 64);
  position: relative;
  top: 0;
}
img {
  height: 100%;
  width: 97%;
  margin-left: 20px;
}
.top b {
  position: absolute;
  z-index: 1000;
  color: white;
  font-size: 23px;
  top: 28%;
}
.tixing_wrap {
  width: 500px;
  height: 100px;
  position: absolute;
  z-index: 100;
  /* background: skyblue; */
  display: flex;
  justify-content: space-around;
}
.tixing {
  clip-path: polygon(0 0, 100% 0, 70% 100%, 30% 100%, 0 0);
  width: 500px;
  height: 100px;
  background: rgba(6, 20, 54);
  margin: 0 auto;
}
.tixing_wrap .ani {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
}
.tixing_wrap span {
  display: block;
  width: 500px;
  text-align: center;
  color: white;
  font-size: 40px;
  text-shadow: 0 0 10px #00d8ff;
  font-weight: 800;
  padding-top: 10px;
  z-index: 9;
  text-shadow: 1px 1px white;
}


.login, .back{
	position: absolute;
	width: 50px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	border-radius: 5px;
	border: 1px solid #00d8ff;
	right: 80px;
	top: 30%;
	color: white;
	cursor: pointer;
}
.back{
  	right:10px;
}
.back a{
	color: white;

}
</style>