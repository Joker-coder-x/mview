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

    width: [String, Number],

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

    sortable: {
      type: Boolean,
      default: false
    }
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
