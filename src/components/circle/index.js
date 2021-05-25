import Circle from "./src/circle.vue";

Circle.install = function(Vue) {
  Vue.component(Circle.name, Circle);
};

export default Circle;