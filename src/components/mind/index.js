import Mind from "./src/mind.vue";

Mind.install = function(Vue) {
  Vue.component(Mind.name, Mind);
};

export default Mind;
