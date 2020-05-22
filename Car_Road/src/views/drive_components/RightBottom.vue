<template>
  <div class="wrap_right">
    <Wrap name="传感器状态">
					<div class="indexrightbox">
      <ul>
        <li>
          <ol>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>PCAN</b>
            </li>
            <li>
              <div class="dotq"></div>
              <div class="pulseq"></div>
              <div class="pulse1q"></div>
              <b>ICAN</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>BCAN</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>APA</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>VZX</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>LPS</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>ESP</b>
            </li>
            <li>
              <div class="dotq"></div>
              <div class="pulseq"></div>
              <div class="pulse1q"></div>
              <b>APA</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>Yamrab</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>Traxker</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>Racam</b>
            </li>
            <li>
              <div class="dot"></div>
              <div class="pulse"></div>
              <div class="pulse1"></div>
              <b>ARA</b>
            </li>
          </ol>
        </li>
      </ul>
      </div>
    </Wrap>
  </div>
</template>
<script>
const Wrap = () => import("../../components/BaseWrap");
export default {
  name:'RightBottom',
  data() {
    return {};
  },
  components: {
    Wrap
  }
};
</script>
<style scoped>
.wrap_right {
  width: 22%;
  height: 38%;
  position: absolute;
  top: 50%;
  right: -1px;
  z-index: 1;
}
.indexrightbox{
	width: 100%;
	height: 100%;
}
.indexrightbox ul{
	width: 100%;
	height: 100%;
}
.indexrightbox ul li{
	width: 100%;
	height: 48%;
	margin-top: 10px;
	position: relative;
}
.myChartbox{
	width: 100%;
	height: 15%;
	position: absolute;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
	color: white;
}
.indexrightbox ol{
	width: 100%;
	height: 100%;
}
.indexrightbox ol li{
	width: 25%;
	height: 50%;
	float: left;	
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
  margin-bottom: 30px
}
/* 动画 */
@keyframes warn {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.4);
    -webkit-transform: scale(0.4);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}
@keyframes warn1 {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0;
  }
}
/* 保持大小不变的小圆点 */
.dot {
  position: absolute;
  width: 20px;
  height: 20px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border: 1px solid #8fc3d4;
  border-radius: 50%;
  background-color: #bfd6dd; /* 实心圆 ，如果没有这个就是一个小圆圈 */
  z-index: 2;
}
/* 产生动画（向外扩散变大）的圆圈 第一个圆 */
.pulse {
  position: absolute;
  width: 50px;
  height: 50px;
  /* left: 120px; */
  /* top: 120px; */
  border: 1px solid #fff;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn 2s ease-out;
  -moz-animation: warn 2s ease-out;
  animation: warn 2s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #fff; /* 阴影效果 */
}
/* 产生动画（向外扩散变大）的圆圈 第二个圆 */
.pulse1 {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn1 2s ease-out;
  -moz-animation: warn1 2s ease-out;
  animation: warn1 2s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #3399ff; /* 阴影效果 */
}

/* 修改后动画 */
/* 保持大小不变的小圆点 */
.dotq {
  position: absolute;
  width: 20px;
  height: 20px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border: 1px solid #bd6b6b;
  border-radius: 50%;
  background-color: #aa3c3c; /* 实心圆 ，如果没有这个就是一个小圆圈 */
  z-index: 2;
}
/* 产生动画（向外扩散变大）的圆圈 第一个圆 */
.pulseq {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid #b11e1e;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn 2s ease-out;
  -moz-animation: warn 2s ease-out;
  animation: warn 2s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #b11e1e; /* 阴影效果 */
}
/* 产生动画（向外扩散变大）的圆圈 第二个圆 */
.pulse1q {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid #b11e1e;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn1 2s ease-out;
  -moz-animation: warn1 2s ease-out;
  animation: warn1 2s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  box-shadow: 1px 1px 30px #b11e1e; /* 阴影效果 */
}
.indexrightbox ol li b {
  position: absolute;
  z-index: 100;
  bottom: 0;
  color: #8fc3d4;
}
.ollibottom {
  width: 100%;
  height: 25%;
  position: absolute;
  bottom: 0;
}
.ollibottom b {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
#logOutTime {
  background: none;
  border: 0;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10%;
}
.InfoWindow {
  z-index: 99999;
  width: 90%;
  margin: 0 auto;
  height: 220px;
  background: #fff;
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  position: static;
}
.el-tabs__item {
  color: white;
}
.InfoWindow::-webkit-scrollbar {
  display: none;
}
</style>