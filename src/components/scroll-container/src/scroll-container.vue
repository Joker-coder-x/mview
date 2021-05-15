<template>
  <div
    :class="'scroll-container' | prefixClass"
    :style="getContainerStyle"
    ref="containerElm"
  >
    <div
      :class="'scroll-container--inner' | prefixClass"
      :style="getInnerStyle"
      @scroll="handleScroll"
      ref="scrollElm"
    >
      <div :style="getElementStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { StyleMixin } from "@/mixins/index.js";
import { hasOwn } from "@/utils/index.js";

const OVERFLOW_VALUES = ["auto", "hidden", "scroll", "visible"];

export default {
  name: "MScrollContainer",

  mixins: [StyleMixin],

  props: {
    value: {
      type: Object,
      default: () => ({ scrollLeft: 0, scrollTop: 0 }),
      validator(value) {
        return (
          hasOwn(value, "scrollLeft") &&
          value.scrollLeft >= 0 &&
          hasOwn(value, "scrollTop") &&
          value.scrollTop >= 0
        );
      }
    },

    width: {
      type: String,
      required: true
    },

    height: {
      type: String,
      required: true
    },

    overflowX: {
      type: String,
      default: "hidden",
      validator(value) {
        return OVERFLOW_VALUES.indexOf(value.trim()) > -1;
      }
    },

    overflowY: {
      type: String,
      default: "scroll",
      validator(value) {
        return OVERFLOW_VALUES.indexOf(value.trim()) > -1;
      }
    }
  },

  data() {
    return {
      currentValue: this.value,
      currentElementWidth: 0,
      currentElementHeight: 0
    };
  },

  computed: {
    getContainerStyle() {
      return {
        width: this.width,
        height: this.height
      };
    },

    getInnerStyle() {
      return {
        overflowX: this.overflowX,
        overflowY: this.overflowY
      };
    },

    getElementStyle() {
      const styleObj = {
        width: this.width,
        height: this.height
      };

      if (this.currentElementWidth) {
        styleObj.width = this.currentElementWidth + "px";
      }
      if (this.currentElementHeight) {
        styleObj.height = this.currentElementHeight + "px";
      }

      return styleObj;
    }
  },

  watch: {
    width() {
      this.$nextTick(() => {
        if (this.containerElm) {
          this.currentElementWidth = this.containerElm.clientWidth;
        }
      });
    },

    height() {
      this.$nextTick(() => {
        if (this.containerElm) {
          this.currentElementHeight = this.containerElm.clientHeight;
        }
      });
    },

    value: {
      deep: true,
      immediate: true,
      handler(value) {
        if (this.scrollElm) {
          this.scrollElm.scrollLeft = value.scrollLeft;
          this.scrollElm.scrollTop = value.scrollTop;
        }
      }
    }
  },

  mounted() {
    const refs = this.$refs;
    this.scrollElm = refs.scrollElm;
    this.containerElm = refs.containerElm;

    if (this.scrollElm) {
      this.scrollElm.scrollLeft = this.currentValue.scrollLeft;
      this.scrollElm.scrollTop = this.currentValue.scrollTop;
    }
    if (this.containerElm) {
      this.currentElementWidth = this.containerElm.clientWidth;
      this.currentElementHeight = this.containerElm.clientHeight;
    }
  },

  methods: {
    handleScroll(e) {
      const target = e.target;

      this.currentScrollLeft = target.scrollLeft;
      this.currentScrollTop = target.scrollTop;

      const currentValue = {
        scrollLeft: target.scrollLeft,
        scrollTop: target.scrollTop
      };

      this.currentValue = currentValue;

      this.$emit("scroll", e);
      this.$emit("input", currentValue);
    }
  }
};
</script>
