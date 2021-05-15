import ScrollContainer from "./src/scroll-container.vue";

ScrollContainer.install = function(Vue) {
  Vue.component(ScrollContainer.name, ScrollContainer);
};

export default ScrollContainer;