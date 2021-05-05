import { deleteProp } from "@/utils/index.js";

//添加outside指令绑定
const bindClickOutSide = function(el, binding) {
  //点击el元素外层满足条件
  const handleClickOutside = function(e) {
    //如果el包含了点击目标
    if (el.contains(e.target)) {
      return false;
    }
    if (binding.expression) {
      binding.value(e);
    }
  };
  //绑定事件处理程序
  el.__vueClickOutside__ = handleClickOutside;
  document.addEventListener("click", handleClickOutside);
  //按下esc按键同样关闭 需要加上esc修饰符才能生效
  const modifiers = binding.modifiers;
  if (Object.keys(modifiers).length > 0 && modifiers["esc"]) {
    const handlePressOfESC = function(e) {
      if (e.keyCode === 27) {
        if (binding.expression) {
          binding.value(e);
        }
      }
    };
    //绑定事件处理程序
    el.__vuePressOfESC__ = handlePressOfESC;
    document.addEventListener("keydown", handlePressOfESC);
  }
};
//移除outside指令绑定
const unbindClickOutside = function(el) {
  //移除click的事件处理程序
  document.removeEventListener("click", el.__vueClickOutside__);
  deleteProp(el, "__vueClickOutside__");
  //移除esc修饰符的事件处理函数
  if (el.__vuePressOfESC__) {
    document.removeEventListener("keydown", el.__vuePressOfESC__);
    deleteProp(el, "__vuePressOfESC__");
  }
};

const hoverEventsName = ["mouseenter", "mouseleave"];
//绑定hover指令
const bindHover = function(el, binding) {
  const handleMouseEnter = function(e) {
    if (binding.value.disabled) return;
    if (binding.expression) {
      binding.value.enter(e);
    }
  };
  //防抖优化操作体验
  const handleMouseLeave = function(e) {
    if (binding.value.disabled) return;
    if (binding.expression) {
      binding.value.leave(e);
    }
  };

  //添加事件处理程序
  el.addEventListener(hoverEventsName[0], handleMouseEnter);
  el.addEventListener(hoverEventsName[1], handleMouseLeave);
  //增加事件标识属性
  el.__vueMouseEnter__ = handleMouseEnter;
  el.__vueMouseLeave__ = handleMouseLeave;
};
//移除hover指令
const unbindHover = function(el) {
  //移除enter和leave的事件处理程序
  el.removeEventListener(hoverEventsName[0], el.__vueMouseEnter__);
  el.removeEventListener(hoverEventsName[1], el.__vueMouseLeave__);
  //删除el上增加的标识属性
  deleteProp(el, "__vueMouseEnter__");
  deleteProp(el, "__vueMouseLeave__");
};

export default {
  bind(el, binding) {
    switch (binding.arg) {
      case "click":
        bindClickOutSide(el, binding);
        break;
      case "hover":
        bindHover(el, binding);
        break;
      default:
        break;
    }
  },
  unbind(el, binding) {
    switch (binding.arg) {
      case "click":
        unbindClickOutside(el, binding);
        break;
      case "hover":
        unbindHover(el, binding);
        break;
      default:
        break;
    }
  }
};
