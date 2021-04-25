<template>
    <div>
        <h1>Rate评分</h1>
        <h6>评分组件</h6>
        <h2>基础用法</h2>
        <div>
            <m-rate v-model="value1"></m-rate>
        </div>
        <h2>只读</h2>
        <div>
            <m-rate v-model="value2" disabled></m-rate>
        </div>
        <h2>展现分数</h2>
        <div>
            <m-rate v-model="value3" show-score></m-rate>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value1:1,
            value2:1,
            value3:1
        }
    },

    watch:{
        value1(newVal){
            console.warn(newVal);
        }
    }
}
</script>