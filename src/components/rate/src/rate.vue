<template>
  <div class="m-rate">
    <span
      v-for="item in count"
      :key="item"
      class="m-rate-item"
      :style="{
        marginRight: (item === count ? 0 : spacing) + 'px',
        color: voidColor
      }"
      @mousemove="handleMouseMove($event, item)"
      @mouseenter="handleEnterItem(item)"
      @mouseleave="handleLeaveItem(item)"
      @click="handleItemClick(item)"
    >
      <template v-if="!showCharacter">
        <span :class="getIcon"></span>
        <span
          :class="[getIcon, 'star-after']"
          :style="getStarAfterStyle(item)"
        ></span>
      </template>
      <template v-else>
        <span>{{ character }}</span>
        <span class="star-after" :style="getStarAfterStyle(item)">{{
          character
        }}</span>
      </template>
    </span>
    <span
      v-if="showScore"
      :style="{ color: textColor, marginLeft: textSpacing + 'px' }"
      ><slot>{{ currentValue }}</slot></span
    >
    <span
      v-else-if="showText && texts.length > 0"
      :style="{ color: textColor, marginLeft: textSpacing + 'px' }"
      >{{ lastActiveIndex > 0 ? texts[lastActiveIndex - 1] : texts[0] }}
    </span>
  </div>
</template>

<script>
//导入助手函数
import { getMousePosElWidthRate } from "@/utils/index.js";

export default {
  name: "MRate",

  props: {
    //当前 star 数，可以使用 v-model 双向绑定数据
    value: {
      type: [Number, String],
      default: 0
    },
    //star 总数
    count: {
      type: Number,
      default: 5
    },
    //间距 默认10 单位像素
    spacing: {
      type: Number,
      default: 10,
      validator(value) {
        return value >= 0;
      }
    },
    //辅助文字的间距
    textSpacing: {
      type: Number,
      default: 10,
      validator(value) {
        return value >= 0;
      }
    },
    //只读
    disabled: {
      type: Boolean,
      default: false
    },
    //展现分数
    showScore: {
      type: Boolean,
      default: false
    },
    //辅助文字的颜色
    textColor: {
      type: String,
      default: "#F7B84F"
    },
    //是否允许半选
    allowHalf: {
      type: Boolean,
      default: false
    },
    //是否允许小数
    float: {
      type: Boolean,
      default: false
    },
    //自定义图标
    customIcon: {
      type: String,
      default: ""
    },
    //自定义character
    character: {
      type: String,
      default: ""
    },
    //辅助文字数组
    texts: {
      type: Array,
      default: () => ["极差", "失望", "一般", "满意", "惊喜"]
    },
    //展示辅助文字
    showText: {
      type: Boolean,
      default: false
    },
    //未选择中图标的颜色或者字符的颜色
    activeColor: {
      type: String,
      default: "#F7B84F"
    },
    //未选择中图标的颜色或者字符的颜色
    voidColor: {
      type: String,
      default: "#E9E9E9"
    },
    //低分和中等分数的界限值，值本身被划分在低分中
    lowThreshold: {
      type: Number,
      default: 2
    },
    //高分和中等分数的界限值，值本身被划分在高分中
    highThreshold: {
      type: Number,
      default: 4
    },
    //icon 的颜色。共有 3 个元素，为 3 个分段所对应的颜色
    colors: {
      type: Array,
      default: () => ["#99A9BF", "#F7BA2A", "#FF9900"]
    },
    //区分颜色
    diffColor: {
      type: Boolean,
      default: true
    },
    //最大值
    max: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      currentValue: this.value,
      isLeave: false,
      activeIndex: -1,
      lastItemWidthRate: this.allowHalf ? 0.5 : 0,
      lastActiveIndex: -1
    };
  },

  watch: {
    value(newValue) {
      this.currentValue = newValue;
    }
  },

  computed: {
    getIcon() {
      return this.customIcon || "mIcon-star-full";
    },
    showCharacter() {
      return this.customIcon === "" && this.character !== "";
    }
  },

  methods: {
    getStarAfterStyle(item) {
      let width = "0",
        color = this.activeColor;

      //动态设置颜色
      if (this.diffColor && this.colors.length > 0) {
        if (this.currentValue <= this.lowThreshold) {
          color = this.colors[0] || this.activeColor;
        } else if (this.currentValue >= this.highThreshold) {
          color = this.colors[2] || this.activeColor;
        } else {
          color = this.colors[1] || this.activeColor;
        }

        if (this.activeIndex >= 0) {
          if (this.activeIndex <= this.lowThreshold) {
            color = this.colors[0] || this.activeColor;
          } else if (this.activeIndex >= this.highThreshold) {
            color = this.colors[2] || this.activeColor;
          } else {
            color = this.colors[1] || this.activeColor;
          }
        }
      }

      //动态设置宽度
      const currentValue = parseFloat(this.currentValue),
        lastActiveIndex = this.lastActiveIndex;

      if (this.activeIndex >= 0) {
        if (item < this.activeIndex) {
          width = "100%";
        } else if (item === this.activeIndex) {
          width =
            this.float || this.allowHalf
              ? `${this.lastItemWidthRate * 100}%`
              : "100%";
        }
      } else {
        if (item <= parseFloat(currentValue) || item < lastActiveIndex) {
          width = "100%";
        } else {
          if (
            item > currentValue &&
            currentValue.toString().indexOf(".") > -1 &&
            item - currentValue < 1
          ) {
            width = `${(currentValue % 1) * 100}%`;
          } else if (item === lastActiveIndex) {
            width =
              this.float || this.allowHalf
                ? `${this.lastItemWidthRate * 100}%`
                : "100%";
          } else if (item > lastActiveIndex) {
            width = "0";
          }
        }
      }

      return {
        width: width,
        color: color
      };
    },
    handleEnterItem(item) {
      if (this.disabled) return;
      if (item > this.max) return;

      this.isLeave = false;
      this.activeIndex = item;
    },
    handleLeaveItem() {
      if (this.disabled) return;

      this.isLeave = true;
      //交互优化
      setTimeout(() => {
        //防止队列中的冗余回调修改model
        if (this.isLeave) {
          this.activeIndex = -1;
        }
      }, 100);
    },
    handleItemClick(item) {
      if (this.disabled) return;
      if (item > this.max) return;

      this.lastActiveIndex = item;

      if (this.float || this.allowHalf) {
        if (item >= 1) {
          item = item - 1 + parseFloat(this.lastItemWidthRate);
        }

        if (item.toString().indexOf(".") > -1) {
          item = item.toFixed(1);
        }
      }

      this.currentValue = item;
      this.currentValue =
        this.currentValue > this.max ? this.max : this.currentValue;

      this.$emit("input", this.currentValue);
      this.$emit("change", this.currentValue);
    },
    handleMouseMove(e) {
      if (this.disabled) return;

      requestAnimationFrame(() => {
        if (!this.float && !this.allowHalf) {
          return;
        }

        const el = e.target,
          clientPos = {
            x: e.clientX,
            y: e.clientY
          };

        let widthRate = getMousePosElWidthRate(el, clientPos).toFixed(2);
        if (widthRate < 0) {
          widthRate = 0;
        }

        if (this.allowHalf) {
          if (widthRate < 0.7) {
            widthRate = 0.5;
          } else {
            widthRate = 1;
          }
        }

        this.lastItemWidthRate = widthRate;
      });
    }
  },

  created() {
    if (this.currentValue > this.max) {
      this.currentValue = this.max;
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
    }
  }
};
</script>
