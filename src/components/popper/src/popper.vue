<template>
  <div class="m-popper">
    <div ref="reference" aria-describedby="tooltip">
      <slot name="reference"></slot>
      <transition name="fade">
        <div
          v-show="showPopper && !disabled"
          :class="['tooltip', `${popperClass ? popperClass : ''}`]"
          ref="popper"
        >
          <slot></slot>
          <div
            v-if="visibleArrow"
            ref="arrow"
            role="tooltip"
            class="arrow"
            data-popper-arrow
          ></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
//导入Lib
import { createPopper } from "@popperjs/core";
//导入工具函数
import { no, $on, $off } from "@/utils/index.js";

//定义常量
const PLACEMENT_LIST = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end"
];
const TRIGGER_LIST = ["hover", "click", "focus", "manual"];

export default {
  name: "MPopper",

  props: {
    //可通过v-model控制
    value: {
      type: Boolean,
      default: false
    },
    //tooltip的位置
    placement: {
      type: String,
      default: PLACEMENT_LIST[6],
      validator(value) {
        return PLACEMENT_LIST.indexOf(value) > -1;
      }
    },
    //触发方式
    trigger: {
      type: String,
      default: TRIGGER_LIST[0],
      validator(value) {
        return TRIGGER_LIST.indexOf(value) > -1;
      }
    },
    //tooltip距离原位置x轴方向的偏移量
    xOffset: {
      type: Number,
      default: 0
    },
    //tooltip距离原位置y轴方向的偏移量
    yOffset: {
      type: Number,
      default: 10
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //是否显示 Tooltip 箭头
    visibleArrow: {
      type: Boolean,
      default: true
    },
    //popper的显示延迟，单位为毫秒
    openDelay: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0;
      }
    },
    //popper隐藏延迟，单位为毫秒
    closeDelay: {
      type: Number,
      default: 200,
      validator(value) {
        return value >= 0;
      }
    },
    //为popper添加class
    popperClass: String
  },

  data() {
    return {
      showPopper: this.value,
      currentPlacement: this.placement,
      isPopperPedding: false,
      //关闭延迟
      closeDelayFlag: false,
      //打开延迟
      openDelayFlag: false,
      isInput: false
    };
  },

  computed: {
    getPopperOptions() {
      const opts = {
        placement: this.currentPlacement,
        modifiers: [
          {
            name: "eventListeners",
            enabled: true
          },
          {
            name: "offset",
            options: {
              offset: [this.xOffset, this.yOffset]
            }
          }
        ]
      };

      opts.modifiers[0].enabled = this.showPopper ? true : false;

      return opts;
    }
  },

  watch: {
    placement(newVal) {
      this.currentPlacement = newVal;
      this.$nextTick(() => {
        this.updatePopper();
      });
    },

    value(newVal) {
      if (this.showPopper !== newVal) {
        this.showPopper = newVal;
      }
    },

    showPopper(newVal) {
      if (this.disabled) return;

      this.$nextTick(() => {
        this.$emit("input", newVal);
        this.__PopperJS__.setOptions(this.getPopperOptions);
        this.__PopperJS__.update();
        newVal ? this.$emit("show") : this.$emit("hide");
      });
    }
  },

  mounted() {
    const referenceElm = this.$refs.reference;

    switch (this.trigger) {
      case TRIGGER_LIST[0]: //hover
        $on(referenceElm, "mouseenter", this.handleShow);
        $on(referenceElm, "mouseleave", this.handleHidden);
        break;
      case TRIGGER_LIST[1]: //click
        $on(referenceElm, "click", this.handleReferenceClick);
        break;
      case TRIGGER_LIST[2]: //focus
        $on(referenceElm, "mousedown", this.handleFocus);
        $on(referenceElm, "mouseup", this.handleBlur);
        break;
      case TRIGGER_LIST[3]: //manual
        break;
    }

    if (this.trigger === TRIGGER_LIST[2]) {
      const inputChild = this.getInputChildren();

      if (inputChild) {
        this.isInput = true;
        $on(inputChild, "focus", this.handleFocus);
        $on(inputChild, "blur", this.handleBlur);
      }
    }

    this.createPopper();
  },

  beforeDestroy() {
    const referenceElm = this.$refs.reference;

    switch (this.trigger) {
      case TRIGGER_LIST[0]: //hover
        $off(referenceElm, "mouseenter", this.handleShow);
        $off(referenceElm, "mouseleave", this.handleHidden);
        break;
      case TRIGGER_LIST[1]: //click
        $off(referenceElm, "click", this.handleReferenceClick);
        break;
      case TRIGGER_LIST[2]: //focus
        $off(referenceElm, "mousedown", this.handleFocus);
        $off(referenceElm, "mouseup", this.handleBlur);
        break;
      case TRIGGER_LIST[3]: //manual
        break;
    }

    //如果trigger为focus 则清除对应事件处理程序的引用
    if (this.trigger === TRIGGER_LIST[2]) {
      const inputChild = this.getInputChildren();

      if (inputChild) {
        this.isInput = true;
        $off(inputChild, "focus", this.handleFocus);
        $off(inputChild, "blur", this.handleBlur);
      }
    }

    this.doDestory();
  },

  methods: {
    getInputChildren() {
      const reference = this.$refs.reference,
        inputs = reference.querySelectorAll("input"),
        textareas = reference.querySelectorAll("textarea");

      let children = null;

      if (inputs.length > 0) {
        children = inputs[0];
      } else if (textareas.length > 0) {
        children = textareas[0];
      }

      return children;
    },

    createPopper() {
      const refs = this.$refs,
        reference = refs.reference,
        popper = refs.popper;

      this.__PopperJS__ = createPopper(
        reference,
        popper,
        this.getPopperOptions
      );
    },

    async updatePopper() {
      if (this.isPopperPedding) return;

      this.isPopperPedding = true;
      const state = this.__PopperJS__.setOptions(this.getPopperOptions);
      this.isPopperPedding = false;

      //Promise/A+规定中：如果用户没有显示定义reject处理函数，并且在Promise解决流程过程中发送错误的话将会显式的抛出一个错误
      //所有这里为了避免将这个不必要的reason打印在控制台，使用一个什么也不做的函数占位
      state.then(undefined, no);
    },

    doShow() {
      this.showPopper = true;
    },

    doHidden() {
      this.showPopper = false;
    },

    doDestory() {
      this.__PopperJS__.destroy();
      this.__PopperJS__ = null;
    },

    handleShow() {
      if (this.disabled) return;

      this.closeDelayFlag = true;
      this.openDelayFlag = false;

      if (this.showPopper === true) return;

      setTimeout(() => {
        if (!this.openDelayFlag) {
          this.doShow();
        }
      }, this.openDelay);
    },

    handleHidden() {
      if (this.disabled) return;

      this.closeDelayFlag = false;
      this.openDelayFlag = true;

      if (this.showPopper === false) return;

      setTimeout(() => {
        if (!this.closeDelayFlag) {
          this.doHidden();
        }
      }, this.closeDelay);
    },

    handleTrigger() {
      this.showPopper ? this.handleHidden() : this.handleShow();
    },

    handleReferenceClick() {
      if (this.trigger === TRIGGER_LIST[1]) {
        this.handleTrigger();
      }
    },

    handleFocus(formInput = true) {
      if (this.trigger !== TRIGGER_LIST[2] || (this.isInput && !formInput)) {
        return false;
      }

      this.handleShow();
    },

    handleBlur(formInput = true) {
      if (this.trigger !== TRIGGER_LIST[2] || (this.isInput && !formInput)) {
        return false;
      }

      this.handleHidden();
    }
  }
};
</script>

<style lang="less">
.m-popper {
  display: inline-block;
}

.tooltip {
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 10px #d1d1d1;
}

.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.arrow {
  visibility: hidden;
}

.arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

.tooltip[data-popper-placement^="top"] > .arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^="bottom"] > .arrow {
  top: -4px;
}

.tooltip[data-popper-placement^="left"] > .arrow {
  right: -4px;
}

.tooltip[data-popper-placement^="right"] > .arrow {
  left: -4px;
}
</style>
