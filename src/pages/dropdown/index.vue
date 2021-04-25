<template>
    <div>
        <h2>下拉菜单,可根据视口位置自动调整弹窗位置</h2>
        <div class="demo-dropdown">
            <m-dropdown @commond="handleCommond" trigger="click">
                <template v-slot:default>
                    <m-button type="primary">click方式触发(ESC快捷键可关闭)</m-button>
                </template>
                <template v-slot:dropdown>
                    <m-dropdown-menu>
                        <m-dropdown-item commond="a">test</m-dropdown-item>
                        <m-dropdown-item commond="b">test2sss</m-dropdown-item>
                        <m-dropdown-item commond="c">test3</m-dropdown-item>
                        <m-dropdown-item commond="d">你好啊 是我看 洒出八月十八</m-dropdown-item>
                    </m-dropdown-menu>
                </template>
            </m-dropdown>
            <m-dropdown @commond="handleCommond" trigger="hover">
                <template v-slot:default>
                    <m-button type="primary">hover方式触发</m-button>
                </template>
                <template v-slot:dropdown>
                    <m-dropdown-menu>
                        <m-dropdown-item commond="a">test</m-dropdown-item>
                        <m-dropdown-item commond="b">test2sss</m-dropdown-item>
                        <m-dropdown-item commond="c">test3</m-dropdown-item>
                        <m-dropdown-item commond="d">你好啊 是我看 洒出八月十八</m-dropdown-item>
                    </m-dropdown-menu>
                </template>
            </m-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
          handleCommond(commond){
		  console.log("点击了菜单选项",commond);
	  },
    }
}
</script>

<style scoped>
.demo-dropdown{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>