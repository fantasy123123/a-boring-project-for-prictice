<template>
    <div id="signIn">
        <keep-alive>
            <router-link to="/QRCodeSignIn">
                <img src="/QRCode.png"
                     id="picture"
                     alt="QRCode"
                     height="90"
                     v-show="pic"
                     @click="pic=!pic"
                >
            </router-link>
        </keep-alive>

        <keep-alive>
            <router-link to="/signIn">
                <img src="/lock.png"
                     id="picture"
                     alt="lock"
                     height="90"
                     v-show="!pic"
                     @click="pic=!pic"
                >
            </router-link>
        </keep-alive>
        <router-view></router-view>
    </div>
</template>

<script>
import signIn from "./signIn.vue";
import QRCodeSignIn from "./QRCodeSignIn.vue";
import {ref} from "vue";
export default {
    name: "form",
    components:{signIn,QRCodeSignIn},
    setup(){
        let pic=ref(true)
        return {pic};
    }
}
</script>

<style scoped>
#picture{
    position: absolute;
    top:0%;
    right: 0%;
}

#signIn{
    position: absolute;
    top: 15%;
    right: 15%;
}
</style>