import { CSS_PREFIX, CSS_PREFIX_ICONFONT } from "../utils/index.js";

export default {
  filters: {
    prefixIcon(value) {
      return `${CSS_PREFIX_ICONFONT}${value}`;
    },
    prefixClass(value) {
      return `${CSS_PREFIX}${value}`;
    }
  },

  data() {
    return {
      cssPrefix: CSS_PREFIX,
      cssPrefixIconfont: CSS_PREFIX_ICONFONT
    };
  }
};