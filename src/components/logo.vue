<template>
    <div id="logo">
       <img src="../assets/logo.png" width="300">
        <div id="hc">|</div>
        <div id="logoWords">{{logoWords}}</div>
    </div>
</template>

<script>
export default {
    name: "logo",
setup()
{
    let logoWords="统一身份认证"

    return{
        logoWords,
    }
}

}
</script>

<style scoped>
#logo{
    position: absolute;
    top:5%;
    left: 10%;
    display: table;
}

#logoWords{
    display: table-cell;
    vertical-align: middle;
    color: white;
    font-size: xx-large;
}

#hc{
    padding: 15px;
    display: table-cell;
    vertical-align: middle;
    color: white;
    font-size: xxx-large;
    font-weight: lighter;
}
</style>