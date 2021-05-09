<template>
  <div class="m-tabs">
    <dir :class="['m-tabs-bar', type]">
      <div class="m-tabs-bar-warp">
        <div
          v-for="item in navList"
          :key="item.name"
          :class="getTabCls(item)"
          @click="handleTabBarItemClick(item)"
          :style="getTabsStyle(item)"
        >
          <m-render
            v-if="item.slotLabel !== null"
            :children="item.slotLabel || []"
            tag="span"
          ></m-render>
          <span v-else>
            <i v-if="item.icon" :class="['pre-icon', item.icon]"></i>
            {{ item.label }}
          </span>
          <i
            class="mIcon-cross m-tabs-bar-remove"
            v-show="editable && item.name == currentIndex"
            @click.stop="handleRemoveItemClick(item)"
          ></i>
        </div>
      </div>
      <i
        class="mIcon-plus1 m-tabs-bar-add"
        :circle="true"
        v-if="editable"
        @click="handleAddItemClick"
      ></i>
    </dir>
    <div class="m-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MRender from "../../render/index.js";

export default {
  name: "MTabs",

  components: { MRender },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    editable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "line"
    },
    activeColor: String,
    inActiveColor: String,
    activeType: {
      type: String,
      default: "primary"
    },
    itemIndent: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      navList: [],
      currentIndex: this.value
    };
  },

  watch: {
    value(newValue) {
      this.currentIndex = newValue;
    },
    currentIndex(newVal) {
      this.updatePaneStatus(newVal);
    }
  },

  methods: {
    //遍历子组件 获得所有m-tab-pane组件
    getTabs() {
      return this.$children.filter(item => item.$options.name === "MTabPane");
    },

    //动态获取tabBarItem的class
    getTabCls(item) {
      return [
        "m-tabs-bar-item",
        this.type,
        {
          [`active--${this.activeType}`]: item.name == this.currentIndex,
          "is-disabled": item.disabled
        }
      ];
    },

    getTabsStyle(item) {
      const styObj = {},
        { activeColor, inActiveColor } = this;
      if (item.name == this.currentIndex) {
        styObj.color = activeColor;
        styObj.borderColor = activeColor;
      } else if (inActiveColor) {
        styObj.color = inActiveColor;
      }

      if (this.type == "card") {
        styObj.marginRight = `${this.itemIndent}px`;
      }

      return styObj;
    },

    //更新NavBar
    updateNav() {
      this.navList = [];

      const tabs = this.getTabs();

      tabs.forEach((pane, index) => {
        const paneName = pane.getName();

        this.navList.push({
          label: pane.label,
          name: paneName || index,
          disabled: pane.disabled,
          icon: pane.icon,
          slotLabel: pane.$slots.label || null
        });

        if (paneName === "") {
          pane.setName(index.toString());
        }
        if (index === 0) {
          if (!this.currentIndex) {
            this.currentIndex = paneName || index;
          }
        }
        if (tabs.length === 1 && !pane.disabled) {
          this.currentIndex = paneName || index;
        }
      });

      this.updatePaneStatus(this.currentIndex);
    },

    //移除tarBarItem
    removeTabBarItem(name) {
      const navList = this.navList;
      let nextItem = null;

      for (let i = 0, l = navList.length; i < l; i++) {
        if (navList[i].name == name) {
          if (i >= 1) {
            nextItem = navList[i - 1];
          } else if (i == 0 && navList.length > 1) {
            nextItem = navList[i + 1];
          }

          this.navList.splice(i, 1);
          break;
        }
      }

      this.handleTabBarItemClick(nextItem ? nextItem : undefined, true);
    },

    //更新插槽pane的显示状态
    updatePaneStatus(currentIndex) {
      this.getTabs().forEach(
        pane => (pane.isShow = pane.name === currentIndex ? true : false)
      );
    },

    //监听tabBarItem的点击
    handleTabBarItemClick(item, systemCall = false) {
      if (!item) return;

      const { name, disabled } = item;

      if (disabled) return;

      this.currentIndex = name;
      if (!systemCall) {
        this.$emit("on-click", this.currentIndex);
      }
      this.$emit("change", this.currentIndex);
    },

    //监听增加按钮点击
    handleAddItemClick() {
      this.$emit("edit", "add");
    },

    //增加移除按钮点击
    handleRemoveItemClick({ name }) {
      this.$emit("edit", "remove", name);
    }
  }
};
</script>
