<template>
  <div class="wrap">
    <ul>
      <li>
        <p>{{text[0]}}</p>
        <span>{{code}}(个)</span>
      </li>
      <li>
        <p>{{text[0]}}</p>
        <span>绿灯</span>
      </li>
    </ul>
    <ul>
      <li>
        <p>{{text[0]}}</p>
        <span>安全</span>
      </li>
      <li>
        <p>{{text[0]}}</p>
        <span>{{code1}}(个)</span>
      </li>
    </ul>
    <div class="box">

    <el-tabs v-model="activeName" @tab-click="handleClick" stretch:true>
      <el-tab-pane label="预警信息" name="first">
        <iframe
          id="iframe1"
          src="http://222.186.52.79:8088/808gps/open/hls/index.html?lang=zh&vehiIdno=13520195337&account=0195337&password=000000&channel=0"
          frameborder="0"
          scrolling="No"
          leftmargin="0"
          topmargin="0"
        ></iframe>
        <iframe
          id="iframe1"
          src="http://222.186.52.79:8088/808gps/open/hls/index.html?lang=zh&vehiIdno=13520195337&account=0195337&password=000000&channel=1"
          frameborder="0"
          scrolling="No"
          leftmargin="0"
          topmargin="0"
        ></iframe>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <div class="InfoWindow" v-if="HardwarpInfo.roadname">
          <h2>{{HardwarpInfo.roadname}}</h2>
          <hr />
          <descruption title="天气" :content="HardwarpInfo.weather" />
          <descruption title="道路等级" :content="HardwarpInfo.level" />
          <descruption title="拥堵情况" :content="HardwarpInfo.traffic.evaluation.description" />
          <descruption title :content="HardwarpInfo.traffic.description" />
          <descruption title="附近" content style="color:#000" />
          <descruption
            :title="item.name"
            :content="`${item.direction}方向，${item.distance}米`"
            v-for="item in HardwarpInfo.pois"
            :key="item.id"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>

  </div>
</template>
<script>
import {jinweidu,HardwarpService} from '../../api/index'
export default {
  name:'LeftTop',
  data() {
    return {
      text: ["路测信息", "前方红绿灯", "碰撞检测", "路测车辆"],
      code: "",
      code1: "",
      code3: "",
      activeName: "first",
      HardwarpInfo: {
        roadname: "天气预警",
        traffic: {
          description: "",
          evaluation: {}
        }
      }
    };
  },
  mounted() {
    this.mock();
    // this.jiekou()
  },
  methods: {
    mock() {
      setInterval(() => {
        var code;
        this.code = "";
        var codeLength = 1;
        //设置随机字符
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        //循环codeLength 我设置的4就是循环4次
        for (var i = 0; i < codeLength; i++) {
          //设置随机数范围,这设置为0 ~ 36
          var index = Math.floor(Math.random() * 10);
          //字符串拼接 将每次随机的字符 进行拼接
          this.code += random[index];
        }

        var code1;
        this.code1 = "";
        var codeLength = 1;
        //设置随机字符
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        //循环codeLength 我设置的4就是循环4次
        for (var i = 0; i < codeLength; i++) {
          //设置随机数范围,这设置为0 ~ 36
          var index = Math.floor(Math.random() * 10);
          //字符串拼接 将每次随机的字符 进行拼接
          this.code1 += random[index];
        }
      }, 2000);
    },
    handleClick() {},
    jiekou() {
      let that = this;
      jinweidu().then(res => {
        console.log(res);
        // this.mlng1 = res.data.status[0].mlng;
        // this.mlat1 = res.data.status[0].mlat;
        // HardwarpService("web",res.data.status[0].mlng,res.data.status[0].mlat).then(res=>{
        // 	if(res.data.success){
        // 		Object.assign(that.HardwarpInfo,res.data.data)
        // 	}
        // })
        // func()
      });
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 22%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 10px;
  z-index: 1;
  background: rgba(6, 20, 54, 0.4);
  border: 1px solid #41a2ff;
  box-sizing: border-box;
  padding: 20px;
}
ul {
  height: 25%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
ul li {
  width: 46%;
  height: 90%;
  border: 2px solid #41a2ff;
  box-shadow: 0 0 5px white;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 26px;
  font-weight: 900;
  background: rgba(6, 20, 54, 0.8);
}
ul li p {
  text-align: center;
}
ul li span {
  color: aqua;
  font-size: 36px;
}
.box{
  width: 80%;
  /* border: 1px solid red; */
  margin: 0 auto
}
</style>