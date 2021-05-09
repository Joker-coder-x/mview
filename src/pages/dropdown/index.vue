<template>
  <div>
    <h1>Dropdown 下拉菜单</h1>
    <p>将动作或菜单折叠到下拉菜单中（内部基于MPopper组件构建）。</p>

    <h3>基础用法</h3>
    <p>移动到下拉菜单上，展开更多操作。</p>
    <m-dropdown @commond="handleCommond">
      <template v-slot:default>
        <m-button type="primary">下拉菜单</m-button>
      </template>
      <template v-slot:dropdown>
        <m-dropdown-menu>
          <m-dropdown-item v-for="item in 5" :key="item" :commond="item"
            >菜单选项{{ item }}</m-dropdown-item
          >
        </m-dropdown-menu>
      </template>
    </m-dropdown>

    <h3>触发方式</h3>
    <p>可以配置 click 激活或者 hover 激活。</p>
    <div class="demo-dropdown">
      <m-dropdown @commond="handleCommond" trigger="click" v-model="value1">
        <template v-slot:default>
          <m-button type="primary">click方式触发(ESC快捷键可关闭)</m-button>
        </template>
        <template v-slot:dropdown>
          <m-dropdown-menu>
            <m-dropdown-item v-for="item in 5" :key="item" :commond="item"
              >菜单选项{{ item }}</m-dropdown-item
            >
          </m-dropdown-menu>
        </template>
      </m-dropdown>
      <m-dropdown @commond="handleCommond" trigger="hover">
        <template v-slot:default>
          <m-button type="primary">hover方式触发</m-button>
        </template>
        <template v-slot:dropdown>
          <m-dropdown-menu>
            <m-dropdown-item v-for="item in 5" :key="item" :commond="item"
              >菜单选项{{ item }}</m-dropdown-item
            >
          </m-dropdown-menu>
        </template>
      </m-dropdown>
    </div>

    <h3>菜单隐藏方式</h3>
    <p>
      可以hide-on-click属性来配置。下拉菜单默认在点击菜单项后会被隐藏，将hide-on-click属性默认为false可以关闭此功能。
    </p>
    <m-dropdown @commond="handleCommond" :hide-on-click="false">
      <template v-slot:default>
        <m-button type="primary">下拉菜单</m-button>
      </template>
      <template v-slot:dropdown>
        <m-dropdown-menu>
          <m-dropdown-item v-for="item in 5" :key="item" :commond="item"
            >菜单选项{{ item }}</m-dropdown-item
          >
        </m-dropdown-menu>
      </template>
    </m-dropdown>

    <h3>菜单项选择禁用</h3>
    <p>通过给m-dropdown-item设置disabled属性可禁用选择</p>
    <m-dropdown @commond="handleCommond" :hide-on-click="false">
      <template v-slot:default>
        <m-button type="primary">下拉菜单</m-button>
      </template>
      <template v-slot:dropdown>
        <m-dropdown-menu>
          <m-dropdown-item
            v-for="item in 5"
            :key="item"
            :commond="item"
            :disabled="item > 3"
            >菜单选项{{ item }}</m-dropdown-item
          >
        </m-dropdown-menu>
      </template>
    </m-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true
    };
  },
  methods: {
    handleCommond(commond) {
      console.log("点击了菜单选项", commond);
    }
  }
};
</script>

<style scoped>
.demo-dropdown {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
