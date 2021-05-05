<template>
  <ul class="m-dropdown-menu" :style="{ top: top }">
    <m-triangle
      class="m-triangle"
      color="white"
      :position="position == 'top' ? 'bottom' : 'top'"
      :style="getTriangleStyle"
      :size="8"
    ></m-triangle>
    <slot></slot>
  </ul>
</template>

<script>
import mTriangle from "../../triangle/index.js";

export default {
  name: "MDropdownMenu",

  reject: ["dropdown"],

  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      top: "100%",
      position: "top"
    };
  },

  computed: {
    getTriangleStyle() {
      let styObj;
      switch (this.position) {
        case "top":
          styObj = {
            left: "20%",
            top: "100%",
            transform: "translate(-50%,0%)"
          };
          break;
        case "bottom":
          styObj = {
            left: "20%",
            top: "0",
            transform: "translate(-50%,-100%)"
          };
          break;
      }
      return styObj;
    }
  },

  methods: {
    showPosition(position) {
      switch (position) {
        case "top":
          this.top = -(this.$el.offsetHeight + 20) + "px";
          this.position = "top";
          break;
        case "bottom":
          this.position = "bottom";
          this.top = "100%";
          break;
        default:
          break;
      }
    }
  },

  components: {
    mTriangle
  }
};
</script>

<style scoped>
.m-dropdown-menu {
  min-height: 3rem;
  padding: 1rem 0;
  background: var(--white);
  position: absolute;
  left: 40%;
  /* top:100%; */
  border-radius: 3%;
  list-style: none;
  box-sizing: content-box;
  white-space: pre;
  box-shadow: 0px 0px 2rem 0.8rem rgba(172, 164, 164, 0.308);
  cursor: pointer;
}

.m-triangle {
  position: absolute;
  z-index: 9999 !important;
}
</style>
