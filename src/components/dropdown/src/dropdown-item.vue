<template>
  <li
    :class="['m-dropdown-item', disabled ? 'is-disabled' : '']"
    :data-disabled="disabled ? 'true' : 'false'"
    @click="handleItemClick"
  >
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "MDropdownItem",

  inject: ["dropdown", "menuItemClickCallMethodName"],

  props: {
    commond: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    //选项被点击
    handleItemClick() {
      if (this.disabled) return;

      this.dropdown[this.menuItemClickCallMethodName] &&
        this.dropdown[this.menuItemClickCallMethodName](this.commond);
    }
  }
};
</script>
