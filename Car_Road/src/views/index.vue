<template>
  <div class="index2">
    <div class="back" @click="back">车路协同系统</div>
    <!-- 头部 -->
    <Head class="head" :title="title" />
    <!-- 中间 -->
    <main>
      <span class="ani1" v-show="rocket"></span>
      <router-view></router-view>
    </main>
    <!-- 底部 -->
    <Foot />
  </div>
</template>
<script>
import * as api from "../api/api";
const Head = () => import("../components/Head");
const Foot = () => import("../components/Footer");
const yunkong = () => import("./yunkong");
export default {
  name:'index',
  components: {
    Head,
    Foot
  },
  data() {
    return {
      title: "云控平台",
      rocket: false, //动画是否显示
      //解决首次加载页面时返回按钮就出现一次的bug
      isback: false //鼠标是否在网页左侧
    };
  },
  computed: {},
  watch: {},
  beforeRouteEnter(to, from, next) {
    // ...
    next();
  },
  created() {},
  mounted() {
    this.$vm.$on("tit", data => {
      console.log(12);
      this.title = data;
    });
    // this.mouse();
  },
  methods: {
    mouse() {
      let _this = this;
      let fg = false;
      document.onmousemove = e => {
        if (!fg) {
          fg = true;
          setTimeout(() => {
            move(e);
            fg = false;
          }, 50);
        }
      };
      function move(e) {
        var back = document.querySelector(".back");
        if (e.pageX < 10) {
          back.style.top = `${e.pageY - 10}px`;
          back.classList.add("ani");
          back.classList.remove("backani");
          _this.isback = true;
          //控制左侧盒子的移动
          // _this.$vm.$emit('leftmove',true)
        }
        if (_this.isback) {
          if (e.pageX > 100) {
            back.classList.remove("ani");
            back.classList.add("backani");
            // _this.$vm.$emit('leftmove',false)
          }
        }
      }
    },
    back() {
      location.href = "http://119.3.210.185:8999/";
    }
  }
};
</script>
<style scoped>
.index2 {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  position: relative;
}

/* 头部 */
.head {
  height: 8% !important;
}

main {
  flex: 1;
  /* border: 1px solid red  */
}

/* 地图 */
/* 圆点动画 */
.ani1 {
  display: block;
  width: 30px;
  height: 10px;
  border-top-right-radius: 100%;
  border-bottom-right-radius: 100%;
  position: absolute;
  left: 0;
  bottom: 4.5%;
  z-index: 999;
  background: #00d8ff;
  box-shadow: -5px 0 10px #00d8ff, -10px 0 6px white, -20px 0 20px blue,
    -30px 0 20px blue, -40px 0 10px blue, -50px 0 10px blue;
  animation: ani1 10s infinite linear;
}
@keyframes ani1 {
  from {
    transform: rotate(0);
    left: 0;
    bottom: 4.5%;
  }
  25% {
    transform: rotate(0);
    left: 99.1%;
    bottom: 4.5%;
  }
  26% {
    transform: rotate(-90deg);
    left: 99.1%;
    bottom: 4.5%;
  }
  50% {
    transform: rotate(-90deg);
    left: 99.1%;
    bottom: 91.5%;
  }
  51% {
    transform: rotate(-180deg);
    left: 99.1%;
    bottom: 91.5%;
  }
  75% {
    transform: rotate(-180deg);
    left: -15px;
    bottom: 91.5%;
  }
  76% {
    transform: rotate(-270deg);
    left: -15px;
    bottom: 91.5%;
  }
  to {
    transform: rotate(-270deg);
    left: -15px;
    bottom: 4.5%;
  }
}

.back {
  position: absolute;
  width: 100px;
  height: 50px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background: rgba(0, 122, 204, 0.8);
  left: -100px;
  top: 7%;
  z-index: 999;
  cursor: pointer;
  text-align: center;
  color: #00d8ff;
  font-size: 16px;
  line-height: 50px;
}
.back:hover {
  text-decoration: underline;
}
.ani {
  animation: move 0.1s forwards linear;
}
@keyframes move {
  from {
    left: -100px;
  }
  to {
    left: 0;
  }
}
.backani {
  animation: move1 0.2s forwards linear;
}
@keyframes move1 {
  from {
    left: 0;
  }
  to {
    left: -100px;
  }
}
</style>