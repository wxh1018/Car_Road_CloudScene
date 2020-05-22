<template>
  <div style="height:100%">
    <div id="allmap"></div>
    <LeftTop  :class="{a:isa}" />
    <RightTop/>
    <RightBottom/>
    <Back :class="{ba:isb}"  />
  </div>
</template>
<script>
var map = null;
const Back = () => import("./drive_components/Backindex");
const LeftTop = () => import("./drive_components/LeftTop");
const RightTop = ()=>import('./drive_components/RightTop');
const RightBottom = ()=>import('./drive_components/RightBottom')
export default {
  name:'Drive',
  data() {
    return {
      po: { Q: 118, P: 32 },
      speed: 1,
      isa:false,
      isb:false
    };
  },
  components: {
    Back,
    LeftTop,
    RightTop,
    RightBottom
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$vm.$emit("tit", to.meta.title);
    next();
  },
  mounted() {
    this.creatmap();
    console.log(this.$route.params.data);
    let lnglat = this.$route.params.data;
    this.po = lnglat;
    this.carmove()
    // setInterval(()=>{
    map.setCenter([this.po.Q, this.po.P]);
    // },1000)
    //控制左侧的盒子移动
    this.$vm.$on('leftmove',(fg)=>{
      this.isa = fg
      this.isb = fg
    })
  },
  methods: {
    creatmap() {
      map = new AMap.Map("allmap", {
        center: [118.86618508180999, 32.022768141332],
        zooms: [6, 18],
        zoom: 16,
        dragEnable: false,
        mapStyle: "amap://styles/2e6afbd914a6e62acc0112b25c51897b"
      });
      //   map.setCenter([118, 32]);
    },
    carmove() {
      var car = new AMap.Circle({
        center: [this.po.Q, this.po.P],
        radius: 20, //半径
        borderWeight: 3,
        strokeColor: "#fff",
        strokeOpacity: 0,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.8,
        strokeStyle: "dashed",
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: "#eb4d4b",
        zIndex: 100
      });
      map.add(car);
      let n = 0;
      var speed = this.speed;
      // clearInterval(timer1);
      var timer1 = setInterval(() => {
        ac();
      }, 50);
      function ac() {
        n += speed;
        car.setRadius(n);
        if (car.getRadius() >= 30) {
          n = 10;
          car.setRadius(n);
        }
      }
    }
  }
};
</script>
<style scoped>
#allmap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.a{
  /* left: 100px!important; */
   animation: move 0.2s forwards linear;
}
@keyframes move {
  from {
    left: 0;
  }
  to {
    left: 100px;
  }
}
.ba{
   animation: moveback 0.2s forwards linear;
}
@keyframes moveback{
  from{left: 0}
  to{left: -50px}
}
</style>