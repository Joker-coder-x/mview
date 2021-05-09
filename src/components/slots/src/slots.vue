<template>
  <div :class="['m-slots', disabled ? 'is-disabled' : '']">
    <div class="m-slots-header">
      <slot name="header"><h1>每周一无限会员日</h1></slot>
    </div>
    <div class="m-slots-main">
      <slot></slot>
    </div>
    <div class="m-slots-footer">
      <slot name="footer">
        <button class="start-btn" @click="handleRun" :disabled="disabled">
          开始抽奖
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
import { genrateRunTimesSet } from "./utils.js";
import { deleteProp, $on, $off, jsonClone } from "@/utils/index.js";

export default {
  name: "MSlots",

  props: {
    //滑动速度
    speed: {
      type: Number,
      default: 2
    },
    //控制曲线速度
    easeout: {
      type: Boolean,
      default: true
    },
    //自定义开始按钮的选择器
    customStartTargetSelector: {
      type: String,
      default: ""
    },
    //随机递增的范围
    incrementTimesRange: {
      type: Number,
      default: 10
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },

  provide() {
    return {
      //因为跟vue的slots同名 为了不引起不必要的误会 所有取名slotsRef
      slotsRef: this
    };
  },

  data() {
    return {
      isComplete: false,
      completeList: []
    };
  },

  mounted() {
    if (this.customStartTargetSelector) {
      const startTarget = document.querySelector(
        this.customStartTargetSelector
      );

      if (startTarget && startTarget instanceof HTMLElement) {
        const handler = () => this.handleRun();

        $on(startTarget, "click", handler);

        this.__startTarget__ = startTarget;
        this.__startTargetHandler__ = handler;
      }
    }
  },

  beforeDestroy() {
    if (this.__startTarget__) {
      $off(this.__startTarget__, "click", this.__startTargetHandler__);

      this.__startTarget__ = null;
      this.__startTargetHandler__ = null;

      deleteProp(this, "__startTarget__");
      deleteProp(this, "__startTargetHandler__");
    }
  },

  methods: {
    getItems() {
      return this.$children.filter(item => item.$options.name == "MSlotsItem");
    },

    handleComplete() {
      this.$emit("complete", jsonClone(this.completeList));
    },

    handleRun() {
      if (this.disabled) return;

      const vm = this;
      if (vm.isComplete) return;

      vm.isComplete = true;
      vm.completeList = [];
      vm.$emit("start");

      const items = vm.getItems(),
        times = genrateRunTimesSet(items.length, vm.incrementTimesRange);

      times.forEach((count, index) => {
        items[index].setTimes(count);
        items[index].setUseTimes(0);
      });

      items.forEach(item => item.handleMove());
    }
  }
};
</script>
