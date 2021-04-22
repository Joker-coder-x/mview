import Bookmark from './src/bookmark.vue';

/* istanbul ignore next */
Bookmark.install=function(Vue,options){
    Vue.component(Bookmark.name,Bookmark);
}

export default Bookmark;