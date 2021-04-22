import ScratchCard from './src/scratch-card.vue';

/* istanbul ignore next */
ScratchCard.install=function(Vue,options){
    Vue.component(ScratchCard.name,ScratchCard);
}


export default ScratchCard;