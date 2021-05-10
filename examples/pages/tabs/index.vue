<template>
  <div>
    <h1>Tabs标签页</h1>
    <p>分隔内容上有关联但属于不同类别的数据集合。</p>
    <h3>基础用法</h3>
    <p>基础的、简洁的标签页。</p>
    <m-tabs @on-click="handleTabPaneClick">
      <m-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>可编辑的tabs标签页</h3>
    <p>通过设置editable属性来配置。</p>
    <m-tabs @on-click="handleTabPaneClick" @edit="handleEdit" editable>
      <m-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>禁用某一项</h3>
    <p>通过设置disabled属性来配置。</p>
    <m-tabs @on-click="handleTabPaneClick">
      <m-tab-pane
        v-for="(item, index) in tabList"
        :key="item.name"
        :name="item.name"
        :label="item.label"
        :disabled="index >= 1"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>卡片样式</h3>
    <p>设置属性 type 为 card 可以显示卡片样式，常用于容器顶部。</p>
    <m-tabs @on-click="handleTabPaneClick" type="card">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>内置active类型</h3>
    <p>
      设置属性
      activeType可更改tab标签active时的颜色。可选[primary,success,info,warning,danger]，默认为primary。
    </p>
    <m-tabs @on-click="handleTabPaneClick">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>
    <m-tabs @on-click="handleTabPaneClick" active-type="success">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>
    <m-tabs @on-click="handleTabPaneClick" active-type="info">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>
    <m-tabs @on-click="handleTabPaneClick" active-type="warning">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>
    <m-tabs @on-click="handleTabPaneClick" active-type="danger">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>自定义active和in-active标签样式</h3>
    <p>
      通过设置active-color和in-active-color来定义活跃时和不活跃时的标签颜色。此属性定义的颜色优先级最高。
    </p>
    <m-tabs
      @on-click="handleTabPaneClick"
      in-active-color="red"
      active-color="#8e44ad"
    >
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>type为card时可自定义标签头之间的间距</h3>
    <p>
      通过设置item-indent可配置,单位像素。温馨提示：此属性只在type为card时生效。
    </p>
    <m-tabs type="card" :item-indent="15">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>
    <m-tabs type="card" :item-indent="30">
      <m-tab-pane
        v-for="item in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>为lable设置字体图标</h3>
    <p>通过对m-tab-pane的icon属性进行配置。</p>
    <m-tabs>
      <m-tab-pane
        v-for="(item, index) in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
        :icon="item.icon"
      >
        <template v-slot:label v-if="index >= 2">
          {{ item.content }} <i class="mIcon-github"></i>
        </template>
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>

    <h3>通过slot设置label标签</h3>
    <p>
      通过对m-tab-pane提供label插槽自定义label标签，此方式配置的label标签渲染优先级最高。
    </p>
    <m-tabs>
      <m-tab-pane
        v-for="(item, index) in tabList2"
        :key="item.name"
        :name="item.name"
        :label="item.label"
        :icon="item.icon"
      >
        <template v-slot:label v-if="index >= 2">
          {{ item.content }}by slot
        </template>
        {{ item.content }}
      </m-tab-pane>
    </m-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        {
          label: "蝙蝠侠",
          name: "1",
          content: "标签一的内容"
        },
        {
          label: "小丑",
          name: 2,
          content: "标签二的内容"
        },
        {
          label: "迪迦奥特曼",
          name: 3,
          content: "标签三的内容"
        }
      ],

      tabList2: [
        {
          label: "标签一",
          name: "1",
          content: "标签一的内容",
          icon: "mIcon-windows8"
        },
        {
          label: "标签二",
          name: 2,
          content: "标签二的内容",
          icon: "mIcon-android"
        },
        {
          label: "标签三",
          name: 3,
          content: "标签三的内容",
          icon: "mIcon-appleinc"
        }
      ]
    };
  },

  methods: {
    handleTabPaneClick(name) {
      console.log(name + "  click");
    },

    handleEdit(action, name) {
      console.log(action, name);
      const tabList = this.tabList;
      if (action === "add") {
        tabList.push({
          name: tabList.length + 1,
          label: "New Tab",
          content: `test ${tabList.length + 1}`
        });
      } else if (action === "remove") {
        for (let i = 0, l = tabList.length; i < l; i++) {
          if (tabList[i].name == name) {
            tabList.splice(i, 1);
            break;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
p {
  color: rgb(129, 126, 126);
  margin: 10px 0;
  padding: 0;
  font-size: 14px;
}
</style>
