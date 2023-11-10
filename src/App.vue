<script>
import  logo  from './components/logo.vue'
import slideshow from './components/slideshow.vue'
import maskDiv from './components/mask.vue'
export default {
    name:"app",
    components:{logo,slideshow,maskDiv},
}
</script>

<template>
<logo/>
<slideshow/>
<mask-div/>
</template>

<style scoped>

</style>
