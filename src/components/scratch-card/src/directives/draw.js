import { deleteProp, NATIVE_EVENT_NAMES, $on, $off } from "@/utils/index.js";

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

    $on(el, NATIVE_EVENT_NAMES.mousemove, handleMouseMove);
    $on(el, NATIVE_EVENT_NAMES.mousedown, handleMouseDown);
    $on(document, NATIVE_EVENT_NAMES.mouseup, handleMouseUp);

    el.__vueMouseMove__ = handleMouseMove;
    el.__vueMouseDown__ = handleMouseDown;
    el.__vueMouseUp__ = handleMouseUp;
  },
  unbind(el) {
    $off(el, NATIVE_EVENT_NAMES.mousemove, el.__vueMouseMove__);
    $off(el, NATIVE_EVENT_NAMES.mousedown, el.__vueMouseDown__);
    $off(document, NATIVE_EVENT_NAMES.mouseup, el.__vueMouseUp__);

    deleteProp(el, "__vueMouseMove__");
    deleteProp(el, "__vueMouseDown__");
    deleteProp(el, "__vueMouseUp__");
  }
};