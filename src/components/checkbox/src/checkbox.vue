<template>
  <div
    class="m-checkbox"
    :class="disabled ? 'is-disabled' : ''"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <input
      type="checkbox"
      :disabled="disabled"
      :checked="currentValue"
      @change="handleChange"
      :name="name"
    />
    <label
      :class="getClass"
      :style="currentValue ? `color:${color};` : ''"
    ></label>
    <span class="m-checkbox__inner-text" :style="getInnerTextStyle">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "MCheckbox",

  model: {
    prop: "checked",
    event: "change"
  },

  props: {
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#3498db"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: false
    },
    //文字间距 单位 像素
    textIndent: {
      type: Number,
      default: 5
    },
    //checkbox的大小 单位 像素
    fontSize: {
      type: Number,
      default: 14
    },
    name: String
  },

  data() {
    return {
      currentValue: this.checked
    };
  },

  watch: {
    value(newVal) {
      if (this.currentValue !== newVal) {
        this.currentValue = newVal;
      }
    }
  },

  computed: {
    getClass() {
      let checkedIcon = "mIcon-checkbox";

      if (this.currentValue) {
        if (this.indeterminate) {
          checkedIcon += "-indeterminate";
        } else {
          checkedIcon += this.circle ? "-circle" : "-square";
        }
        checkedIcon += this.line ? "-line" : "-fill";
      } else {
        checkedIcon += this.circle ? "-circle" : "-square";
        checkedIcon += "-blank";
      }

      return checkedIcon;
    },

    getInnerTextStyle() {
      const styleObj = {
        marginLeft: this.textIndent + "px"
      };

      if (this.currentValue) {
        styleObj.color = this.color;
      }

      return styleObj;
    }
  },

  methods: {
    handleChange() {
      if (this.disabled) return;

      this.currentValue = !this.currentValue;
      this.$emit("change", this.currentValue);
    }
  }
};
</script>
