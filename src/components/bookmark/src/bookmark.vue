<template>
  <div
    :class="['m-bookmark', type]"
    :style="getBookmarkStyle"
    @click="handleClick"
  >
    <span><slot></slot></span>
    <m-triangle
      class="before"
      ref="before"
      :style="getBeforeStyle"
      :color="getColor().before"
      :size="getBeforeSize()"
      :position="getBeforePosition"
      :rate="1"
    >
    </m-triangle>
    <m-triangle
      class="after"
      :size="afterSize"
      :color="getColor().after"
      :style="getAfterStyle"
      :position="getAfterPosition"
    >
    </m-triangle>
  </div>
</template>

<script>
//导入子组件
import mTriangle from "../../triangle/index.js";

//导入样式配置信息
import {
  HollowOutStyleConfig,
  CommonStyleConfig,
  TypeColorConfig
} from "./style.js";

//朝向列表
const positionList = ["left", "right", "top", "bottom"];

export default {
  name: "MBookmark",

  props: {
    //书签的类型
    type: {
      type: String,
      default: "primary"
    },
    //书签的朝向
    position: {
      type: String,
      default: "left",
      validator(value) {
        return positionList.indexOf(value) !== -1;
      }
    },
    //before的颜色
    beforeColor: {
      type: String,
      default: ""
    },
    //after的颜色
    afterColor: {
      type: String,
      default: ""
    },
    //是否显示镂空样式
    hollowOut: {
      type: Boolean,
      default: false
    },
    //镂空的颜色
    hollowOutColor: {
      type: String,
      default: "white"
    },
    //after的大小
    afterSize: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      curWarpWidth: 0,
      curWarpHeight: 0
    };
  },

  components: {
    mTriangle
  },

  computed: {
    //动态设置bookmark的样式
    getBookmarkStyle() {
      let styleObj;

      switch (this.position) {
        case positionList[0]:
          styleObj = {
            borderTopRightRadius: "2px",
            borderBottomRightRadius: "2px",
            borderBottom: "2px solid " + this.getColor().after
          };
          break;
        case positionList[1]:
          styleObj = {
            borderTopLeftRadius: "2px",
            borderBottomLeftRadius: "2px",
            borderBottom: "2px solid " + this.getColor().after
          };
          break;
        case positionList[2]:
          styleObj = {
            writingMode: "vertical-rl",
            borderTopLeftRadius: "2px",
            borderTopRightRadius: "2px",
            borderRight: "2px solid " + this.getColor().after
          };
          break;
        case positionList[3]:
          styleObj = {
            writingMode: "vertical-rl",
            borderBottomLeftRadius: "2px",
            borderBottomRightRadius: "2px",
            borderLeft: "2px solid " + this.getColor().after
          };
          break;
        default:
          break;
      }

      if (!this.hollowOut) {
        styleObj.boxShadow = "0 10px 15px rgb(168, 161, 161)";
      } else {
        styleObj[`padding-${this.position}`] = this.getBeforeSize() + 10 + "px";
      }

      return styleObj;
    },
    //动态设置before的样式
    getBeforeStyle() {
      return this.hollowOut
        ? HollowOutStyleConfig[this.position].beforeStylePosition
        : CommonStyleConfig[this.position].beforeStylePosition;
    },
    //动态设置after的样式
    getAfterStyle() {
      return this.hollowOut
        ? HollowOutStyleConfig[this.position].afterStylePosition
        : CommonStyleConfig[this.position].afterStylePosition;
    },
    //动态设置before的朝向
    getBeforePosition() {
      return this.hollowOut
        ? HollowOutStyleConfig[this.position].beforePosition
        : CommonStyleConfig[this.position].beforePosition;
    },
    //动态设置after的朝向
    getAfterPosition() {
      return this.hollowOut
        ? HollowOutStyleConfig[this.position].afterPosition
        : CommonStyleConfig[this.position].afterPosition;
    }
  },

  methods: {
    //获取before的大小
    getBeforeSize() {
      let size = 12;
      if (
        this.position == positionList[0] ||
        this.position == positionList[1]
      ) {
        size = this.curWarpHeight;
      } else if (
        this.position == positionList[2] ||
        this.position == positionList[3]
      ) {
        size = this.curWarpWidth;
      }
      return size / 2;
    },
    //获取before和after的大小
    getColor() {
      const colors = JSON.parse(JSON.stringify(TypeColorConfig[this.type]));
      if (this.hollowOut) colors.before = this.hollowOutColor;
      return colors;
    },
    //监听标签点击
    handleClick(event) {
      this.$emit("click", event);
    }
  },

  mounted() {
    this.curWarpWidth = this.$el.offsetWidth;
    this.curWarpHeight = this.$el.offsetHeight;
  }
};
</script>

<style scoped>
.m-bookmark {
  display: inline-block;
  position: relative;
  text-align: center;
  padding: 1rem;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 520;
  letter-spacing: 2px;
}

.m-bookmark:hover {
  opacity: 0.8;
}

.m-bookmark .before {
  position: absolute !important;
}

.m-bookmark .after {
  position: absolute !important;
}
</style>
