<template>
    <div>
        <h2>checkbox</h2>
        <div class="demo-checkbox">
            <m-checkbox v-model="checked">默认样式</m-checkbox>
            <m-checkbox v-model="checked1" color="red">自定义颜色</m-checkbox>
            <m-checkbox v-model="checked2" line>镂空样式</m-checkbox>
            <m-checkbox v-model="checked3" circle>圆形</m-checkbox>
            <m-checkbox v-model="checked4" line circle>镂空圆形</m-checkbox>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
          checked:false,
		  checked1:false,
		  checked2:false,
		  checked3:false,
		  checked4:false,
        }
    }
}
</script>

<style scoped>
.demo-checkbox{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>