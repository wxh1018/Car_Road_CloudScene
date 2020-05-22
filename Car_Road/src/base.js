var map={
    //百度坐标转换
    baidu(bdLng,bdLat){
        var X_PI = (Math.PI * 3000.0) / 180.0;
        var x = bdLng - 0.0065;
        var y = bdLat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return [gg_lng,gg_lat]
    }
}

export default map