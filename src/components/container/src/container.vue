<template>
  <div class="m-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MContainer",

  props: {
    direction: String
  },

  computed: {
    isVertical() {
      if (this.direction === "vertical") {
        return true;
      } else if (this.direction === "horizontal") {
        return false;
      }

      /* eslint-disable */
      return this.$slots && this.$slots.default
        ? this.$slots.default.some(vnode => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === "m-header" || tag === "m-footer";
          })
        : false;
      /* eslint-enable */
    }
  }
};
</script>

<style lang="less">
// .m-container {
//   display: flex;

//   & > .m-aside + .m-main,
//   & > .m-aside + &,
//   & > .m-main,
//   & > & {
//     flex: 8;
//   }
// }

// .is-vertical {
//   flex-direction: column;
// }
</style>
