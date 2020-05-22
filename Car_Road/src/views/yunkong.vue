<template>
  <div class="yunkong">
    <LeftTop :class="{a:isa}" />
    <LeftBottom :class="{a:isa}" :mapcenter="mapcenter" :mapzoom="mapzoom" ref="setCenter" />
    <RightTop />
    <RightBottom />
    <div id="allmap"></div>
    <!-- 边缘主机添加 -->
    <AddHost />
    <AddDevice />
    <AddOBU />
    <router-view />
  </div>
</template>
<script>
const LeftTop = () => import("./index_compontent/LeftTop"); //车路设施
const LeftBottom = () => import("./index_compontent/LeftBottom"); //小地图
const RightTop = () => import("./index_compontent/RightTop"); //路测添加
// const RightBottom = () => import("./index_compontent/RightBottom");
import RightBottom from './index_compontent/RightBottom' //预警信息
const AddHost = () => import("./index_compontent/AddHost");
// const AddDevice = () => import("./index_compontent/AddDevice");
import AddDevice from './index_compontent/AddDevice'
const AddOBU = () => import("./index_compontent/AddOBU");
import * as api from "../api/api";
import vm from "../communication";
var map = null;
var search = null;
var timer = null;
var r = "";
var markers1 = [];
var marksers1time = null  //消息显示计时器
export default {
  data() {
    return {
      isa:false,
      mapcenter: "",
      mapzoom: "",
      bianyuan: require("../assets/杆管线1.png"), //边缘主机
      img2: require("../assets/tantou.png"), //探头
      img3: require("../assets/雷达.png"), //雷达
      img4: require("../assets/xinkong.png"), //信控
      img5: require("../assets/杆管线1.png"), //边缘主机
      carimg: require("../assets/car.png"),
      msgOk: require("../assets/ok.png"), //收到
      //各各设备数据
      Host: [],
      tantou: [],
      leida: [],
      xinkong: [],
      qita: [],
      // 搜索动画是否搜索
      ismove: false,
      //搜索的距离
      searchDistance: "",
      // 创建车辆
      cars: [
        { lng: 118.864015, lat: 32.029299 },
        { lng: 118.849904, lat: 32.017496 },
        { lng: 118.864393, lat: 32.015491 },
        { lng: 118.848819, lat: 32.029067 },
        { lng: 118.875529, lat: 32.029099 }
      ],
      // 搜索状态
      search_msg: { speed: 6, bg: "#1B9CFC" },
      //当前主机搜索的坐标
      SearchHost: "", //{lng:,lat:}
      // 搜到的消息
      msg: "",
      success: false, //接口请求成功
      isremove: false //信息载体是否移除
    };
  },
  components: {
    LeftTop,
    LeftBottom,
    RightTop,
    RightBottom,
    AddHost,
    AddDevice,
    AddOBU,

    changed: true
  },
  created() {
    setTimeout(() => {
      if (this.changed) {
        this.getAll();
      }
    }, 3000);
  },
  watch: {},

  mounted() {
    // 加载地图
    this.map();
    this.getAll()
    // this.getAll();
    this.car();
    vm.$on("getall", () => {
      this.getAll();
    });
    //接收搜索的条件
    vm.$on("sendvalue", data => {
      // console.log(data);
      this.msg = data;
      this.searchDistance = data.distance;
      this.$message.success("正在搜索中");
      this.move(data);
      this.car_recive(); //找到的车量接收消息
    });
    this.$vm.$on("stopMove", () => {
      this.movestop();
    });
    setTimeout(() => {
      if (!this.success) {
        console.log("第一次请求失败，进行第二次");
        // this.$store.dispatch("InquireHost");
        this.getAll()
      }
    }, 3000);
    //控制左侧的盒子移动
    this.$vm.$on('leftmove',(fg)=>{
      this.isa = fg
    })
  },
  watch: {},
  beforeDestroy() {
    vm.$off("sendvalue");
  },
  methods: {
    // 获取所有设备
    getAll() {
      this.$store.dispatch("InquireHost").then(res => {
        let Host = [];
        let tantou = [];
        let leida = [];
        let xinkong = [];
        let qita = [];
        this.$vm.$emit("gethost");
        console.log("接口请求成功");

        res.data.forEach(v => {
          //接口请求成功后
          this.success = true;
          // let arr1 = this.$basejs.baidu(v.longItude, v.latItude);
          Host.push({
            equipmentNum: v.equipmentNum,
            longItude: v.longItude,
            latItude: v.latItude
          });
        });
        this.Host = Host;
        let n = 0;
        res.data.forEach(v => {
          api.getHostDevice({ equipmentNum: v.equipmentNum }).then(data => {
            n++;
            let arr = [];
            // let arr1 = this.$basejs.baidu(v.longItude, v.latItude);
            data.data.forEach(v => {
              arr.push({
                equipmentNum: v.equipmentNum,
                deviceType: v.deviceType,
                longItude: v.longItude,
                latItude: v.latItude
              });
            });
            this.changed = false;
            arr.forEach(v => {
              if (v.deviceType == "路测探头") {
                tantou.push(v);
              }
              if (v.deviceType == "路测雷达") {
                leida.push(v);
              }
              if (v.deviceType == "路测信控") {
                xinkong.push(v);
              }
              if (v.deviceType == "路测其他") {
                qita.push(v);
              }
            });
            if (n == res.data.length) {
              this.tantou = tantou;
              this.leida = leida;
              this.xinkong = xinkong;
              this.qita = qita;
              this.creatHost();
              this.creatLeida();
              this.creatTantou();
              this.creatXinkong();
            }
          });
        });
      });
    },
    cl() {
      this.title = "驾驶看板";
      this.$router.push("/index");
    },
    //地图创建
    map() {
      let _this = this;
      map = new AMap.Map("allmap", {
        center: [118.86618508180999, 32.022768141332],
        zooms: [6, 18],
        zoom: 15,
        mapStyle: "amap://styles/2e6afbd914a6e62acc0112b25c51897b",
        resizeEnable: false
      });
      function mapMove() {
        var zoom = map.getZoom();
        var center = map.getCenter(); //获取当前地图中心点
        _this.mapcenter = center;
        _this.mapzoom = zoom;
      }
      map.on("mapmove", mapMove);
      // map.setFitView();
      var baidu = [118.86618508180999, 32.022768141332];
      AMap.convertFrom(baidu, "baidu", function(status, result) {
        if (result.info === "ok") {
          var lnglats = result.locations; // Array.<LngLat>
          console.log(lnglats);
        }
      });
    },

    //主机
    creatHost() {
      let arr = this.Host;
      var img = this.bianyuan;
      var size = [40, 60];
      var offset = [-20, -20];
      this.base(arr, img, size, offset);
    },
    // 雷达
    creatLeida() {
      let arr = this.leida;
      var img = this.img3;
      var size = [20, 20];
      var offset = [8, -12];
      this.base(arr, img, size, offset);
    },
    //探头
    creatTantou() {
      let arr = this.tantou;
      var img = this.img2;
      var size = [20, 20];
      var offset = [-30, -10];
      this.base(arr, img, size, offset);
    },
    //信控
    creatXinkong() {
      let arr = this.xinkong;
      var img = this.img4;
      var size = [20, 20];
      var offset = [-10, -30];

      this.base(arr, img, size, offset);
    },
    base(arr, img, size, offset) {
      //创建一个icon
      offset = offset || [-13, 20];
      var hosticon = new AMap.Icon({
        size: new AMap.Size(size[0], size[1]),
        image: img,
        imageSize: new AMap.Size(size[0], size[1]),
        bubble: true
      });
      var markers = [];
      for (let i = 0; i < arr.length; i++) {
        var marker = new AMap.Marker({
          position: new AMap.LngLat(arr[i].longItude, arr[i].latItude),
          icon: hosticon,
          offset: new AMap.Pixel(offset[0], offset[1]),
          bubble: true
        });
        markers.push(marker);
      }
      var overlayGroups = new AMap.OverlayGroup(markers);
      map.add(overlayGroups);
      overlayGroups.on("click", function(e) {
        console.log(e);
      });
    },
    //开始搜索
    move(data) {
      this.isremove ? map.remove(markers1) : 1; //判断信息是否显示
      if(this.isremove){
        clearTimeout(marksers1time)
      }
      let _this = this;
      let obj = this.Host.filter(v => v.equipmentNum == data.equipmentNum);

      let lng = obj[0].longItude;
      let lat = obj[0].latItude;
      this.SearchHost = { lng, lat };
      r = data.distance;
      let road = data.road;
      let msg = data.area;
      if (this.ismove) {
        //已经创建过了
        console.log(lng, lat);
        search.setCenter([lng, lat]);
        this.movestop();
      }
      this.ismove = true;

      //创建动画
      search = new AMap.Circle({
        center: [lng, lat],
        radius: 0, //半径
        borderWeight: 3,
        strokeColor: "#fff",
        strokeWeight: 1,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: "dashed",
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: _this.search_msg.bg,
        zIndex: 50
      });

      let speed = _this.search_msg.speed;
      map.add(search);
      // 缩放地图到合适的视野级别
      map.setFitView([search]);
      let n = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        ac();
      }, 10);
      function ac() {
        n += speed;
        search.setRadius(n);
        // console.log(circle.getRadius());
        if (search.getRadius() >= r) {
          // console.log(circle.contains([118.8727613217, 32.028425814]));
          n = 0;
          search.setRadius(n);
          // ac();
        }
      }
    },
    //停止搜索
    movestop() {
      //判断是否正在搜索
      this.ismove ? map.remove(search) : 1;
      clearInterval(timer);
      if (this.isremove) {
        //停止如果搜到信息还在显示  则消失
        map.remove(markers1);
        clearTimeout(marksers1time)
      }
    },
    //车辆动画
    car() {
      let _this = this;
      var r = 50; //半径
      var dis = 2; //扩散速度
      function mapMove() {
        var zoom = map.getZoom();
        if (zoom >= 17) {
          r = 25;
          dis = 1;
        } else if (zoom >= 15) {
          r = 50;
          dis = 1;
        } else if (zoom >= 13) {
          r = 100;
          dis = 5;
        }
      }
      map.on("mapmove", mapMove);
      this.cars.forEach(v => {
        var car = new AMap.Circle({
          center: [v.lng, v.lat],
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
        car.on("click", function(event) {
          console.log(event.lnglat);
          _this.$router.push({ name: "drive", params: { data: event.lnglat } });
          _this.$vm.$emit("tit", "车路协同驾驶看板");
        });
        let n = 0;
        clearInterval(timer1);
        var timer1 = setInterval(() => {
          ac();
        }, 50);
        function ac() {
          n += dis;
          car.setRadius(n);
          if (car.getRadius() >= r) {
            n = 10;
            car.setRadius(n);
          }
        }
      });
    },
    // 接收消息
    car_recive() {
      markers1 = [];
      function GetDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = (lat1 * Math.PI) / 180.0;
        var radLat2 = (lat2 * Math.PI) / 180.0;
        var a = radLat1 - radLat2;
        var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
        var s =
          2 *
          Math.asin(
            Math.sqrt(
              Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) *
                  Math.cos(radLat2) *
                  Math.pow(Math.sin(b / 2), 2)
            )
          );
        s = s * 6378.137; // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s * 1000; //单位米
      }
      let lng = this.SearchHost.lng;
      let lat = this.SearchHost.lat;
      let obj = this.cars.filter(v => {
        return this.searchDistance >= GetDistance(v.lat, v.lng, lat, lng);
      });
      //搜索到的车辆信息
      console.log(obj);
      var lnglats = [];
      obj.forEach(v => {
        lnglats.push([v.lng, v.lat]);
      });
      if (lnglats.length == 0) {
        clearTimeout(no);
        let no = setTimeout(() => {
          this.$message({
            message: "附近暂时没有车辆，请扩大搜索范围",
            type: "error",
            duration: 5000
          });
        }, 3000);
      } else {
        setTimeout(() => {
          this.$message({
            message: "发现车辆",
            type: "success",
            duration: 5000
          });
          var markerContent = `<div class="custom-content-marker"><span>收到！！！</span><br><span>${this.msg.road}</span><br><span>${this.msg.area}</span><div class="jiantou"></div></div>`;
          for (var i = 0, marker; i < lnglats.length; i++) {
            var marker = new AMap.Marker({
              position: lnglats[i],
              content: markerContent,
              offset: new AMap.Pixel(-50, -100)
            });
            markers1.push(marker);
          }
          map.add(markers1);
          this.isremove = true;
          setTimeout(()=>{
            map.setFitView(markers1);
          },1000)
          marksers1time = setTimeout(() => {
            map.remove(markers1);
            this.isremove = false;
          }, 15000);
        }, 2000);
      }

      // map.setFitView();
    }
    // }
  }
};
</script>
<style scoped>
.yunkong {
  width: 100%;
  height: 100%;
}
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
</style>