<template>
<div class="back" @click="back">
    <!-- <router-link to="/" > -->
  返回云控平台
    <!-- </router-link> -->
  
</div>
</template>
<script>
export default{
    name:'back',
    methods: {
        back(){
            this.$router.push('/index')
        }
    },
}
</script>
<style scoped=''>
.back{
    width: 28px;
    height: 300px;
    clip-path: polygon(0 0, 100% 30% , 100% 70%, 0 100% , 0 0);
    background: rgba(6,20,54);
  	text-shadow: 0 0 10px #00d8ff;
    font-size: 20px;
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    top: 20%;
    z-index: 999;
    color: white;
    cursor: pointer;
}
</style>