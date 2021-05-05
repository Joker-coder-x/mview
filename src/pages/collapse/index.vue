<template>
  <div>
    <h1>折叠面板</h1>
    <m-collapse @on-change="handleOnChange" v-model="value">
      <m-collapse-panel name="a">
        <template v-slot:default
          >测试头</template
        >
        <template v-slot:content>
          这里是内容
          <m-collapse>
            <m-collapse-panel>
              <template v-slot:default
                >测试头</template
              >
              <template v-slot:content>
                这里是内容
              </template>
            </m-collapse-panel>
          </m-collapse>
        </template>
      </m-collapse-panel>
      <m-collapse-panel name="b">
        <template v-slot:default
          >测试头</template
        >
        <template v-slot:content>
          这里是内容
        </template>
      </m-collapse-panel>
      <m-collapse-panel name="c">
        <template v-slot:default
          >测试头</template
        >
        <template v-slot:content>
          这里是内容
        </template>
      </m-collapse-panel>
    </m-collapse>

    <div>
      <h1>API</h1>
      <h1>Collapse props</h1>
      <table>
        <tr>
          <th>属性</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
        <tr>
          <td>value</td>
          <td>当前激活的面板的 name，可以使用 v-model 双向绑定</td>
          <td>Array | String</td>
          <td>-</td>
        </tr>
        <tr>
          <td>accordion</td>
          <td>是否开启手风琴模式，开启后每次至多展开一个面板</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </table>

      <h1>Collapse events</h1>
      事件名 说明 返回值 on-change 切换面板时触发，返回当前已展开的面板的
      key，格式为数组 []
      <h1>Panel props</h1>
      属性 说明 类型 默认值 name 当前面板的 name，与
      Collapse的value对应，不填为索引值 String index hide-arrow 隐藏箭头 Boolean
      false
      <h1>Panel slot</h1>
      名称 说明 无 面板头内容 content 描述内容
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ["a", "b", "c"]
    };
  },

  methods: {
    handleOnChange(list) {
      console.warn(list);
    }
  },

  watch: {
    value(newVal) {
      console.error(newVal);
    }
  }
};
</script>

<style scoped></style>
