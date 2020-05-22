<template>
  <div class="basewrap">
      <div class="ani">
        <Ani/>
      </div>
      <div class="top">
        <span>{{name}}</span>
        <img class="heng" src="../assets/fontbot.png" alt />
      </div>
        <div class="content">
            <slot/>
        </div>
  </div>
</template>
<script>
// 共用的外部边框
const Ani = ()=>import('./CirclrMove')
export default {
  name:'BaseWrap',
  data() {
    return {};
  },
  props:['name'],
  components:{
    Ani
  }
};
</script>
<style scoped>
.basewrap {
  width: 100%;
  height: 100%;
  border: 1px solid #41a2ff;
  background-size: cover;
  background: rgba(6, 20, 54, 0.8);
  padding: 10px;
  box-sizing: border-box;
  z-index: 99;
  display: flex;
  flex-flow: column;
}
.top{
    width: 100%;
    height: 40px;
    /* border:1px solid red ; */
}
span {
  color: #fff;
  font-size: 18px;
  line-height: 35px;
  padding-left: 10px;
  font-weight: 600
}
.heng {
  position: absolute !important;
  top: 30px !important;
  left: 10px !important;
  max-width: 96%;
}
.content{
    width: 100%;
    flex: 1;
    /* border:1px solid red ; */
}
.ani{
  width: 50px;
  height: 50px;
  position: absolute;
  top: -12px;
  right: 1px;
  border: 1px solid red;
  transform: scale(.2)
}
</style>