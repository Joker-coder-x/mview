import Slots from './src/slots.vue';

// install
Slots.install = function(Vue, opts) {
    Vue.component(Slots.name, Slots);
}

export default Slots;