import Popper from "./src/popper.vue";

Popper.install = function(Vue) {
  Vue.component(Popper.name, Popper);
};

export default Popper;
