import  {Col} from "../layout/index.js";

Col.install=function(Vue){
	Vue.component(Col.name,Col);
}

export default Col;