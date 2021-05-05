import SlotsItem from "../slots/src/slots-item.vue";

SlotsItem.install = function(Vue) {
  Vue.component(SlotsItem.name, SlotsItem);
};

export default SlotsItem;
