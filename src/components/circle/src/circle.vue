<template>
  <div :class="'circle' | prefixClass" :style="getWrapperStyle">
    <svg viewBox="0 0 100 100">
      <path
        :d="d"
        :style="getTrailPathStyle"
        :stroke-width="trailWidth"
        :stroke="trailColor"
        fill-opacity="0"
      ></path>
      <path
        :d="d"
        :style="getPathStyle"
        :stroke-width="computedStrokeWidth"
        :stroke="strokeColor"
        :stroke-linecap="strokeLinecap"
        fill-opacity="0"
      ></path>
    </svg>

    <div :class="'circle--inner' | prefixClass"><slot></slot></div>
  </div>
</template>

<script>
import { StyleMixin } from "@/mixins/index.js";

export default {
  name: "MCircle",

  mixins: [StyleMixin],

  props: {
    percent: {
      type: Number,
      default: 0
    },

    size: {
      type: Number,
      default: 120
    },

    trailColor: {
      type: String,
      default: "#e5e9f2"
    },

    strokeColor: {
      type: String,
      default: "#409eff"
    },

    trailWidth: {
      type: Number,
      default: 5
    },

    strokeWidth: {
      type: Number,
      default: 6
    },

    strokeLinecap: {
      type: String,
      default: "round",
      validator(val) {
        return ["square", "round"].indexOf(val.trim()) > -1;
      }
    },

    dashboard: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getWrapperStyle() {
      const size = this.size;
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    },

    getTrailPathStyle() {
      let len = this.len,
        style = {};

      if (this.dashboard) {
        style = {
          strokeDasharray: `${len - 75}px ${len}px`,
          strokeDashoffset: `-${75 / 2}px`,
          transition:
            "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s"
        };
      }

      return style;
    },

    getPathStyle() {
      let len = this.len,
        percent = this.percent,
        style = {};

      if (this.dashboard) {
        style = {
          strokeDasharray: `${(percent / 100) * (len - 75)}px ${len}px`,
          strokeDashoffset: `-${75 / 2}px`,
          transition:
            "stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s"
        };
      } else {
        style = {
          strokeDasharray: `${len}px ${len}px`,
          strokeDashoffset: `${((100 - this.percent) / 100) * len}px`,
          transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
        };
      }

      return style;
    },

    radius() {
      return 50 - this.strokeWidth / 2;
    },

    d() {
      const radius = this.radius;
      return `M 50 50 m 0 ${radius}
          a ${radius} ${radius} 0 1 1 0 ${-2 * radius}
          a ${radius} ${radius} 0 1 1 0 ${2 * radius}`;
    },

    len() {
      return Math.PI * 2 * this.radius;
    },

    computedStrokeWidth() {
      return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth;
    }
  }
};
</script>
