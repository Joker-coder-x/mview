import Dropdown from "./src/dropdown.vue";

/* istanbul ignore next */
Dropdown.install=function(Vue,options){
	Vue.component(Dropdown.name,Dropdown);
}

export default Dropdown;