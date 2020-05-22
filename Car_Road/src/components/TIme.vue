<template>
  <div>{{data}}</div>
</template>
<script>
export default{
   data(){
    return{
        data:''
    }
},
mounted() {
    clearInterval(timer)
    let timer = setInterval(() => {
        this.time()
    }, 1000);
}, 
methods: {
    time(){
        var d=new Date();
        var Hours = d.getHours();
        var Minutes = d.getMinutes();
        var Seconds = d.getSeconds();
        if(Hours >= 0 && Hours <= 9){
            Hours = "0" + Hours;
        }
        if(Minutes >= 0 && Minutes <= 9){
            Minutes = "0" + Minutes;
        }
        if(Seconds >= 0 && Seconds <= 9){
            Seconds = "0" + Seconds;
        }
        this.data = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+Hours+":"+Minutes+":"+Seconds;
    },
},
}


</script>
<style scoped>
div{
    font-size: 24px;
    font-weight: 700px;
    color: #20dbfd;
    text-shadow: 0 0 25px #00d8ff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: nowrap;
    z-index:999999;
    position: absolute
}
</style>