import Slots from "./src/slots.vue";

// install
Slots.install = function(Vue) {
  Vue.component(Slots.name, Slots);
};

export default Slots;
