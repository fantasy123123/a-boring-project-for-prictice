<template>
<div id="copyRight">{{msg}}</div>
</template>

<script>
export default {
    name: "copyRight",
    setup() {
        let msg = "版权所有 © 2020 中南大学信息与网络中心. 保留所有权利技术支持：0731-88830426 邮箱地址：app@csu.edu.cn"
        return {msg};
    }
}
</script>

<style scoped>
#copyRight{
    color: white;
    position: absolute;
    top:72%;
    width: 500px;
    right: 15%;
    line-height: 30px;
}
</style>