<template>
  <div
    class="m-dropdown-container"
    v-trigger:[trigger].esc="getTriggerExpression"
  >
    <div @click="handleTargetClick" ref="targetElement"><slot></slot></div>
    <div v-show="isOpen" ref="menuWarp"><slot name="dropdown"></slot></div>
  </div>
</template>

<script>
//导入自定义指令
import Trigger from "./directives/trigger.js";

//导入api
import { getElementToViewportBottomOffset } from "@/utils/index.js";

const TRIGGER_MODE = ["hover", "click"];

export default {
  name: "MDropdown",

  directives: { Trigger },

  props: {
    //控制触发模式 hover触发和click触发
    trigger: {
      type: String,
      default: TRIGGER_MODE[1],
      validator(value) {
        return TRIGGER_MODE.indexOf(value.trim().toLowerCase()) !== -1;
      }
    }
  },

  //provide(){} 和privode:{}写法的区别在于provide(){}可访问Vue实例 而privode:{}只能this==undefined
  provide() {
    return {
      dropdown: this,
      menuItemClickCallMethodName: "handleMenuItemClick"
    };
  },

  data() {
    return {
      //控制菜单栏的显示
      isOpen: false
    };
  },

  methods: {
    //目标元素触发点击事件
    handleTargetClick() {
      this.isOpen ? this.handleClose() : this.handleOpen();
    },

    //隐藏菜单栏
    handleClose() {
      this.isOpen = false;
    },

    //显示菜单栏
    handleOpen() {
      this.isOpen = true;
      this.setMenuPosition();
    },

    //菜单栏选项被点击
    handleMenuItemClick(commond) {
      this.$emit("commond", commond);
    },

    //设置菜单显示位置
    setMenuPosition() {
      this.$nextTick(() => {
        const targetEl = this.$refs["targetElement"],
          menuWarp = this.$refs["menuWarp"],
          offsetTop = targetEl.getBoundingClientRect().top,
          offsetBottom = getElementToViewportBottomOffset(targetEl),
          menuVm = this.$children[1];

        if (offsetBottom >= offsetTop) {
          menuVm.showPosition("bottom");
        } else if (offsetTop > menuWarp.children[0].offsetHeight + 30) {
          menuVm.showPosition("top");
        } else {
          menuVm.showPosition("bottom");
        }
      });
    }
  },

  computed: {
    //动态绑定v-trigger指令的表达式
    getTriggerExpression() {
      let expression;
      switch (this.trigger) {
        case TRIGGER_MODE[0]:
          expression = {
            enter: this.handleOpen,
            leave: this.handleClose
          };
          break;
        case TRIGGER_MODE[1]:
          expression = this.handleClose;
          break;
        default:
          break;
      }
      return expression;
    }
  },

  mounted() {}
};
</script>

<style scoped>
.m-dropdown-container {
  position: relative;
  display: inline-block;
}
</style>
