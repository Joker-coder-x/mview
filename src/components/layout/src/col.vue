<script>
import { TYPE_LIST } from "./types.js";

export default {
  name: "MCol",

  props: {
    //栅格占据的列数
    span: {
      type: Number,
      default: 24
    },
    //自定义元素标签
    tag: {
      type: String,
      default: "div"
    },
    //栅格左侧的间隔格数
    offset: {
      type: Number,
      default: 0
    },
    //栅格向右移动格数
    push: {
      type: Number,
      default: 0
    },
    //栅格向左移动格数
    pull: {
      type: Number,
      default: 0
    }
    //响应式功能后面再加...
  },

  computed: {
    gutter() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== "MRow") {
        parent = parent.$parent;
      }

      return parent ? parent.gutter : 0;
    }
  },

  render(h) {
    const classList = ["m-col"],
      style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + "px";
      style.paddingRight = style.paddingLeft;
    }

    ["span", "offset", "push", "pull"].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        if (
          !(
            prop === "span" &&
            this.$parent.type === TYPE_LIST[1] &&
            this.span === 24
          )
        ) {
          classList.push(`m-col-${prop}-${this[prop]}`);
        }
      }
    });

    return h(
      this.tag,
      {
        class: classList,
        style
      },
      this.$slots.default
    );
  }
};
</script>

<style lang="less">
// @counter: 24;
// .m-col {
//   box-sizing: border-box;
//   background: transparent !important;
// }

// .m-col-loop(@index) when (@index > 0) {
//   .m-col-loop(@index - 1);

//   @rate: (@index / 24) * 100%;
//   .m-col-span-@{index} {
//     flex: 0 0 @rate;
//     max-width: @rate;
//     display: block;
//   }
//   .m-col-push-@{index} {
//     position: relative;
//     left: @rate;
//   }
//   .m-col-pull-@{index} {
//     position: relative;
//     right: @rate;
//   }
//   .m-col-offset-@{index} {
//     margin-left: @rate;
//   }
// }
// .m-col-loop(@counter);
</style>
