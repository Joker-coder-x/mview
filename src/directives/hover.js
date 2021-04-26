import { deleteProp } from "@/utils/index.js";

const hoverEventsName = ['mouseenter', 'mouseleave'];

//绑定hover指令
const bindHover = function(el, binding) {
    const handleMouseEnter = function(e) {
        if (binding.value.disabled) return;
        if (binding.expression) {
            if (binding.value) {
                if (typeof binding.value === 'function') {
                    binding.value({ e, value: binding.value })
                } else {
                    binding.value.enter && typeof binding.value.enter === 'function' && binding.value.enter({ e, value: binding.value });
                }
            }
        }
    }
    const handleMouseLeave = function(e) {
        if (binding.value.disabled) return;
        if (binding.expression) {
            if (binding.value) {
                if (typeof binding.value === 'function') {
                    binding.value({ e, value: binding.value });
                } else {
                    binding.value.leave && typeof binding.value.leave === 'function' && binding.value.leave({ e, value: binding.value });
                }
            }
        }
    }

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
}

export default {
    bind(el, binding) {
        bindHover(el, binding);
    },

    unbind(el) {
        unbindHover(el);
    }
}