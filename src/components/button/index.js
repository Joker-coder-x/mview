import Button from "./src/button.vue";

/* istanbul ignore next */
Button.install=function(Vue,options){
	Vue.component(Button.name,Button);
}

export default Button;