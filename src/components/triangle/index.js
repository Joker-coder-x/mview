import Triangle from "./src/triangle.vue";

/* istanbul ignore next */
Triangle.install = function(Vue) {
  Vue.component(Triangle.name, Triangle);
};

export default Triangle;
