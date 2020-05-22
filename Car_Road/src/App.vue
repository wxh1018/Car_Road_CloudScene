<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0}
body{font:12px "宋体","Arial Narrow",HELVETICA;background:#fff;-webkit-text-size-adjust:100%}
a{color:#172c45;text-decoration:none}
a:hover{color:#cd0200;text-decoration:underline}
em{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
html,body{
  width: 100%;
  height: 100%;
}
#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.moveshow{
	position: absolute;
	top:20%;
	left:50%;
	animation: moveshow .5s;
	z-index: 99;
	background: rgba(6,20,54,.8)
}
.moveshow2{
	position: absolute;
	top:20%;
	left:50%;
	animation: moveshow2 .5s;
	z-index: 99;
	background: rgba(6,20,54,.8)
}
.moveshow3{
	position: absolute;
	top:20%;
	left:50%;
	animation: moveshow3 .5s;
	z-index: 99;
	background: rgba(6,20,54,.8)
}
@keyframes moveshow{
	from{transform: scale(0);left: 85%;top:10%};
	to{transform: cale(1);left:50%}
}
@keyframes moveshow2{
	from{transform: scale(0);left: 90%;top:10%};
	to{transform: cale(1);left:50%}
}
@keyframes moveshow3{
	from{transform: scale(0);left: 95%;top:10%};
	to{transform: cale(1);left:50%}
}
</style>
