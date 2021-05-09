<template>
  <div class="m-verification-exp" v-if="!isMask">
    <canvas
      :id="canvasId"
      class="m-verification-common-canvas"
      :width="width"
      :height="height"
      :style="getCanvasStyle"
      ref="canvas"
    ></canvas>
    <slot>
      <div>
        <m-row type="flex" justify="between" align="center">
          <m-col>
            <input
              type="text"
              ref="input"
              :placeholder="type == 'exp' ? '有小数的话四舍五入' : ''"
              v-model="value"
            />
          </m-col>
          <m-col>
            <m-button size="small" @click="draw">看不清？换一张</m-button>
          </m-col>
        </m-row>
        <m-row style="margin-top: 10px;">
          <m-col>
            <m-button type="primary" @click="handleSubmit">提交验证</m-button>
          </m-col>
        </m-row>
      </div>
    </slot>
  </div>
  <div class="m-verification-exp" v-else>
    <m-scratch-card :maskColor="maskColor">
      <canvas
        :id="canvasId"
        class="m-verification-common-canvas"
        :width="width"
        :height="height"
        :style="getCanvasStyle"
        ref="canvas"
      ></canvas>
    </m-scratch-card>
    <slot>
      <div>
        <m-row type="flex" justify="between" align="center">
          <m-col>
            <input
              type="text"
              ref="input"
              :placeholder="type == 'exp' ? '有小数的话四舍五入' : ''"
              v-model="value"
            />
          </m-col>
          <m-col>
            <m-button size="small" @click="draw">看不清？换一张</m-button>
          </m-col>
        </m-row>
        <m-row style="margin-top: 10px;">
          <m-col>
            <m-button type="primary" @click="handleSubmit">提交验证</m-button>
          </m-col>
        </m-row>
      </div>
    </slot>
  </div>
</template>

<script>
//导入子组件
import { Row as MRow, Col as MCol } from "../../layout/index.js";
//导入工具函数
import {
  genrateUiniqueId,
  deleteProp,
  $on,
  $off,
  jsonClone,
  NATIVE_EVENT_NAMES
} from "@/utils/index.js";
//导入lib库
import createVerificationFactory from "./lib/VerificationFactory.js";

//导入子组件
import mButton from "../../button/index.js";
import mScratchCard from "../../scratch-card/index.js";

const typeList = ["exp", "code"];

export default {
  name: "MVerificationExp",

  components: {
    MRow,
    MCol,
    mButton,
    mScratchCard
  },

  props: {
    canvasId: {
      type: String,
      default: genrateUiniqueId()
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    },
    //绘图选项配置
    config: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: "code",
      validator(value) {
        return typeList.indexOf(value) !== -1;
      }
    },
    //是否区分大小写 可选 默认不区分
    isCaseSensitive: {
      type: Boolean,
      default: false
    },
    //是否有蒙罩层
    isMask: {
      type: Boolean,
      default: true
    },
    //蒙罩层的颜色
    maskColor: {
      type: String,
      default: "#aaa"
    },
    //画布是否有边框
    isBorder: {
      type: Boolean,
      default: true
    },
    //画布边框的颜色
    borderColor: {
      type: String,
      default: "#aaa"
    },
    //画布边框的宽度
    borderWidth: {
      type: String,
      default: "none"
    },
    //自定义触发刷新绘图的对象的选择器
    customRefreshTargetSelector: {
      type: String,
      default: ""
    },
    //自定义触发提交验证对象的选择器
    customSubmitTargetSelector: {
      type: String,
      default: ""
    },
    //自定义提供输入的对象的选择器
    customInputTargetSelecor: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isUseDefaultConfig: false,
      defaultConfig: {
        fontSize: 50,
        isStoke: false,
        fontColor: "yellow",
        backgroundColor: "#eee"
      },
      value: ""
    };
  },

  watch: {
    config(newVal) {
      this.isUseDefaultConfig = Object.keys(newVal).length > 0 ? false : true;
      this.draw();
    },

    width() {
      this.draw();
    },

    height() {
      this.draw();
    }
  },

  computed: {
    getCanvasStyle() {
      return {
        border: this.isBorder
          ? `${this.borderWidth} solid ${this.borderColor}`
          : ""
      };
    }
  },

  methods: {
    draw() {
      this.$emit("drawBefore");
      this.__veriThis__.draw(
        this.isUseDefaultConfig ? this.defaultConfig : jsonClone(this.config)
      );
    },

    test(value) {
      return this.__veriThis__.test(value, !this.isCaseSensitive);
    },

    handleSubmit() {
      const result = this.test(this.value);

      this.$emit("test", {
        expression: this.__veriThis__.expression.expression,
        expressionResult: this.__veriThis__.expression.expressionResult,
        inputValue: this.value,
        isCaseSensitive: this.isCaseSensitive,
        result: result
      });
    }
  },

  mounted() {
    if (Object.keys(this.config).length == 0) {
      this.isUseDefaultConfig = true;
    }

    const canvas = this.$refs.canvas;

    //这些对象不需要响应式
    this.__canvas__ = canvas;
    this.__canvasCtx__ = canvas.getContext("2d");
    this.__veriThis__ = createVerificationFactory(canvas, this.type);

    this.draw();

    //如果自定义了刷新按钮
    if (this.customRefreshTargetSelector) {
      //用document可能有一个问题 就是该组件mounted的时候 那个元素还没被渲染出来 用this.$el又只能局限在本组件范围内
      const refreshTarget = document.querySelector(
        this.customRefreshTargetSelector
      );

      if (refreshTarget && refreshTarget instanceof HTMLElement) {
        const handleRefreshTargetClick = () => this.draw();

        $on(refreshTarget, NATIVE_EVENT_NAMES.click, handleRefreshTargetClick);
        //保存事件处理程序 以便在beforeDestroy中移除它们
        this.__refreshTarget__ = refreshTarget;
        this.__refreshTargetHandler__ = handleRefreshTargetClick;
      }
    }
    if (this.customInputTargetSelecor && !this.$refs["input"]) {
      const inputTarget = document.querySelector(this.customInputTargetSelecor);

      if (inputTarget && inputTarget instanceof HTMLInputElement) {
        const handleInputTargetInput = e => (this.value = e.target.value);

        $on(inputTarget, NATIVE_EVENT_NAMES.input, handleInputTargetInput);

        this.__inputTarget__ = inputTarget;
        this.__inputTargetHandler__ = handleInputTargetInput;
      }
    }
    if (this.customSubmitTargetSelector) {
      const submitTarget = document.querySelector(
        this.customSubmitTargetSelector
      );

      if (submitTarget && submitTarget instanceof HTMLElement) {
        const handleSubmitTargetClick = () => this.handleSubmit();

        $on(submitTarget, NATIVE_EVENT_NAMES.click, handleSubmitTargetClick);

        this.__submitTarget__ = submitTarget;
        this.__submitTargetHandler__ = handleSubmitTargetClick;
      }
    }
  },

  beforeDestroy() {
    //清除引用
    this.__canvas__ = null;
    this.__canvasCtx__ = null;
    this.__veriThis__ = null;

    //清除mounted中的注册的事件处理程序 防止内存泄露
    if (this.__refreshTarget__) {
      $off(
        this.__refreshTarget__,
        NATIVE_EVENT_NAMES.click,
        this.__refreshTargetHandler__
      );

      this.__refreshTargetHandler__ = null;

      deleteProp(this, "__refreshTarget__");
      deleteProp(this, "__refreshTargetHandler__");
    }
    if (this.__inputTarget__) {
      $off(
        this.__inputTarget__,
        NATIVE_EVENT_NAMES.input,
        this.__inputTargetHandler__
      );

      this.__inputTargetHandler__ = null;

      deleteProp(this, "__inputTarget__");
      deleteProp(this, "__inputTargetHandler__");
    }
    if (this.__submitTarget__) {
      $off(
        this.__submitTarget__,
        NATIVE_EVENT_NAMES.click,
        this.__submitTargetHandler__
      );

      this.__submitTargetHandler__ = null;

      deleteProp(this, "__submitTarget__");
      deleteProp(this, "__submitTargetHandler__");
    }
  }
};
</script>
