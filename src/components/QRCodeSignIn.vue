<template>
<div id="QRCodeSignIn">
    <div id="EBankSignIn">
        <img src="/EBankSignIn.png" alt="EBankSignIn" height="300">
        <div id="EBankSignInText">v我50谢谢喵~</div>
    </div>
</div>
</template>

<script>
export default {
    name: "QRCodeSignIn"
}
</script>

<style scoped>
#QRCodeSignIn{
    border-radius: 7.5px;
    height: 575px;
    width: 520px;
    background-color: white;
}

#EBankSignIn{
    position: absolute;
    top:20%;
    left: 20.75%;
}

#EBankSignInText{
    padding-top: 20px;
    font-size: 25px;
    font-family: sans-serif;
    text-align: center;
}
</style>