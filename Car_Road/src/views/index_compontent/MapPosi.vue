<template>
  <div id="map">
      
  </div>
</template>
<script>
let map = null
import vm from "../../communication";
export default {
  data() {
    return {};
  },
  mounted() {
      this.map()
  },
  methods: {
      map(){
          let _this = this
          map = new AMap.Map('map',{
              zoom:12,
              center:[118.8727613217, 32.028425814],
              mapStyle: "amap://styles/2e6afbd914a6e62acc0112b25c51897b",
          })
          function mapclick(e){
              // console.log(e.lnglat.getLng(),e.lnglat.getLat());
              vm.$emit('send',{lng:e.lnglat.getLng(),lat:e.lnglat.getLat()})
              _this.$router.push('/index')
          }
          map.on('click',mapclick)
      }
  },
  compontents: {}
};
</script>
<style scoped>
#map{
    width: 50%;
    height: 70%;
    border: 1px solid white;
    position: absolute;
    top:10%;
    left: 50%;
    margin-left: -25%;
    z-index: 3
}
</style>
