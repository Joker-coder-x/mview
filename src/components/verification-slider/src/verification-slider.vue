<template>
  <div class="m-verification-slider">
    <canvas
      ref="canvas"
      class="main-canvas"
      :width="width"
      :height="height"
    ></canvas>
    <canvas
      ref="clip"
      class="clip-canvas"
      width="100"
      :height="height"
    ></canvas>
    <span class="mIcon-spinner11 refresh" @click="handleReset"></span>
    <div class="slider-warp" ref="sliderWarp" :style="getSliderWarpStyle">
      <div
        :class="[
          'slider unselect',
          !showError && !showSuccess ? 'mIcon-arrow-right2' : '',
          isDown ? 'hover' : '',
          showError ? 'mIcon-cross error' : '',
          showSuccess ? 'mIcon-check success' : ''
        ]"
        ref="slider"
        :style="getSliderStyle"
        v-show="useErrorTimes !== maxErrorTimes"
      ></div>
      <div class="slider-background" :style="getSliderBackgroundStyle"></div>
      <span class="slider-warp-plhr" v-show="useErrorTimes !== maxErrorTimes">
        {{ placeholder }}</span
      >
      <span
        class="slider-warp-error-msg"
        @click="handleReDo"
        v-show="useErrorTimes === maxErrorTimes"
      >
        <span class="mIcon-cross-circle-fill"> 失败次数过多，点击重试</span>
      </span>
    </div>
  </div>
</template>

<script>
//导入lib
import VerificationSlider from "./lib/VerificationSlider.js";
//导入助手函数
import {
  mergeOptions,
  deleteProp,
  $on,
  $off,
  NATIVE_EVENT_NAMES
} from "@/utils/index.js";

const shapeList = ["square", "circle"];

export default {
  name: "MVerificationSlider",

  props: {
    //canvs宽度
    width: {
      type: Number,
      default: 500
    },

    //canvas高度
    height: {
      type: Number,
      default: 300
    },

    //canvas中的图片列表
    imgList: {
      type: Array,
      default: () => []
    },

    //slider回弹延迟 毫秒
    timeout: {
      type: Number,
      default: 500
    },

    //slider回弹时每帧回退的距离 单位 像素
    backDistance: {
      type: Number,
      default: 4
    },

    //配置信息
    config: {
      type: Object,
      default: () => ({})
    },

    //滑块的形状
    sliderShape: {
      type: String,
      default: "square",
      validator(value) {
        return shapeList.indexOf(value) !== -1;
      }
    },

    //占位内容
    placeholder: {
      type: String,
      default: "向右拖动滑块填充拼图"
    },

    //最大失败次数
    maxErrorTimes: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      startTime: 0,
      endTime: 0,
      useTime: 0,
      isDown: false,
      lastX: 0,
      curX: 0,
      movable: 0, //可移动的区域
      left: 0,
      showError: false,
      showSuccess: false,
      useErrorTimes: 0,
      defaultConfig: {
        imgList: this.imgList, //用来绘制的图片数组 可是是Image对象或者img标签 也可以是正确的文件路径
        canvas: null, //原生画布,绘制图片的画布
        clipCvs: null, //被裁剪用来移动的拼图所在的canvas
        borderColor: "yellow", //裁剪拼图的边框颜色     可选  默认 灰色
        borderWidth: 4, // 裁剪拼图的边框的宽度   可选  默认 4 单位像素
        clipAreaWidth: 50, //裁剪块的宽度  可选 默认 50 单位像素
        cilpAreaHeight: 50, //裁剪块的高度  可选 默认 50 单位像素
        radius: 10 //拼图的附加圆的半径大小 可选 默认 10 单位像素
      }
    };
  },

  watch: {
    config(newVal) {
      this.defaultConfig = mergeOptions(this.defaultConfig, newVal, [
        "canvas",
        "clipCvs"
      ]);
    }
  },

  computed: {
    getSliderWarpStyle() {
      return {
        borderRadius: (this.sliderShape === shapeList[1] ? 20 : 2) + "px"
      };
    },

    getSliderStyle() {
      if (this.sliderShape == shapeList[1]) {
        return {
          borderRadius: "50%"
        };
      }

      return {};
    },

    getSliderBackgroundStyle() {
      let borderColor = "var(--primary)",
        backgroundColor = "#CEE5FA",
        width =
          (this.sliderShape === shapeList[1] ? this.left + 40 : this.left) +
          "px";
      if (this.showError || this.useErrorTimes == this.maxErrorTimes) {
        borderColor = "var(--danger)";
        backgroundColor = "#FCE1E1";
      } else if (this.showSuccess) {
        borderColor = "var(--success)";
        backgroundColor = "#D2F4EF";
      }

      if (this.useErrorTimes == this.maxErrorTimes) {
        width = "100%";
      }

      return {
        width: width,
        borderRadius: this.sliderShape === shapeList[1] ? "20px" : "2px",
        backgroundColor: backgroundColor,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`
      };
    }
  },

  mounted() {
    const vm = this,
      sliderWarp = vm.$refs.sliderWarp,
      slider = vm.$refs.slider;

    vm.defaultConfig = mergeOptions(vm.defaultConfig, vm.config, [
      "canvas",
      "clipCvs"
    ]);
    vm.defaultConfig.canvas = vm.$refs.canvas;
    vm.defaultConfig.clipCvs = vm.$refs.clip;

    //动态计算可移动的区域
    vm.movable = sliderWarp.clientWidth - slider.offsetWidth;

    const handleOnLoad = function() {
      vm.__hanldeMouseDown__ = e => vm.handleMouseDown(e);
      vm.__handleMouseMove__ = e => vm.handleMouseMove(e);
      vm.__handleMouseUp__ = e => vm.handleMouseUp(e);
      $on(slider, NATIVE_EVENT_NAMES.mousedown, vm.__hanldeMouseDown__);
      $on(document, NATIVE_EVENT_NAMES.mousemove, vm.__handleMouseMove__);
      $on(document, NATIVE_EVENT_NAMES.mouseup, vm.__handleMouseUp__);
    };
    //这个对象不需要进行响应式处理
    vm.__veriThis__ = new VerificationSlider(handleOnLoad, vm.defaultConfig);
  },

  beforeDestroy() {
    const vm = this;
    if (vm.__hanldeMouseDown__) {
      $off(
        this.$refs.slider,
        NATIVE_EVENT_NAMES.mousedown,
        vm.__hanldeMouseDown__
      );
      vm.__hanldeMouseDown__ = null;
      deleteProp(vm, "__hanldeMouseDown__");
    }
    if (vm.__handleMouseMove__) {
      $off(document, NATIVE_EVENT_NAMES.mousemove, vm.__handleMouseMove__);
      vm.__handleMouseMove__ = null;
      deleteProp(vm, "__handleMouseMove__");
    }
    if (vm.__handleMouseUp__) {
      $off(document, NATIVE_EVENT_NAMES.mouseup, vm.__handleMouseUp__);
      vm.__handleMouseUp__ = null;
      deleteProp(vm, "__handleMouseUp__");
    }

    this.__veriThis__ = null;
  },

  methods: {
    handleNext() {
      this.__veriThis__.next();
    },

    handleMoveSlider(distance) {
      const slider = this.$refs.slider,
        movable = this.movable;

      let left = slider.offsetLeft + distance;
      //限制滑块不能移出边框范围之外
      if (left <= 0) left = 0;
      if (left >= movable) left = movable;
      this.left = left;
      //设置偏移量
      slider.style.left = `${left}px`;
      //设置裁剪块的偏移量
      this.__veriThis__.setClipCvsOffsetLeft(left);
    },

    handleReset() {
      const vm = this,
        slider = vm.$refs.slider,
        left = slider.offsetLeft;

      if (left > 0) {
        vm.handleMoveSlider(vm.backDistance * -1);
        requestAnimationFrame(vm.handleReset);
      } else if (left == 0) {
        this.showError = false;
        this.showSuccess = false;
        this.handleNext();
      }
    },

    handleMouseDown(e) {
      const vm = this;

      if (!vm.isDown) {
        vm.isDown = true;
        vm.lastX = e.clientX;
        //保存开始滑动的时间
        vm.starTime = new Date().getTime();
      }
    },

    handleMouseMove(e) {
      const vm = this;

      if (vm.isDown) {
        //自带节流buff 获得最平滑的动画
        requestAnimationFrame(() => {
          //双重锁 因为requestAnimationFrame向队列中添加一个任务 如果isDown=false 但是队列中还缓存着大量任务，
          //此时这些任务还会去修改dom，导致耗费性能，所有在这里添加一个双重锁定 阻止沉余的任务修改dom
          if (vm.isDown) {
            //保存当前clientX
            vm.curX = e.clientX;
            //计算移动的偏差
            vm.handleMoveSlider(vm.curX - vm.lastX);
            vm.lastX = vm.curX;
          }
        });
      }
    },

    handleMouseUp() {
      const vm = this;

      if (vm.isDown) {
        vm.isDown = false;
        //计算耗时
        vm.endTime = new Date().getTime();
        vm.useTime = Math.floor((vm.endTime - vm.starTime) / 1000);
        if (vm.useTime == 0) vm.useTime = 1;
        //验证
        const result = vm.__veriThis__.verification();

        result ? vm.handleSuccess() : vm.handleError();
        //发送信号
        vm.$emit("test", {
          result: result,
          useTime: vm.useTime
        });

        //重置滑块和裁剪区域
        if (!result) {
          setTimeout(() => {
            requestAnimationFrame(vm.handleReset);
          }, vm.timeout);
        }
      }
    },

    handleError() {
      this.useErrorTimes++;
      this.showError = true;
    },

    handleSuccess() {
      this.showSuccess = true;
    },

    handleReDo() {
      this.useErrorTimes = 0;
      this.$nextTick(() => {
        this.handleReset();
      });
    }
  }
};
</script>
