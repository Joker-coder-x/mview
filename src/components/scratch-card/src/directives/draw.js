import { deleteProp } from "@/utils/index.js";

export default {
  bind(el, binding) {
    let isDown = false;

    const handleMouseMove = function(e) {
      if (isDown) {
        //自带节流buff
        requestAnimationFrame(() => {
          if (binding.expression) {
            binding.value(e);
          }
        });
      }
    };
    const handleMouseDown = function() {
      isDown = true;
    };
    const handleMouseUp = function() {
      isDown = false;
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    el.__vueMouseMove__ = handleMouseMove;
    el.__vueMouseDown__ = handleMouseDown;
    el.__vueMouseUp__ = handleMouseUp;
  },
  unbind(el) {
    el.removeEventListener("mousemove", el.__vueMouseMove__);
    el.removeEventListener("mousedown", el.__vueMouseDown__);
    document.removeEventListener("mouseup", el.__vueMouseUp__);

    deleteProp(el, "__vueMouseMove__");
    deleteProp(el, "__vueMouseDown__");
    deleteProp(el, "__vueMouseUp__");
  }
};
