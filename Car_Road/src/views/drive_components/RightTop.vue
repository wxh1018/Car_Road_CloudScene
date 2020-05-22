<template>
  <div class="wrap_right">
    <Wrap name="车辆状态">
     <div id="myChart"></div>
    </Wrap>
  </div>
</template>
<script>
// const Wrap = () => import("../../components/BaseWrap");
import Wrap from '../../components/BaseWrap'
export default {
  name:'RightTop',
  data() {
    return {};
  },
  components: {
    Wrap
  },
  mounted() {
      this.img()
  },
  methods: {
    img() {
        let echarts = require('echarts'); 
        let myChart = echarts.init(document.getElementById('myChart'));
      var colorList = [
        "#afa3f5",
        "#00d488",
        "#3feed4",
        "#3bafff",
        "#f1bb4c",
        "rgba(250,250,250,0.5)"
      ];
      var sportsIcon = {};
      var option = {
        title: {
          text: "60",
          subtext: "总计",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 25,
            fontWeight: "normal",
            color: ["#fff"]
          },
          subtextStyle: {
            color: "#fff",
            fontSize: 15
          }
        },
        grid: {
          bottom: 150,
          left: 0,
          right: "10%"
        },
        legend: {
          show: false,
          orient: "vertical",
          top: "middle",
          right: "5%",
          textStyle: {
            color: "#f2f2f2",
            fontSize: 20
          },
          icon: "roundRect"
        },
        series: [
          {
            radius: ["30%", "51%"],
            center: ["50%", "50%"],
            type: "pie",
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 100,
                lineStyle: {
                  color: "#d3d3d3"
                },
                align: "right"
              },
              color: "#000",
              emphasis: {
                show: true
              }
            },
            label: {
              normal: {
                formatter: function(params) {
                  var str = "";
                  switch (params.name) {
                    case "路测行人":
                      str =
                        "{a|}\n{nameStyle|路测行人 }" +
                        "{rate|" +
                        params.value +
                        "%}";
                      break;
                    case "十字路口":
                      str =
                        "{b|}\n{nameStyle|十字路口 }" +
                        "{rate|" +
                        params.value +
                        "%}";
                      break;
                    case "路测设备":
                      str =
                        "{c|}\n{nameStyle|路测设备 }" +
                        "{rate|" +
                        params.value +
                        "%}";
                      break;
                    case "路测信息":
                      str =
                        "{d|}\n{nameStyle|路测信息 }" +
                        "{rate|" +
                        params.value +
                        "%}";
                      break;
                    case "碰撞检测":
                      str =
                        "{e|}\n{nameStyle|碰撞检测 }" +
                        "{rate|" +
                        params.value +
                        "%}";
                      break;
                  }
                  return str;
                },
                padding: [0, -100],
                height: 165,
                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.e
                    },
                    align: "left"
                  },
                  b: {
                    width: 29,
                    height: 45,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.d
                    },
                    align: "left"
                  },
                  c: {
                    width: 34,
                    height: 33,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.c
                    },
                    align: "left"
                  },
                  d: {
                    width: 34,
                    height: 44,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.b
                    },
                    align: "left"
                  },
                  e: {
                    width: 38,
                    height: 30,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.a
                    },
                    align: "left"
                  },
                  nameStyle: {
                    fontSize: 13,
                    color: "#fff",
                    align: "left"
                  },
                  rate: {
                    fontSize: 13,
                    color: "#1ab4b8",
                    align: "left"
                  }
                }
              }
            },
            data: [
              {
                value: 17,
                name: "路测行人"
              },
              { value: 23, name: "十字路口" },
              { value: 27, name: "路测设备" },
              { value: 33, name: "路测信息" },
              { value: 9, name: "碰撞检测" }
            ]
          },
          // 边框的设置
          {
            radius: ["47%", "51%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "rgba(250,250,250,0.5)"
              }
            },
            data: [
              {
                value: 1
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    //     function getLocalTime(nS) { 
    //    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
    //     }
    //    alert(getLocalTime(1177824835)); 
    }
  }
};
</script>
<style scoped>
.wrap_right {
  width: 22%;
  height: 38%;
  position: absolute;
  top: 10%;
  right: -1px;
  z-index: 1;
}
#myChart{
    width: 100%;
    height: 100%;
    /* position:absolute;
    top: 10%;
    left: 1% */
}
</style>