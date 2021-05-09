import { ClickOutside } from "@/directives/index.js";

export default {
  bind(el, binding) {
    if (binding.arg === "click") {
      ClickOutside.bind(el, binding);
    }
  },
  unbind(el, binding) {
    if (binding.arg === "click") {
      ClickOutside.unbind(el, binding);
    }
  }
};