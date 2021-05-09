import { deleteProp, $on, $off, isFunction } from "@/utils/index.js";

const body = document;
const bind = function(el, binding) {
  const handleClickOutside = function(e) {
    if (el.contains(e.target)) {
      return false;
    }
    if (binding.expression && isFunction(binding.value)) {
      binding.value(e);
    }
  };

  el.__vueClickOutside__ = handleClickOutside;
  $on(body, "click", handleClickOutside);

  const modifiers = binding.modifiers;
  if (Object.keys(modifiers).length > 0 && modifiers["esc"]) {
    const handlePressOfESC = function(e) {
      if (e.keyCode === 27) {
        if (binding.expression && isFunction(binding.value)) {
          binding.value(e);
        }
      }
    };
    el.__vuePressOfESC__ = handlePressOfESC;
    $on(body, "keydown", handlePressOfESC);
  }
};

const unbind = function(el) {
  $off(body, "click", el.__vueClickOutside__);
  el.__vueClickOutside__ = null;
  deleteProp(el, "__vueClickOutside__");

  if (el.__vuePressOfESC__) {
    $off(body, "keydown", el.__vuePressOfESC__);
    el.__vuePressOfESC__ = null;
    deleteProp(el, "__vuePressOfESC__");
  }
};

export default {
  bind,
  unbind
};