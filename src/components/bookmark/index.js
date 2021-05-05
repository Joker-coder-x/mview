import Bookmark from "./src/bookmark.vue";

/* istanbul ignore next */
Bookmark.install = function(Vue) {
  Vue.component(Bookmark.name, Bookmark);
};

export default Bookmark;
