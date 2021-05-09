<template>
  <transition :name="transition" mode="in-out">
    <div v-show="isShow" class="m-tabs-content__pane">
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
      default: ""
    },
    //是否禁用改选项卡
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShow: false,
      index: "",
      transition: "move-right"
    };
  },

  watch: {
    name() {
      this.updateNav();
    },
    label() {
      this.updateNav();
    },
    disabled() {
      this.updateNav();
    }
  },

  mounted() {
    this.updateNav();
  },

  beforeDestroy() {
    this.$parent.removeTabBarItem(this.getName());
  },

  methods: {
    getName() {
      return this.name === "" ? this.index : this.name;
    },

    setName(name) {
      this.index = name;
    },

    updateNav() {
      this.$parent.updateNav();
    }
  }
};
</script>
