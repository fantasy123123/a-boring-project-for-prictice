<template>
    <div id="language">
    <el-select v-model="value" class="m-2" placeholder="Select">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('简体中文')

const options = [
    {
        value: '简体中文',
        label: '简体中文',
    },
    {
        value: 'English',
        label: 'English',
    },
]
</script>

<style>
#language{
    position: absolute;
    top: 3%;
    right:25%;
    width: 130px;
}
</style>





