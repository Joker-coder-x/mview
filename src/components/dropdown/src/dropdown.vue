<template>
  <div class="m-dropdown">
    <m-popper
      placement="bottom"
      :trigger="trigger"
      :close-delay="closeDelay"
      popper-class="popper"
      v-model="currentValue"
    >
      <template v-slot:reference>
        <div><slot></slot></div>
      </template>
      <template v-slot:default>
        <div><slot name="dropdown"></slot></div>
      </template>
    </m-popper>
  </div>
</template>

<script>
//导入子组件
import MPopper from "../../popper/index.js";
//定义常量
const TRIGGER_MODE = ["hover", "click"],
  CLICK_DELAY = 0,
  HOVER_DELAY = 200;

export default {
  name: "MDropdown",

  components: {
    MPopper
  },

  props: {
    //控制触发模式 hover触发和click触发
    trigger: {
      type: String,
      default: TRIGGER_MODE[1],
      validator(value) {
        return TRIGGER_MODE.indexOf(value.trim().toLowerCase()) !== -1;
      }
    },
    //通过v-model进行双向绑定
    value: {
      type: Boolean,
      default: false
    },
    //下拉菜单默认在点击菜单项后会被隐藏，将hide-on-click属性默认为false可以关闭此功能。
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },

  provide() {
    return {
      dropdown: this,
      menuItemClickCallMethodName: "handleMenuItemClick"
    };
  },

  data() {
    return {
      //控制菜单栏的显示
      currentValue: this.value,
      closeDelay: 200
    };
  },

  watch: {
    trigger(newVal) {
      this.closeDelay = newVal == TRIGGER_MODE[1] ? CLICK_DELAY : HOVER_DELAY;
    },

    currentValue(newVal) {
      if (newVal !== this.value) {
        this.$emit("input", newVal);
      }
    },

    value(newVal) {
      this.currentValue = newVal;
    }
  },

  created() {
    this.closeDelay =
      this.trigger == TRIGGER_MODE[1] ? CLICK_DELAY : HOVER_DELAY;
  },

  methods: {
    //隐藏菜单栏
    handleClose() {
      this.currentValue = false;
    },

    //菜单栏选项被点击
    handleMenuItemClick(commond) {
      if (this.hideOnClick) {
        this.handleClose();
      }
      this.$emit("commond", commond);
    }
  }
};
</script>

<style lang="less"></style>
