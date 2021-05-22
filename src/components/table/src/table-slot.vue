<script>
import { jsonClone } from "@/utils/index.js";

export default {
  name: "MTableSlot",

  functional: true,

  props: {
    row: Object,
    column: Object,
    index: [Number, String],
    slotRender: Function
  },

  render(h, { props }) {
    return h(
      "div",
      props.slotRender({
        row: jsonClone(props.row),
        column: jsonClone(props.column),
        $index: jsonClone(props.index)
      })
    );
  }
};
</script>
