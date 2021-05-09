export default {
  name: "MRender",

  functional: true,

  props: {
    render: Function,
    children: Array,
    tag: {
      type: String,
      default: "div"
    }
  },

  render(h, { props }) {
    const children = props.children;
    if (children) {
      return h(props.tag.toLowerCase(), {}, children);
    } else {
      return props.render(h);
    }
  }
};