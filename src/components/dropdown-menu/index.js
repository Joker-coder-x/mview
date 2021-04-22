import  DropdownMenu from "../dropdown/src/dropdown-menu.vue";

/* istanbul ignore next */
DropdownMenu.install=function(Vue,options){
	Vue.component(DropdownMenu.name,DropdownMenu);
}

export default DropdownMenu;