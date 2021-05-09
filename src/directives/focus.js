import { isFunction, deleteProp, $on, $off } from "@/utils/index.js";

const EVENT_NAMES = ["focus", "blur"];

const bind = function(el, binding) {
  const handleFocus = e => {
    if (binding.value.disabled) return;
    if (binding.expression) {
      if (binding.value) {
        if (isFunction(binding.value)) {
          binding.value({ e, value: binding.value });
        } else {
          binding.value.focus &&
            isFunction(binding.value.focus) &&
            binding.value.focus({ e, value: binding.value });
        }
      }
    }
  };
  const hanldeBlur = e => {
    if (binding.value.disabled) return;
    if (binding.expression) {
      if (binding.value) {
        if (isFunction(binding.value)) {
          binding.value({ e, value: binding.value });
        } else {
          binding.value.blur &&
            isFunction(binding.value.blur) &&
            binding.value.blur({ e, value: binding.value });
        }
      }
    }
  };

  //添加事件处理程序
  $on(el, EVENT_NAMES[0], handleFocus);
  $on(el, EVENT_NAMES[1], hanldeBlur);
  //增加事件标识属性
  el.__vueFocus__ = handleFocus;
  el.__vueBlur__ = hanldeBlur;
};

const unbind = function(el) {
  //移除focus和blur的事件处理程序
  $off(el, EVENT_NAMES[0], el.__vueFocus__);
  $off(el, EVENT_NAMES[1], el.__vueBlur__);
  //清除引用
  el.__vueFocus__ = null;
  el.__vueBlur__ = null;
  //删除el上增加的标识属性
  deleteProp(el, "__vueFocus__");
  deleteProp(el, "__vueFocus__");
};

export default {
  bind,
  unbind
};