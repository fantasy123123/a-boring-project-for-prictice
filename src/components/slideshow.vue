<template>
    <el-carousel indicator-position="outside" id="slideshow">
        <el-carousel-item v-for="item in 5" :key="item">
            <img :src="img+item+'.png'" width="600" height="300">
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name:"slideshow",
    setup() {
        let img="/轮播图/img_"
        return{img}
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    display: flex;
    color: #475669;
    line-height: 300px;
    opacity: 0;
    margin: 0;
}

#slideshow {
    width: 600px;
    position: absolute;
    top:15%;
    left:8.5%;
}
</style>


<script setup>
</script>