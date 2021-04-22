import TabPane from "../tabs/src/tab-pane.vue";

/* istanbul ignore next */
TabPane.install=function(Vue,options){
    Vue.component(TabPane.name,TabPane);
}


export default TabPane;