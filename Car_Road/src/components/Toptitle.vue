<template>
    <div>
        <span>{{msg}}</span>
        <img src="../assets/fontbot.png" alt="">
    </div>
</template>
<script>
export default{
    props:["msg"]
}
</script>
<style scoped=''>
*{
    padding: 0;
    margin: 0
}
    div{
        position: relative;
        width: 100%;
    }
    span{
        color: #fff;
        font-size: 18px;
        line-height: 35px;
        padding-left: 10px
    }
    img{
        position: absolute!important;
        top: 20px!important;
        left:0!important;
        width: 100%
    }
</style>