<template>
  <div class="box">
    <div class="nei"></div>
    <div class="wrap"></div>
    <div class="ani"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  compontents: {}
};
</script>
<style scoped>
    .box {
      perspective: 1000px;
      width: 100px;
      height: 100px;
      position: absolute;
      top: 10%;
      left: 10%;
      /* border: 1px solid red; */
      display: flex;
      animation: c .8s infinite linear;
    }
    .ani {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      transform-style: preserve-3d;
      box-shadow: -5px 10px 15px #0abde3,
      -10px 15px 30px #0abde3,
      -10px 20px 30px #0abde3;
    }
    .nei{
        position: absolute;
        width: 85px;
        height: 85px;
        border: 1px solid ;
        box-shadow: 0 0 10px #0abde3,
        0 0 12px #0abde3,
        0 0 20px #0abde3
        ;
        border-radius: 50%;
        left: 7px;
        top: 7px;
    }
    .wrap{
        position: absolute;
        width: 130px;
        height: 130px;
        border: 1px solid #0abde3;
        box-shadow: 0 0 10px white,
        0 0 20px #0abde3
        ;
        border-radius: 50%;
        left: -15px;
        top:-15px;
    }
    @keyframes c {
      from {
        transform: rotate(0)
      }

      to {
        transform: rotate(360deg)
      }
    }
</style>