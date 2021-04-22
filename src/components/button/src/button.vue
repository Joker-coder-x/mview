<template>
    <button class="m-button" 
            :class="[
                'm-button-'+type,
                'm-button--'+size,
                round?'round':'',
                circle?'circle':''
            ]"
            :type="nativeType"
            :autofocus="autoFocus"
            :disabled="disabled"
            @click="handleClick">
        <m-icon v-if="icon" :name="icon"></m-icon>
        <slot></slot>
    </button>
</template>

<script>
import mIcon from "../../icon/index.js";

export default {
    name:'mButton',

    props:{
        icon:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'default'
        },
        disabled:{
            type:Boolean,
            default:false
        },
        round:{
            type:Boolean,
            default:false
        },
        circle:{
            type:Boolean,
            default:false
        },
        nativeType:{
            type:String,
            default:'button'
        },
        autoFocus:{
            type:Boolean,
            default:false
        },
        size:{
            type:String,
            default:'default'
        }
    },

    components:{
        mIcon
    },

    methods:{
        handleClick(event){
            this.$emit('click',event);
        }
    }

}
</script>

<style scoped>

</style>