<template>
  <div class="m-collapse-panel" @click="handlePanelClick">
    <div
      :class="['header', headerClass ? headerClass : '']"
      @click="handleToggle"
      :style="getHeaderStyle"
    >
      <m-icon
        :name="iconName"
        class="icon"
        v-if="!hideArrow && arrowPosition === 'front'"
        style="margin-right:5px;"
      ></m-icon>
      <div class="content"><slot></slot></div>
      <m-icon
        :name="iconName"
        class="icon"
        v-if="!hideArrow && arrowPosition === 'behind'"
      ></m-icon>
    </div>
    <m-collapse-transition>
      <div v-show="isOpen" class="body">
        <div :style="getBodyStyle" :class="['box', boxClass ? boxClass : '']">
          <slot name="content"></slot>
        </div>
      </div>
    </m-collapse-transition>
  </div>
</template>

<script>
import MIcon from "../../icon/index.js";
import MCollapseTransition from "../../../transition/collapse-transition.js";

const ARROW_POSITION_LIST = ["front", "behind"];

export default {
  name: "MCollapsePanel",

  components: {
    MIcon,
    MCollapseTransition
  },

  props: {
    hideArrow: {
      type: Boolean,
      default: false
    },
    arrowPosition: {
      type: String,
      default: ARROW_POSITION_LIST[0],
      validator(value) {
        return ARROW_POSITION_LIST.indexOf(value) !== -1;
      }
    },
    name: {
      type: [String, Number],
      default: ""
    },
    headerClass: String,
    boxClass: String
  },

  data() {
    return {
      isOpen: false,
      iconName: "right",
      isLastChild: false,
      index: ""
    };
  },

  watch: {
    isOpen(newVal) {
      this.iconName = newVal === true ? "down" : "right";
    }
  },

  computed: {
    getBodyStyle() {
      const border = "1px solid #ddd";
      const styleObj = {
        borderLeft: this.$parent.simple ? "none" : border,
        borderRight: this.$parent.simple ? "none" : border
      };

      if (this.isLastChild) {
        styleObj.borderBottom = border;
      }

      return styleObj;
    },

    getHeaderStyle() {
      const styleObj = {};

      if (!this.isLastChild) {
        styleObj.borderBottom = this.isOpen
          ? "1px solid #ddd"
          : "0px solid #ddd";
      }

      if (this.$parent.simple) {
        styleObj.backgroundColor = "white";
        styleObj.borderLeft = "none";
        styleObj.borderRight = "none";
        if (this.isOpen) {
          styleObj.borderBottom = "0px solid #ddd";
        }
      }

      return styleObj;
    }
  },

  mounted() {
    this.$parent.setActive();
  },

  methods: {
    getName() {
      return this.name === "" ? this.index : this.name;
    },

    setLastChildFlag(flag) {
      this.isLastChild = flag;
    },

    setIndex(index) {
      this.index = index;
    },

    handlePanelClick() {
      this.$parent.handlePanelClick(this.getName(), this.isOpen);
    },

    handleToggle() {
      this.isOpen = !this.isOpen;
    },

    handleClose() {
      this.isOpen = false;
    }
  }
};
</script>
