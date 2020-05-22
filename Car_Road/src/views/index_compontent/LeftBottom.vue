<template>
  <div class="wrap">
    <BaseWrap name="地图鹰眼">
      <div id="map1"></div>
    </BaseWrap>
  </div>
</template>
<script>
// const BaseWrap = () => import("../../components/BaseWrap");
import BaseWrap from "../../components/BaseWrap";
var map1 = null;
var car = null;
export default {
  data() {
    return {
      jieliu: true,
      speed: 1,
      carCreat: false
    };
  },
  props: ["mapcenter", "mapzoom"],
  components: {
    BaseWrap
  },
  watch: {
    mapcenter() {
      if (this.jieliu) {
        this.jieliu = false;
        setTimeout(() => {
          this.setCenter();
          this.carmove();
          this.jieliu = true;
        }, 50);
      }
    }
  },
  mounted() {
    this.map();
    this.carCreat = false
  },
  methods: {
    map() {
      map1 = new AMap.Map("map1", {
        center: [118.8727613217, 32.028425814],
        zoom: 18,
        // mapStyle: "amap://styles/2e6afbd914a6e62acc0112b25c51897b"
         layers: [
            // 卫星
           new AMap.TileLayer.Satellite(),
            // 路网
           new AMap.TileLayer.RoadNet()
        ],
      });
      var mapOpts = {
        showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
        resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
        dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
        keyboardEnable: false, //地图是否可通过键盘控制，默认为true
        doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
        zoomEnable: true, //地图是否可缩放，默认值为true
        rotateEnable: false // 地图是否可旋转，3D视图默认为true，2D视图默认false
      };
      map1.setStatus(mapOpts);
    },
    setCenter() {
      map1.panTo([this.mapcenter.Q, this.mapcenter.P]);
      map1.setZoom(this.mapzoom + 2);
      // map1.setCenter([this.mapcenter.Q,this.mapcenter.P])
    },
    carmove() {
      let _this = this
      if (!this.carCreat) {
        car = new AMap.Circle({
          center: [this.mapcenter.Q, this.mapcenter.P],
          radius: 10, //半径
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
        map1.add(car);
        this.carCreat = true;
        move()
        console.log(1);
      }
      car.setCenter([this.mapcenter.Q, this.mapcenter.P]);
      function move() {
        let n = 0;
        var speed = _this.speed;
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
  }
};
</script>
<style scoped>
.wrap {
  width: 22%;
  height: 42%;
  position: absolute;
  top: 50%;
  left: 1px;
  z-index: 1;
}
#map1 {
  width: 100%;
  height: 100%;
  border: 1px solid #41a2ff;
}
</style>