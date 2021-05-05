<template>
  <transition name="fade-x">
    <div class="m-tab-pane" v-if="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MTabPane",

  props: {
    name: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: "test"
    }
  },

  data() {
    return {
      isShow: true
    };
  },

  mounted() {
    this.$parent.updateNav();
  },

  beforeDestroy() {
    this.$parent.removeTabBarItem(this.name);
  }
};
</script>

<style scoped>
.fade-y-enter-active {
  animation-name: fade-y;
  animation-duration: 1s;
  animation-direction: alternate;
}

.fade-x-enter-active {
  animation-name: fade-x;
  animation-duration: 1s;
  animation-direction: alternate;
}

@keyframes fade-x {
  0% {
    transform: translateX(0%);
  }

  50% {
    transform: translateX(50%);
    opacity: 0.2;
  }

  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes fade-y {
  0% {
    transform: translateY(0%);
  }

  50% {
    transform: translateY(50%);
    opacity: 0.2;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
