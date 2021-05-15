<script>
import { StyleMixin } from "@/mixins/index.js";

export default {
  name: "MTableColumn",

  mixins: [StyleMixin],

  props: {
    prop: {
      type: String,
      required: true
    },

    label: {
      type: String,
      default: ""
    },

    className: {
      type: String,
      default: ""
    },

    fixed: {
      type: [Boolean, String],
      default: false,
      validator(value) {
        if (typeof value === "string" && ["left", "right"].indexOf === -1) {
          return false;
        } else {
          return true;
        }
      }
    },

    width: [String, Number]
  },

  mounted() {
    this.$parent.makeColumns();
  },

  destroyed() {
    this.$parent.makeColumns();
  },

  render(h) {
    return h("div", { class: `${this.cssPrefix}columns` }, this.$slots.default);
  }
};
</script>
