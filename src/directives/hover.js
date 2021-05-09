import {
  isFunction,
  deleteProp,
  $on,
  $off,
  NATIVE_EVENT_NAMES
} from "@/utils/index.js";

const EVENT_NAMES = [
  NATIVE_EVENT_NAMES.mouseenter,
  NATIVE_EVENT_NAMES.mouseleave
];

const bind = function(el, binding) {
  const handleMouseEnter = function(e) {
    if (binding.value.disabled) return;
    if (binding.expression) {
      if (binding.value) {
        if (isFunction(binding.value)) {
          binding.value({ e, value: binding.value });
        } else {
          binding.value.enter &&
            isFunction(binding.value.enter) &&
            binding.value.enter({ e, value: binding.value });
        }
      }
    }
  };
  const handleMouseLeave = function(e) {
    if (binding.value.disabled) return;
    if (binding.expression) {
      if (binding.value) {
        if (isFunction(binding.value)) {
          binding.value({ e, value: binding.value });
        } else {
          binding.value.leave &&
            isFunction(binding.value.leave) &&
            binding.value.leave({ e, value: binding.value });
        }
      }
    }
  };

  //添加事件处理程序
  $on(el, EVENT_NAMES[0], handleMouseEnter);
  $on(el, EVENT_NAMES[1], handleMouseLeave);
  //增加事件标识属性
  el.__vueMouseEnter__ = handleMouseEnter;
  el.__vueMouseLeave__ = handleMouseLeave;
};

const unbind = function(el) {
  //移除enter和leave的事件处理程序
  $off(el, EVENT_NAMES[0], el.__vueMouseEnter__);
  $off(el, EVENT_NAMES[1], el.__vueMouseLeave__);
  //清除引用
  el.__vueMouseEnter__ = null;
  el.__vueMouseLeave__ = null;
  //删除el上增加的标识属性
  deleteProp(el, "__vueMouseEnter__");
  deleteProp(el, "__vueMouseLeave__");
};

export default {
  bind,
  unbind
};