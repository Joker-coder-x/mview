<template>
    <div>
        <h1>Rate评分</h1>
        <h6>评分组件</h6>
        <h2>基础用法-区分颜色</h2>
        <div>
            <m-rate v-model="value1" diff-color></m-rate>
        </div>
        <h2>基础用法-不区分颜色</h2>
        <div>
            <m-rate  :diff-color="false"></m-rate>
        </div>
        <h2>只读</h2>
        <div>
            <m-rate v-model="value2" disabled></m-rate>
        </div>
        <h2>展现分数</h2>
        <div>
            <m-rate v-model="value3" show-score></m-rate>
        </div>
        <h2>自定义间距</h2>
        <ul>
             <li><m-rate v-model="value4" show-score :spacing="0"></m-rate></li>
             <li><m-rate v-model="value5" show-score :spacing="10"></m-rate></li>
             <li><m-rate v-model="value6" show-score :spacing="20"></m-rate></li>
             <li><m-rate v-model="value7" show-score :spacing="50"></m-rate></li>
        </ul>
        <h2>辅助文字</h2>
        <ul>
             <li><m-rate  show-text ></m-rate></li>
        </ul>
        <h2>通过slot自定义辅助文字</h2>
        <ul>
             <li><m-rate  show-score > 测试</m-rate></li>
             <li><m-rate  show-score >1w</m-rate></li>
        </ul>
        <h2>自定义辅助文字于star的间距</h2>
        <ul>
             <li><m-rate  show-score :text-spacing="0" >测试</m-rate></li>
             <li><m-rate  show-score >测试</m-rate></li>
             <li><m-rate  show-score :text-spacing="20" >测试</m-rate></li>
             <li><m-rate  show-score :text-spacing="50" >测试</m-rate></li>
        </ul>
        <h2>半星</h2>
        <ul>
            <li><m-rate  show-score allow-half></m-rate></li>
            <li><m-rate  show-score allow-half></m-rate></li>
        </ul>
        <h2>小数</h2>
        <ul>
            <li><m-rate  show-score float></m-rate></li>
            <li><m-rate  show-score float></m-rate></li>
        </ul>
        <h2>自定义图标</h2>
        <ul>
            <li><m-rate  show-score custom-icon="mIcon-heart"></m-rate></li>
            <li><m-rate  show-score custom-icon="mIcon-warning" allow-half></m-rate></li>
            <li><m-rate  show-score custom-icon="mIcon-man-woman" float></m-rate></li>
        </ul>
        <h2>自定义字符</h2>
        <ul>
            <li><m-rate  show-score character="A"></m-rate></li>
            <li><m-rate  show-score character="B" allow-half></m-rate></li>
            <li><m-rate  show-score character="C" float></m-rate></li>
        </ul>
        <h2>最大值分别为:2,3,4</h2>
        <ul>
            <li><m-rate  show-score :max="2"></m-rate></li>
            <li><m-rate  show-score :max="3"></m-rate></li>
            <li><m-rate  show-score :max="4"></m-rate></li>
        </ul>

    </div>
</template>

<script>
export default {
    data(){
        return{
            value1:1,
            value2:1,
            value3:1,
            value4:1,
            value5:1,
            value6:1,
            value7:0,
        }
    },

    watch:{
        value1(newVal){
            console.warn(newVal);
        }
    }
}
</script>

<style>
ul{
    list-style: none;
    padding: 0;
}

ul>li{
    margin-bottom: 10px;
}

ul>li:last-child{
  margin-bottom:0;
}
</style>