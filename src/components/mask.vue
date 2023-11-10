<template>
<div id="mask">
   <language/>
   <inform/>
   <copy-right/>
</div>
</template>

<script>
import language from './language.vue'
import copyRight from './copyRight.vue'
import inform from "./form.vue";
export default {
    name: "mask",
    components:{language,copyRight,inform}
}
</script>

<style scoped>
#mask{
    position: absolute;
    top:0;
    right: 0;
    bottom: 0;
    left: 65%;
    background-color: rgba(0,0,0,0.3);
}
</style>