import ScratchCard from './src/scratch-card.vue';

ScratchCard.install = function(Vue) {
    Vue.component(ScratchCard.name, ScratchCard);
}

export default ScratchCard;