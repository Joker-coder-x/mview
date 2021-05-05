<template>
  <div
    class="m-switch"
    ref="switchRoot"
    :class="[disabled ? 'is-disabled' : '']"
    @keydown.enter="handleChange"
    @click.capture="handleChange"
  >
    <label
      class="m-switch__lable"
      v-if="showInactiveText && !inlineText"
      :style="getSwitchInactiveTextStyle"
      :class="[disabled ? 'is-disabled' : '']"
      >{{ inactiveText }}</label
    >
    <div class="m-switch__inner">
      <input
        type="checkbox"
        :class="[disabled ? 'is-disabled' : '']"
        :checked="currentValue"
        :name="name"
        :id="id"
        ref="input"
        @click="handleNativeClick"
        :disabled="disabled"
      />
      <div
        class="m-switch-warp"
        :class="[disabled ? 'is-disabled' : '']"
        :style="getSwitchWarpStyle"
      >
        <div class="m-switch__slider"></div>
        <div class="m-switch__bg" :style="getSwitchBgStyle"></div>
        <span
          class="inline-text-inactive"
          v-if="inlineText && showInactiveText && currentValue"
          >{{ inactiveText }}</span
        >
        <span
          class="inline-text-active"
          v-if="inlineText && showActiveText && !currentValue"
          >{{ activeText }}</span
        >
      </div>
    </div>
    <label
      class="m-switch__lable"
      v-if="showActiveText && !inlineText"
      :style="getSwitchActiveTextStyle"
      :class="[disabled ? 'is-disabled' : '']"
      >{{ activeText }}</label
    >
  </div>
</template>

<script>
//导入助手函数
import { lightenDarkenColor, genrateUiniqueId } from "@/utils/index.js";

const DEFAULT_WIDTH = 40, //默认Switch宽度 不包括text文字
  DEFAULT_HEIGHT = 15, //默认Switch高度
  MORE_LIGHT_NUM = 80, //比原颜色的亮度
  DEFAULT_OUTLINE_WIDTH = 2; //默认的outline宽度

export default {
  name: "MSwitch",

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    //指定当前是否选中，可以使用 v-model 双向绑定数据
    value: {
      type: Boolean,
      default: false
    },
    //switch的宽度
    width: {
      type: Number,
      default: DEFAULT_WIDTH,
      validator(value) {
        return value >= 0;
      }
    },
    //switch的高度
    height: {
      type: Number,
      default: DEFAULT_HEIGHT,
      validator(value) {
        return value >= 0;
      }
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //switch 打开时的背景色
    activeColor: {
      type: String,
      default: "#409EFF"
    },
    //switch 关闭时的背景色
    inactiveColor: {
      type: String,
      default: "#C0CCDA"
    },
    //默认状态下的文本颜色
    defaultTextColor: {
      type: String,
      default: "#303133"
    },
    //switch 打开时的文字描述的颜色
    activeTextColor: {
      type: String,
      default: "#409eff"
    },
    //switch 关闭时的文字描述的颜色
    inactiveTextColor: {
      type: String,
      default: "#f56c6c"
    },
    //switch 打开时的文字描述
    activeText: {
      type: String,
      default: ""
    },
    //switch 关闭时的文字描述
    inactiveText: {
      type: String,
      default: ""
    },
    //辅助文字的间距
    textSpacing: {
      type: Number,
      default: 10,
      validator(value) {
        return value >= 0;
      }
    },
    outlineWidth: {
      type: Number,
      default: DEFAULT_OUTLINE_WIDTH
    },
    //native的name
    name: {
      type: String,
      default: ""
    },
    //内联的文字
    inlineText: {
      type: Boolean,
      default: false
    },
    beforeChange: {
      type: Function
    },
    //native id
    id: String
  },

  data() {
    return {
      currentValue: this.value,
      innerDisabled: false,
      moreLightActiveColor: lightenDarkenColor(
        this.activeColor,
        MORE_LIGHT_NUM
      ),
      moreLightInactiveColor: lightenDarkenColor(
        this.inactiveColor,
        MORE_LIGHT_NUM
      ),
      openId: null
    };
  },

  watch: {
    value(newVal) {
      this.currentValue = newVal;
      this.changeOutlineColor();
    },
    activeColor(newVal) {
      this.moreLightActiveColor = lightenDarkenColor(newVal, MORE_LIGHT_NUM);
    },
    inactiveColor(newVal) {
      this.moreLightInactiveColor = lightenDarkenColor(newVal, MORE_LIGHT_NUM);
    }
  },

  computed: {
    getSwitchBgStyle() {
      return {
        backgroundColor: this.activeColor
      };
    },

    getSwitchWarpStyle() {
      return {
        backgroundColor: this.inactiveColor
      };
    },

    getSwitchActiveTextStyle() {
      return {
        color:
          this.currentValue === true
            ? this.activeTextColor || this.defaultTextColor
            : this.defaultTextColor,
        marginLeft: this.textSpacing + "px"
      };
    },

    getSwitchInactiveTextStyle() {
      return {
        color:
          this.currentValue === false
            ? this.inactiveTextColor || this.defaultTextColor
            : this.defaultTextColor,
        marginRight: this.textSpacing + "px"
      };
    },

    showActiveText() {
      return this.activeText !== "";
    },

    showInactiveText() {
      return this.inactiveText !== "";
    }
  },

  methods: {
    changeOutlineColor() {
      const color = this.currentValue
        ? this.moreLightActiveColor
        : this.moreLightInactiveColor;
      this.$refs["switchRoot"].style.setProperty("--outline-color", `${color}`);
    },

    doChange() {
      this.currentValue = !this.currentValue;
      this.$emit("change", this.currentValue);
      this.changeOutlineColor();
    },

    handleChange() {
      if (this.disabled) return;
      this.innerDisabled = false;

      if (Promise && this.beforeChange) {
        const result = this.beforeChange();

        this.innerDisabled = true;

        if (result instanceof Promise) {
          //设置唯一标识
          const openId = (this.openId = genrateUiniqueId());
          result.then(
            () => {
              if (openId !== this.openId) return;
              this.innerDisabled = false;
              this.doChange();
            },
            () => (this.innerDisabled = false)
          );
        } else if (result !== false) {
          this.innerDisabled = false;
          this.doChange();
        } else {
          this.innerDisabled = false;
        }
      } else {
        this.doChange();
      }
    },

    handleNativeClick(e) {
      if (this.innerDisabled === true) {
        e.preventDefault();
      }
    }
  },

  mounted() {
    const switchRoot = this.$refs["switchRoot"];
    //动态设置switch大小
    if (this.width !== DEFAULT_WIDTH) {
      switchRoot.style.setProperty("--warp-width", `${this.width}px`);
    }
    if (this.height !== DEFAULT_HEIGHT) {
      switchRoot.style.setProperty("--warp-height", `${this.height}px`);
    }
    if (this.outlineWidth !== DEFAULT_OUTLINE_WIDTH) {
      switchRoot.style.setProperty("--outline-width", `${this.outlineWidth}px`);
    }
  }
};
</script>

<style lang="less">
.m-switch {
  --font-size: 18px;
  --warp-width: 40px;
  --warp-height: 15px;
  --outline-color: #b4d9ff;
  --outline-width: 2px;

  @font-size :var(--font-size);
  @warp-width: var(--warp-width);
  @warp-height: var(--warp-height);
  @outline-color: var(--outline-color);
  @outline-width: var(--outline-width);

  font-size: @font-size;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;

  .m-switch__lable {
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
  }

  .m-switch__inner {
    display: inline-block;
    position: relative;
    vertical-align: middle;

    input[type="checkbox"] {
      opacity: 0;
      width: @warp-width;
      height: @warp-height;
      position: relative;
      z-index: 9;
      cursor: pointer;

      &:active + .m-switch-warp > .m-switch__slider {
        transform: scaleX(1.4);
        border-radius: 20px;
      }

      &:checked:active + .m-switch-warp > .m-switch__slider {
        transform: translateX(calc(@warp-width - @warp-height)) scaleX(1.4);
        border-radius: 20px;
      }

      &:checked + .m-switch-warp > .m-switch__slider {
        transform: translateX(calc(@warp-width - @warp-height));
      }

      &:checked + .m-switch-warp > .m-switch__bg {
        transform: translateX(0);
      }

      &:focus + .m-switch-warp {
        box-shadow: 0 0 0 @outline-width @outline-color;
      }
    }

    .m-switch-warp {
      position: absolute;
      left: 0;
      top: 0;
      width: @warp-width;
      height: @warp-height;
      border-radius: 20px;
      z-index: 2;
      overflow: hidden;
      padding: 2px;
      box-shadow: 0 0 0 @outline-width transparent;
      transition-property: box-shadow;
      transition-delay: 0.2s;
      transition-duration: 0.2s;

      .m-switch__slider {
        position: relative;
        width: @warp-height;
        height: @warp-height;
        border-radius: 50%;
        box-sizing: border-box;
        transform: translateX(0);
        z-index: 2;
        background-color: white;
        transition: 0.25s;
        transition-timing-function: ease-in-out;
      }

      .m-switch__bg {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        border-radius: 20px;
        transform: translateX(-100%);
        transition: 0.4s;
        z-index: -1;
        box-sizing: border-box;
      }

      .inline-text-inactive,
      .inline-text-active {
        position: absolute;
        font-size: 0.7em;
        line-height: 0.7em;
        top: 50%;
        transform: translateY(-50%) scale(0.8);
        z-index: 5;
      }

      .inline-text-inactive {
        left: 10%;
        color: white;
      }

      .inline-text-active {
        right: 10%;
        color: white;
      }
    }
  }
}
</style>
