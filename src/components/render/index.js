import Render from "./src/render.js";

Render.install = function(Vue) {
  Vue.component(Render.name, Render);
};

export default Render;