import Icon from "./src/icon.vue";

/* istanbul ignore next */
Icon.install = function(Vue) {
  Vue.component(Icon.name, Icon);
};

export default Icon;
