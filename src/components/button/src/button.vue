<template>
  <button
    :class="[
      'm-button',
      'm-button-' + type,
      'm-button--' + size,
      round ? 'round' : '',
      circle ? 'circle' : '',
      disabled ? 'is-disabled' : ''
    ]"
    :type="nativeType"
    :autofocus="autoFocus"
    :disabled="disabled"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    ref="button"
  >
    <m-icon v-if="icon" :name="icon"></m-icon>
    <slot></slot>
  </button>
</template>

<script>
import mIcon from "../../icon/index.js";

export default {
  name: "MButton",

  components: {
    mIcon
  },

  props: {
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: "button"
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "default"
    }
  },

  methods: {
    handleClick(e) {
      if (this.disabled) return;
      this.$emit("click", e);
    },

    handleFocus(e) {
      if (this.disabled) return;
      this.$emit("focus", e);
    },

    handleBlur(e) {
      if (this.disabled) return;
      this.$emit("blur", e);
    }
  }
};
</script>

<style scoped></style>
